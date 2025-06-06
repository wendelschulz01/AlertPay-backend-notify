// src/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

// GET    /notifications             → lista todas as notificações
router.get("/", NotificationController.listAll);

// GET    /notifications/:id         → busca uma notificação por ID
router.get("/:id", NotificationController.getById);

// POST   /notifications             → cria uma notificação manual (não obrigatório se for sempre gerada pelo job)
router.post("/", NotificationController.create);

// PUT    /notifications/:id         → atualiza status ou mensagem
router.put("/:id", NotificationController.update);

// DELETE /notifications/:id         → remove uma notificação (opcional)
router.delete("/:id", NotificationController.remove);

module.exports = router;
