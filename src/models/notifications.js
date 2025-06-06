const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
    },
    invoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "ID da fatura originária na outra API",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Data de vencimento da fatura",
    },
    notifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Quando a notificação foi disparada",
    },
    status: {
      type: DataTypes.ENUM("pending", "sent", "failed"),
      defaultValue: "pending",
      allowNull: false,
      comment: "Status da notificação",
    },
    // Você pode acrescentar campos adicionais, como destinatário, mensagem, etc.
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Texto da notificação (por ex: e-mail enviado)",
    }
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: true, // createdAt e updatedAt
    underscored: true,
  }
);

module.exports = Notification;
