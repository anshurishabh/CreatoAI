const express = require('express');
const cors = require('cors');
require('dotenv').config();

const textRoutes = require('./src/routes/textRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/text', textRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'CreatoAI Core Engine' });
});

app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 [CreatoAI Core] Production server running on port ${PORT}`);
});
