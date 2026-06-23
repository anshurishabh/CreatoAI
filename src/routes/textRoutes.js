const express = require('express');
const router = express.Router();
const { handleTextGeneration } = require('../controllers/textController');

router.post('/generate', handleTextGeneration);
module.exports = router;
