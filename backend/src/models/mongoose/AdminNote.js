const mongoose = require('mongoose');

const adminNoteSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, index: true },
    adminId: { type: String, required: true },
    note: { type: String, required: true },
    metadata: { type: Object }
  },
  { timestamps: true }
);

adminNoteSchema.index({ ticketId: 1, createdAt: -1 });

module.exports = mongoose.model('AdminNote', adminNoteSchema);
