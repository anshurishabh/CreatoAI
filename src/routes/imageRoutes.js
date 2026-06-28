const express = require('express');
const router = express.Router();
const { handleImageGeneration } = require('../controllers/imageController');

// Route: POST /api/v1/image/generate
router.post('/generate', handleImageGeneration);

module.exports = router;
