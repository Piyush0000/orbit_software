const { prisma } = require('../config/database');
const TicketMessage = require('../models/mongoose/TicketMessage');
const AdminNote = require('../models/mongoose/AdminNote');
const { TICKET_STATUS, TICKET_SOURCE } = require('../config/constants');

const createTicketFromChatbot = async ({ storeId, createdByUserId, subject, message, metadata }) => {
  const now = new Date();
  const ticket = await prisma.supportTicket.create({
    data: {
      storeId,
      createdByUserId,
      subject,
      summary: message,
      source: TICKET_SOURCE.CHATBOT,
      status: TICKET_STATUS.OPEN,
      latestMessageAt: now
    }
  });

  await TicketMessage.create({
    ticketId: ticket.id,
    senderType: 'BOT',
    message,
    metadata
  });

  await prisma.brandActivityLog.create({
    data: {
      storeId,
      actorType: 'SYSTEM',
      action: 'SUPPORT_TICKET_CREATED',
      metadata: { ticketId: ticket.id, source: TICKET_SOURCE.CHATBOT }
    }
  });

  return ticket;
};

const listTickets = async ({ status, storeId, assignedAdminId }) => {
  const where = {};
  if (status) where.status = status;
  if (storeId) where.storeId = storeId;
  if (assignedAdminId) where.assignedAdminId = assignedAdminId;

  return prisma.supportTicket.findMany({
    where,
    include: {
      store: true,
      assignedAdmin: true
    },
    orderBy: { updatedAt: 'desc' }
  });
};

const getTicketById = async (ticketId) =>
  prisma.supportTicket.findUnique({
    where: { id: ticketId },
    include: {
      store: true,
      assignedAdmin: true,
      assignments: { orderBy: { assignedAt: 'desc' }, take: 10 }
    }
  });

const assignTicket = async ({ ticketId, adminId, assignedByAdminId }) => {
  const now = new Date();
  return prisma.$transaction(async (tx) => {
    await tx.ticketAssignment.updateMany({
      where: { ticketId, isActive: true },
      data: { isActive: false, unassignedAt: now }
    });
    const assignment = await tx.ticketAssignment.create({
      data: {
        ticketId,
        adminId,
        assignedByAdminId
      }
    });
    const ticket = await tx.supportTicket.update({
      where: { id: ticketId },
      data: {
        assignedAdminId: adminId,
        status: TICKET_STATUS.IN_PROGRESS
      }
    });
    return { assignment, ticket };
  });
};

const updateTicketStatus = async ({ ticketId, status }) => {
  const resolvedAt = status === TICKET_STATUS.RESOLVED || status === TICKET_STATUS.CLOSED ? new Date() : null;
  return prisma.supportTicket.update({
    where: { id: ticketId },
    data: { status, resolvedAt }
  });
};

const addAdminResponse = async ({ ticketId, adminId, message, metadata }) => {
  const now = new Date();
  await TicketMessage.create({
    ticketId,
    senderType: 'ADMIN',
    adminId,
    message,
    metadata
  });

  return prisma.supportTicket.update({
    where: { id: ticketId },
    data: {
      status: TICKET_STATUS.IN_PROGRESS,
      lastResponseAt: now,
      latestMessageAt: now
    }
  });
};

const addInternalNote = async ({ ticketId, adminId, note, metadata }) =>
  AdminNote.create({ ticketId, adminId, note, metadata });

const resolveTicket = async ({ ticketId }) =>
  prisma.supportTicket.update({
    where: { id: ticketId },
    data: {
      status: TICKET_STATUS.RESOLVED,
      resolvedAt: new Date()
    }
  });

module.exports = {
  createTicketFromChatbot,
  listTickets,
  getTicketById,
  assignTicket,
  updateTicketStatus,
  addAdminResponse,
  addInternalNote,
  resolveTicket
};
