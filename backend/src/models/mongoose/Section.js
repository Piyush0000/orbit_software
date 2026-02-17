const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    description: String,
    thumbnail: String,
    defaultConfig: mongoose.Schema.Types.Mixed,
    schema: mongoose.Schema.Types.Mixed,
    isGlobal: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Section', sectionSchema);
