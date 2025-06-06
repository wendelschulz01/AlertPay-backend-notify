// src/services/InvoiceService.js
require("dotenv").config();
const axios = require("axios");

const invoiceApi = axios.create({
  baseURL: process.env.INVOICE_API_BASE_URL, // e.g. https://api-de-faturas.exemplo.com/v1
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Se precisar de autenticação (token), adicione aqui, por ex:
    // Authorization: `Bearer ${process.env.INVOICE_API_TOKEN}`,
  },
});

class InvoiceService {
  /**
   * Busca todas as faturas, ou filtra por status, data, etc.
   * A implementação depende do contrato da API de faturas.
   * Exemplo: GET /invoices?status=open
   */
  static async listAllOpenInvoices() {
    const response = await invoiceApi.get("/invoices", {
      params: { status: "open" },
    });
    return response.data; // Depende do formato retornado
  }

  /**
   * Busca detalhes de uma fatura específica pelo ID
   */
  static async getInvoiceById(invoiceId) {
    const response = await invoiceApi.get(`/invoices/${invoiceId}`);
    return response.data;
  }

  /**
   * Se a API de faturas tiver endpoint para buscar por intervalo de datas:
   * Ex.: GET /invoices?dueDateBefore=2025-06-10
   */
  static async listInvoicesDueBefore(dateISO) {
    const response = await invoiceApi.get("/invoices", {
      params: { dueDateBefore: dateISO, status: "open" },
    });
    return response.data;
  }
}

module.exports = InvoiceService;
