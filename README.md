# 📢 Roteiro de Apresentação (Local + CloudAMQP)

---

## 1. SETUP (Interface Web)
**Objetivo:** Mostrar o painel de gerenciamento zerado.

1. **Abra o navegador** no painel do seu CloudAMQP (RabbitMQ Manager).
2. Vá na aba **Queues** (Filas) e mostre que ela está vazia (ou zerada).
3. Vá na aba **Overview** e mostre os gráficos de "Message Rates" parados.

---

## 2. PREPARAÇÃO (Rodar os Serviços)
**Objetivo:** Subir sua aplicação localmente para conectar na nuvem.

1. **Abra o Terminal 1 (Consumer/Worker):**
   Rode o comando para iniciar o "ouvinte" que vai processar os e-mails:
   ```bash
   # Confirme o nome do arquivo (ex: consumer.js, worker.js, index.js)
   node consumer.js
   ```
2. **Abra o Terminal 2 (API/Producer):**
    Rode o comando para subir a sua API que recebe o pedido de compra:
   ```bash
    # Confirme o nome do arquivo principal da API
    node server.js
   ```
3. **Abra o Terminal 3 (Cliente):**
    Vamos fazer a requisição de Checkout simulando um cliente.
   ```bash
    curl -i -X POST http://localhost:3000/lists/1/checkout -H "Content-Type: application/json" -d "{}"
   ```
