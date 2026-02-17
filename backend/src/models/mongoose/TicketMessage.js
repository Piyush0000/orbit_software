const mongoose = require('mongoose');

const ticketMessageSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, index: true },
    senderType: {
      type: String,
      enum: ['ADMIN', 'MERCHANT', 'BOT', 'SYSTEM'],
      required: true
    },
    adminId: { type: String },
    userId: { type: String },
    message: { type: String, required: true },
    metadata: { type: Object }
  },
  { timestamps: true }
);

ticketMessageSchema.index({ ticketId: 1, createdAt: -1 });

module.exports = mongoose.model('TicketMessage', ticketMessageSchema);
