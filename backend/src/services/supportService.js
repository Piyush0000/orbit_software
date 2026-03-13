const { prisma } = require('../config/database');
const TicketMessage = require('../models/mongoose/TicketMessage');
const { TICKET_STATUS, TICKET_SOURCE, CALL_REQUEST_STATUS } = require('../config/constants');

const createTicket = async ({ storeId, userId, subject, message, priority = 'MEDIUM', metadata }) => {
  const now = new Date();
  const ticket = await prisma.supportTicket.create({
    data: {
      storeId,
      createdByUserId: userId,
      subject,
      summary: message,
      priority,
      source: TICKET_SOURCE.PORTAL,
      status: TICKET_STATUS.OPEN,
      latestMessageAt: now
    }
  });

  await TicketMessage.create({
    ticketId: ticket.id,
    senderType: 'MERCHANT',
    userId,
    message,
    metadata
  });

  await prisma.brandActivityLog.create({
    data: {
      storeId,
      userId,
      actorType: 'MERCHANT',
      action: 'SUPPORT_TICKET_CREATED',
      metadata: { ticketId: ticket.id }
    }
  });

  return ticket;
};

const getMerchantTickets = async (storeId) => {
  return prisma.supportTicket.findMany({
    where: { storeId },
    orderBy: { updatedAt: 'desc' }
  });
};

const getTicketDetail = async (ticketId, storeId) => {
  const ticket = await prisma.supportTicket.findFirst({
    where: { id: ticketId, storeId },
    include: {
      assignedAdmin: {
        select: { fullName: true }
      }
    }
  });

  if (!ticket) return null;

  const messages = await TicketMessage.find({ ticketId }).sort({ createdAt: 1 });
  return { ticket, messages };
};

const submitFeedback = async ({ storeId, userId, rating, feedback }) => {
  return prisma.feedback.create({
    data: {
      storeId,
      userId,
      rating,
      feedback
    }
  });
};

const requestCall = async ({ storeId, userId, phone, preferredTime }) => {
  return prisma.callRequest.create({
    data: {
      storeId,
      userId,
      phone,
      preferredTime,
      status: CALL_REQUEST_STATUS.PENDING
    }
  });
};

const respondToTicket = async ({ ticketId, storeId, userId, message, metadata }) => {
  const now = new Date();
  
  // Verify ownership
  const ticket = await prisma.supportTicket.findFirst({
    where: { id: ticketId, storeId }
  });
  
  if (!ticket) return null;

  await TicketMessage.create({
    ticketId,
    senderType: 'MERCHANT',
    userId,
    message,
    metadata
  });

  return prisma.supportTicket.update({
    where: { id: ticketId },
    data: {
      status: TICKET_STATUS.OPEN,
      latestMessageAt: now
    }
  });
};

module.exports = {
  createTicket,
  getMerchantTickets,
  getTicketDetail,
  submitFeedback,
  requestCall,
  respondToTicket
};
