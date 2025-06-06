// src/server.js
const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

const PORT = process.env.APP_PORT || 4000;

async function startServer() {
  try {
    // Testa conexão com o banco
    await sequelize.authenticate();
    console.log("Conexão com o banco PostgreSQL estabelecida com sucesso.");

    // Se quiser sincronizar modelos sem usar migrations, use:
    // await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Não foi possível iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();
