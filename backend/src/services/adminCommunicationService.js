const { prisma } = require('../config/database');

const createCallLog = async ({ storeId, adminId, ticketId, channel, notes, occurredAt }) =>
  prisma.supportCallLog.create({
    data: {
      storeId,
      adminId,
      ticketId: ticketId || null,
      channel,
      notes,
      occurredAt: occurredAt ? new Date(occurredAt) : new Date()
    }
  });

const createCommunicationLog = async ({ storeId, adminId, ticketId, channel, direction, summary, metadata, occurredAt }) =>
  prisma.communicationLog.create({
    data: {
      storeId,
      adminId,
      ticketId: ticketId || null,
      channel,
      direction,
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

const listCallLogs = async ({ storeId }) =>
  prisma.supportCallLog.findMany({
    where: { storeId },
    include: { admin: true },
    orderBy: { occurredAt: 'desc' }
  });

module.exports = {
  createCallLog,
  createCommunicationLog,
  listCommunicationLogs,
  listCallLogs
};
