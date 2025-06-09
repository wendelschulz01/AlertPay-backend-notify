
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const notificationRoutes = require("./app/routes/notificationRoutes");
const checkDueInvoicesJob = require("./jobs/checkDueInvoices");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use("/notifications", notificationRoutes);

// (Opcional) Rota de healthcheck
app.get("/health", (req, res) => res.json({ status: "OK" }));

// Iniciar job em background (node-cron)
checkDueInvoicesJob(); // registra o agendamento, mas não dispara imediatamente
                       // o próprio cron.schedule já agenda para 08:00. Se quiser rodar uma vez ao subir, execute checkDueInvoicesJob() diretamente.

// Caso queira executar uma vez na inicialização (por exemplo), descomente abaixo:
// (async () => { await checkDueInvoicesJob(); })();

module.exports = app;
