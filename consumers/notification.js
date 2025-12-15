require('dotenv').config();
const amqp = require('amqplib');

const EXCHANGE_NAME = 'shopping_events';
const QUEUE_NAME = 'q_notifications';
const ROUTING_KEY_PATTERN = 'list.checkout.#';

async function startWorker() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY_PATTERN);

        console.log(`Serviço de Notificação aguardando mensagens na fila: ${QUEUE_NAME}...`);

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                const content = JSON.parse(msg.content.toString());
                
                console.log(`----------------------------------------`);
                console.log(`[EMAIL SERVICE] Enviando comprovante da lista [${content.listId}]`);
                console.log(`Para o usuário: [${content.userEmail}]`);
                console.log(`----------------------------------------`);

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error(error);
    }
}

startWorker();