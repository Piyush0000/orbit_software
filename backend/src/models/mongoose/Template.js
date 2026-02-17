const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    thumbnail: String,
    category: String,
    isPremium: { type: Boolean, default: false },
    defaultSections: [
      {
        type: { type: String },
        config: mongoose.Schema.Types.Mixed
      }
    ],
    defaultTheme: Object,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Template', templateSchema);
