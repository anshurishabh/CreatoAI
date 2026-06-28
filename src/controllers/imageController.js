const { generateImageContent } = require('../services/stabilityService');
const Content = require('../models/Content');

const handleImageGeneration = async (req, res, next) => {
    try {
        const { prompt, aspectRatio, filterType } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, error: 'Prompt is mandatory.' });
        }

        // Call service layer with filterType
        const base64Image = await generateImageContent(prompt, aspectRatio || '1:1', filterType || 'general');

        // Save to Database with metadata tracking
        await Content.create({
            prompt: `${prompt} [Filter: ${filterType || 'none'}]`,
            contentType: 'image',
            generatedData: base64Image,
            metaData: { aspectRatio: aspectRatio || '1:1' }
        });

        return res.status(200).json({
            success: true,
            timestamp: new Date(),
            aspectRatio: aspectRatio || '1:1',
            imageData: base64Image
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { handleImageGeneration };