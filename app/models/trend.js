const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
    nameoftrend1: { type: String, trim: true },
    nameoftrend2: { type: String, trim: true },
    nameoftrend3: { type: String, trim: true },
    nameoftrend4: { type: String, trim: true },
    nameoftrend5: { type: String, trim: true },
    ip_address: { type: String, required: true, trim: true },
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model('Trend', trendSchema);
