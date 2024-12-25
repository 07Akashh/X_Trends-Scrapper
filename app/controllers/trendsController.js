const scrapeTrends = require('../services/scrapeService');
const Trend = require('../models/trend');

exports.runScript = async (req, res) => {
    try {
        const record = await scrapeTrends();
        res.status(200).json(record);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch trends' });
    }
};

exports.getLatest = async (req, res) => {
    try {
        const latestRecord = await Trend.findOne().sort({ createdAt: -1 });
        res.status(200).json(latestRecord);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch latest trends' });
    }
};
