const { prisma } = require('../config/database');

const createCommunicationLog = async ({ storeId, adminId, ticketId, channel, direction, subject, summary, metadata, occurredAt }) =>
  prisma.communicationLog.create({
    data: {
      storeId,
      adminId,
      ticketId: ticketId || null,
      channel,
      direction,
      subject,
      summary,
      metadata,
      occurredAt: occurredAt ? new Date(occurredAt) : new Date()
    }
  });

const listCommunicationLogs = async ({ storeId }) =>
  prisma.communicationLog.findMany({
    where: { storeId },
    include: { admin: true },
    orderBy: { occurredAt: 'desc' }
  });

module.exports = {
  createCommunicationLog,
  listCommunicationLogs,
};
