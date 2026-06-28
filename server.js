const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db');
const textRoutes = require('./src/routes/textRoutes');
const imageRoutes = require('./src/routes/imageRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Connect Database
connectDB();

// Robust CORS Configuration to allow Headers & Tokens
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/text', textRoutes);
app.use('/api/v1/image', imageRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'CreatoAI Core Engine Layer Sync' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 [CreatoAI Core] Production server active on port ${PORT}`);
});
