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

1. **Abra o Terminal 1 (Notificação):**
   ```bash
   node consumers/notification.js
   ```
2. **Abra o Terminal 2 (Analytics):**
   ```bash
    node consumers/analytics.js
   ```
3. **Abra o Terminal 3 (API):**
   ```bash
    node producers/list_api.js
   ```
4. **Abra o Terminal 4 (API):**
   ```bash
    Invoke-RestMethod -Uri "http://localhost:3000/lists/123/checkout" -Method Post
   ```
