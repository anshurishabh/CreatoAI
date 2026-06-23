const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Google Gen AI with your Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Test Route
app.get('/', (req, res) => {
    res.send('CreatoAI Server is Running perfectly!');
});

// AI Text Generation Route
app.post('/api/generate/text', async (req, res) => {
    try {
        const { prompt, contentType } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // System context based on what the user wants to create
        let systemContext = "You are an expert content creator for CreatoAI.";
        if (contentType === 'blog') {
            systemContext += " Write a detailed, SEO-optimized blog post with clear headings.";
        } else if (contentType === 'social') {
            systemContext += " Write an engaging social media post with relevant hashtags and emojis.";
        }

        // Call the Gemini model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: `${systemContext}\n\nUser Request: ${prompt}`,
        });

        res.json({
            success: true,
            data: response.text
        });

    } catch (error) {
        console.error('AI Generation Error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to generate content. Check your backend logs.' 
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
});