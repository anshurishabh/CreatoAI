const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    contentType: {
        type: String,
        enum: ['blog', 'social', 'image', 'general'],
        required: true
    },
    generatedData: {
        type: String, // Text content ya fir Image ka Base64 string save hoga
        required: true
    },
    metaData: {
        aspectRatio: { type: String, default: null }, // Only for images
        tokensUsed: { type: Number, default: 0 }
    }
}, {
    timestamps: true // Yeh automatic 'createdAt' aur 'updatedAt' fields bana dega
});

module.exports = mongoose.model('Content', ContentSchema);
