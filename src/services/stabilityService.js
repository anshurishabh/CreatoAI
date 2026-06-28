const axios = require('axios');
require('dotenv').config();

const generateImageContent = async (prompt, aspectRatio = "1:1", filterType = "esports_thumbnail") => {
    try {
        if (!process.env.STABILITY_API_KEY) {
            throw new Error("STABILITY_API_KEY is missing in .env file");
        }

        let advancedPrompt = prompt;

        // Specialized Prompt Engineering Core Matrices
        if (filterType === 'esports_thumbnail') {
            advancedPrompt = `Professional gaming YouTube thumbnail style, ${prompt}, vibrant hyper-realistic character pose render, sharp vector neon glowing outlines, high-contrast dynamic composition, intense dramatic backlighting, esports gaming montage palette, ultra-sharp detail, octane render style, 8k resolution`;
        } else if (filterType === 'cinematic_realistic') {
            advancedPrompt = `Cinematic full portrait photograph, ${prompt}, fair complexion smooth skin texture, professional studio lighting, volumetric realistic dust motes, shot on 85mm lens f/1.4, flawless cinematic grading, rich bokeh depth of field, photorealistic 8k, highly realistic eyes detail`;
        } else if (filterType === 'aesthetic_apparel') {
            advancedPrompt = `Premium lifestyle model photography, ${prompt}, styled in aesthetic trendy baggy streetwear clothes, high-end long overcoats, rich fabric details, urban minimalist clean architecture background, soft volumetric ambient lighting, professional editorial vogue look`;
        }

        const payload = {
            prompt: advancedPrompt,
            output_format: "webp",
            aspect_ratio: aspectRatio
        };

        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/core`,
            payload,
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: { 
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, 
                    Accept: "image/*" 
                },
            },
        );

        if (response.status === 200) {
            const base64Image = Buffer.from(response.data).toString('base64');
            return `data:image/webp;base64,${base64Image}`;
        } else {
            throw new Error(`Stability API Engine Status Code: ${response.status}`);
        }

    } catch (error) {
        console.error("Error inside specialized Stability Service:", error.message);
        throw new Error("AI Image Generation Matrix processing failed.");
    }
};

module.exports = { generateImageContent };