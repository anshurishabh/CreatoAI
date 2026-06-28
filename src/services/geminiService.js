const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const generateTextContent = async (prompt, contentType = "general") => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing in .env file");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // Advanced System Prompt Engineering for Viral Growth Hacking
        let systemInstruction = `You are an elite Social Media Growth Hacker and Trend Analyst. 
        Analyze the user's topic and break it down into a viral asset package. 
        Do not write generic paragraphs. You must strictly follow this format for your response:
        
        ### 🚀 TRENDING METRICS & TOPIC ANALYSIS
        - Current Angle: [Explain what angle of this topic is currently blowing up on Instagram Reels/YouTube Shorts]
        - Target Audience Sentiment: [What emotions or triggers are working right now]
        
        ### 🧲 SCROLL-STOPPING HOOK GENERATOR (First 3 Seconds)
        1. **The Curiosity Hook:** [A hook that forces the user to wait till the end]
        2. **The Negative/Fear Hook:** [A hook highlighting a mistake they are making]
        3. **The Identity Hook:** [A hook that calls out a specific group directly]
        
        ### 🎬 VIRAL INSTAGRAM REEL SCRIPT (Under 60 Seconds)
        - **0-3s (The Hook):** [Visual Action + Voiceover]
        - **3-15s (The Retention Bridge):** [Keep them hooked, introduce the core value]
        - **15-45s (The Body):** [Provide 3 high-value bullet points. Include notes for editor like: *Apply bit-wise transition here* or *Add glowing neon outline on character* to maximize engagement]
        - **45-60s (The Smart CTA):** [Give a reason to comment a specific keyword or share instead of a generic "follow me"]`;

        if (contentType === 'blog') {
            systemInstruction = `You are an expert SEO Content Strategist. Analyze the topic and provide: 
            1. High-volume semantic keywords.
            2. An optimized outline with H2/H3 tags.
            3. A high-retention introduction using the PAS (Problem-Agitate-Solve) formula.`;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7
            }
        });

        if (response && response.text) {
            return response.text;
        } else {
            throw new Error("Empty response from Gemini Engine.");
        }

    } catch (error) {
        console.error("Error inside Gemini Service:", error.message);
        throw new Error("AI Text Matrix compilation failed.");
    }
};

module.exports = { generateTextContent };