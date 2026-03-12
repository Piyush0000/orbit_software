const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema({
    brand_id: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    notes: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Communication", communicationSchema);