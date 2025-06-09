const cron = require("node-cron");
const { Op } = require("sequelize");
const InvoiceService = require("../services/InvoiceService");
const Notification = require("../app/models/notifications");

// Função que será agendada
async function checkDueInvoicesJob() {
  console.log(`[${new Date().toISOString()}] Iniciando job de verificação de faturas próximas do vencimento.`);
  try {
    // Defina a lógica de proximidade do vencimento. Por exemplo:
    // vamos buscar faturas com dueDate até amanhã (hoje + 1 dia).
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isoTomorrow = tomorrow.toISOString();

    // Exemplo: a API de faturas suporta filtro por dueDateBefore
    const invoices = await InvoiceService.listInvoicesDueBefore(isoTomorrow);

    for (const inv of invoices) {
      const { id: invoiceId, dueDate: dueDateString } = inv;

      // Converte dueDate em objeto Date
      const dueDate = new Date(dueDateString);

      // Verifica se já existe notificação pendente ou enviada para essa fatura
      const existing = await Notification.findOne({
        where: {
          invoiceId,
          dueDate,
          status: { [Op.in]: ["pending", "sent"] },
        },
      });

      if (!existing) {
        // Cria nova notificação com status "pending"
        const newNotif = await Notification.create({
          invoiceId,
          dueDate,
          status: "pending",
          message: null,
        });
        console.log(`Nova notificação criada para invoiceId=${invoiceId}.`);
        // Aqui você pode, opcionalmente, chamar função para enviar e-mail/PUSH:
        // await sendEmailNotification(inv, newNotif);
      }
    }
  } catch (error) {
    console.error("Erro no job checkDueInvoicesJob:", error.message || error);
  }
}

// Agendamento: rodar todo dia às 08:00 (exemplo). Sintaxe: minuto hora dia-do-mês mês dia-da-semana
// Ajuste conforme necessidade. Aqui: todo dia às 08:00.
cron.schedule("0 8 * * *", () => {
  checkDueInvoicesJob();
}, {
  timezone: "America/Sao_Paulo",
});

module.exports = checkDueInvoicesJob;
