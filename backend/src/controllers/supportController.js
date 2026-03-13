const supportService = require('../services/supportService');

const createTicket = async (req, res, next) => {
  try {
    const { storeId, subject, message, priority, metadata } = req.body;
    const userId = req.user.id; // From auth middleware

    const ticket = await supportService.createTicket({
      storeId,
      userId,
      subject,
      message,
      priority,
      metadata
    });

    res.status(201).json({ success: true, ticket });
  } catch (err) {
    next(err);
  }
};

const listTickets = async (req, res, next) => {
  try {
    const { storeId } = req.query;
    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }

    const tickets = await supportService.getMerchantTickets(storeId);
    res.json({ success: true, tickets });
  } catch (err) {
    next(err);
  }
};

const getTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { storeId } = req.query;

    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }

    const detail = await supportService.getTicketDetail(id, storeId);
    if (!detail) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ success: true, ...detail });
  } catch (err) {
    next(err);
  }
};

const submitFeedback = async (req, res, next) => {
  try {
    const { storeId, rating, feedback } = req.body;
    const userId = req.user.id;

    const result = await supportService.submitFeedback({
      storeId,
      userId,
      rating,
      feedback
    });

    res.status(201).json({ success: true, feedback: result });
  } catch (err) {
    next(err);
  }
};

const requestCall = async (req, res, next) => {
  try {
    const { storeId, phone, preferredTime } = req.body;
    const userId = req.user.id;

    const result = await supportService.requestCall({
      storeId,
      userId,
      phone,
      preferredTime
    });

    res.status(201).json({ success: true, callRequest: result });
  } catch (err) {
    next(err);
  }
};

const respond = async (req, res, next) => {
  try {
    const { id: ticketId } = req.params;
    const { storeId, message, metadata } = req.body;
    const userId = req.user.id;

    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }

    const ticket = await supportService.respondToTicket({
      ticketId,
      storeId,
      userId,
      message,
      metadata
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or unauthorized' });
    }

    res.json({ success: true, ticket });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTicket,
  listTickets,
  getTicket,
  submitFeedback,
  requestCall,
  respond
};
