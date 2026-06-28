const express = require('express');
const router = express.Router();
const { handleTextGeneration } = require('../controllers/textController');
const Content = require('../models/Content'); // Model import kiya

// Route: POST /api/v1/text/generate
router.post('/generate', handleTextGeneration);

// Route: GET /api/v1/text/history (Zariyan saara saved content fetch karne ke liye)
router.get('/history', async (req, res, next) => {
    try {
        const history = await Content.find().sort({ createdAt: -1 }); // Latest content pehle aayega
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
});

module.exports = router;