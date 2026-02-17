const TicketMessage = require('../models/mongoose/TicketMessage');
const AdminNote = require('../models/mongoose/AdminNote');
const {
  createTicketFromChatbot,
  listTickets,
  getTicketById,
  assignTicket,
  updateTicketStatus,
  addAdminResponse,
  addInternalNote,
  resolveTicket
} = require('../services/adminTicketService');

const createTicket = async (req, res, next) => {
  try {
    const { storeId, createdByUserId, subject, message, metadata } = req.body;
    const ticket = await createTicketFromChatbot({
      storeId,
      createdByUserId,
      subject,
      message,
      metadata
    });
    res.status(201).json({ ticket });
  } catch (err) {
    next(err);
  }
};

const listAllTickets = async (req, res, next) => {
  try {
    const tickets = await listTickets({
      status: req.query.status,
      storeId: req.query.storeId,
      assignedAdminId: req.query.assignedAdminId
    });
    res.json({ tickets });
  } catch (err) {
    next(err);
  }
};

const getTicket = async (req, res, next) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    const [messages, notes] = await Promise.all([
      TicketMessage.find({ ticketId: ticket.id }).sort({ createdAt: -1 }).limit(200),
      AdminNote.find({ ticketId: ticket.id }).sort({ createdAt: -1 }).limit(200)
    ]);
    res.json({ ticket, messages, notes });
  } catch (err) {
    next(err);
  }
};

const assign = async (req, res, next) => {
  try {
    const { adminId } = req.body;
    const result = await assignTicket({
      ticketId: req.params.id,
      adminId,
      assignedByAdminId: req.admin.id
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const ticket = await updateTicketStatus({ ticketId: req.params.id, status });
    res.json({ ticket });
  } catch (err) {
    next(err);
  }
};

const respond = async (req, res, next) => {
  try {
    const { message, metadata } = req.body;
    const ticket = await addAdminResponse({
      ticketId: req.params.id,
      adminId: req.admin.id,
      message,
      metadata
    });
    res.json({ ticket });
  } catch (err) {
    next(err);
  }
};

const addNote = async (req, res, next) => {
  try {
    const { note, metadata } = req.body;
    const adminNote = await addInternalNote({
      ticketId: req.params.id,
      adminId: req.admin.id,
      note,
      metadata
    });
    res.status(201).json({ note: adminNote });
  } catch (err) {
    next(err);
  }
};

const resolve = async (req, res, next) => {
  try {
    const ticket = await resolveTicket({ ticketId: req.params.id });
    res.json({ ticket });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTicket,
  listAllTickets,
  getTicket,
  assign,
  updateStatus,
  respond,
  addNote,
  resolve
};
