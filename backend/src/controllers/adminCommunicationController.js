const {
  createCallLog,
  createCommunicationLog,
  listCommunicationLogs,
  listCallLogs
} = require('../services/adminCommunicationService');

const createCall = async (req, res, next) => {
  try {
    const { channel, notes, ticketId, occurredAt } = req.body;
    const log = await createCallLog({
      storeId: req.params.id,
      adminId: req.admin.id,
      ticketId,
      channel,
      notes,
      occurredAt
    });
    res.status(201).json({ log });
  } catch (err) {
    next(err);
  }
};

const createCommunication = async (req, res, next) => {
  try {
    const { channel, direction, summary, metadata, ticketId, occurredAt } = req.body;
    const log = await createCommunicationLog({
      storeId: req.params.id,
      adminId: req.admin.id,
      ticketId,
      channel,
      direction,
      summary,
      metadata,
      occurredAt
    });
    res.status(201).json({ log });
  } catch (err) {
    next(err);
  }
};

const listCommunications = async (req, res, next) => {
  try {
    const logs = await listCommunicationLogs({ storeId: req.params.id });
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

const listCalls = async (req, res, next) => {
  try {
    const logs = await listCallLogs({ storeId: req.params.id });
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCall,
  createCommunication,
  listCommunications,
  listCalls
};
