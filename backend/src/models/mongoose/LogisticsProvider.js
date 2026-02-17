const mongoose = require('mongoose');

const logisticsProviderSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true, index: true },
    provider: { type: String, enum: ['FSHIP'], default: 'FSHIP' },
    apiKey: String,
    isActive: { type: Boolean, default: true },
    config: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        isStaging: true
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('LogisticsProvider', logisticsProviderSchema);
