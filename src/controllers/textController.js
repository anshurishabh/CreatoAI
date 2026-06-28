const { generateTextContent } = require('../services/geminiService');
const Content = require('../models/Content'); // Model import kiya

const handleTextGeneration = async (req, res, next) => {
    try {
        const { prompt, contentType } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, error: 'Prompt is mandatory.' });
        }
        
        // AI se content generate karwaya
        const generatedData = await generateTextContent(prompt, contentType || 'general');

        // MongoDB me save karne ka logic
        const savedContent = await Content.create({
            prompt,
            contentType: contentType || 'general',
            generatedData
        });

        return res.status(200).json({
            success: true,
            timestamp: new Date(),
            contentId: savedContent._id, // Database ka ID return karega
            data: generatedData
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { handleTextGeneration };