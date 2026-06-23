const { generateTextContent } = require('../services/geminiService');

const handleTextGeneration = async (req, res, next) => {
    try {
        const { prompt, contentType } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, error: 'Prompt is mandatory.' });
        }
        const generatedData = await generateTextContent(prompt, contentType || 'general');
        return res.status(200).json({
            success: true,
            timestamp: new Date(),
            contentType: contentType || 'general',
            data: generatedData
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { handleTextGeneration };
