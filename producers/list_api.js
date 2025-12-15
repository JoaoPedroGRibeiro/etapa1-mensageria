require('dotenv').config();
const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const EXCHANGE_NAME = 'shopping_events';
const ROUTING_KEY = 'list.checkout.completed';

let channel;

async function connectRabbit() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
        console.log(`✅ Conectado ao RabbitMQ! Exchange: ${EXCHANGE_NAME}`);
    } catch (error) {
        console.error('Erro ao conectar no RabbitMQ:', error);
    }
}

app.post('/lists/:id/checkout', async (req, res) => {
    const listId = req.params.id;
    
    const checkoutData = {
        listId: listId,
        userEmail: "joao.pedro@exemplo.com",
        items: [
            { name: "Arroz", price: 20.50 },
            { name: "Feijão", price: 9.00 },
            { name: "Carne", price: 45.00 }
        ],
        timestamp: new Date()
    };

    const messageBuffer = Buffer.from(JSON.stringify(checkoutData));

    channel.publish(EXCHANGE_NAME, ROUTING_KEY, messageBuffer);

    console.log(`[PRODUCER] Mensagem enviada: Checkout da lista ${listId}`);

    return res.status(202).json({ 
        message: "Checkout iniciado. Você receberá um email em breve.",
        status: "Accepted" 
    });
});

app.listen(3000, async () => {
    await connectRabbit();
    console.log('List Service rodando na porta 3000');
});