 // src/controllers/NotificationController.js
const Notification = require("../models/Notification");

class NotificationController {
  // Lista todas as notificações
  static async listAll(req, res) {
    try {
      const notifications = await Notification.findAll({
        order: [["created_at", "DESC"]],
      });
      return res.json(notifications);
    } catch (error) {
      console.error("Erro em listAll:", error);
      return res.status(500).json({ error: "Erro ao buscar notificações." });
    }
  }

  // Busca notificação por ID
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: "Notificação não encontrada." });
      }
      return res.json(notification);
    } catch (error) {
      console.error("Erro em getById:", error);
      return res.status(500).json({ error: "Erro ao buscar notificação." });
    }
  }

  // Cria notificação manualmente
  static async create(req, res) {
    const { invoiceId, dueDate, status = "pending", message = null } = req.body;
    if (!invoiceId || !dueDate) {
      return res.status(400).json({ error: "invoiceId e dueDate são obrigatórios." });
    }
    try {
      const newNotification = await Notification.create({
        invoiceId,
        dueDate,
        status,
        message,
      });
      return res.status(201).json(newNotification);
    } catch (error) {
      console.error("Erro em create:", error);
      return res.status(500).json({ error: "Erro ao criar notificação." });
    }
  }

  // Atualiza status e/ou message
  static async update(req, res) {
    const { id } = req.params;
    const { status, message, notifiedAt } = req.body;
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: "Notificação não encontrada." });
      }
      // Só atualiza campos enviados
      if (status) notification.status = status;
      if (message) notification.message = message;
      if (notifiedAt) notification.notifiedAt = notifiedAt;
      await notification.save();
      return res.json(notification);
    } catch (error) {
      console.error("Erro em update:", error);
      return res.status(500).json({ error: "Erro ao atualizar notificação." });
    }
  }

  // Remove notificação
  static async remove(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Notification.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: "Notificação não encontrada." });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Erro em remove:", error);
      return res.status(500).json({ error: "Erro ao deletar notificação." });
    }
  }
}

module.exports = NotificationController;
