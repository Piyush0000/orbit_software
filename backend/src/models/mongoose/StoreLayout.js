const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    id: String,
    type: String,
    order: Number,
    visible: Boolean,
    config: mongoose.Schema.Types.Mixed
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,
    content: mongoose.Schema.Types.Mixed
  },
  { _id: false }
);

const storeLayoutSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true, unique: true },
    templateId: { type: String, required: true },
    theme: {
      primaryColor: String,
      secondaryColor: String,
      fontFamily: String,
      fontSize: Object
    },
    sections: [sectionSchema],
    pages: [pageSchema],
    navigation: {
      header: Array,
      footer: Array
    },
    customCSS: String,
    customJS: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('StoreLayout', storeLayoutSchema);
