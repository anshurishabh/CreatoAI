const ai = require('../config/aiConfig');

const generateTextContent = async (prompt, contentType) => {
    try {
        let systemContext = "You are an elite, highly creative content engine for CreatoAI.\n";
        if (contentType === 'blog') {
            systemContext += "Task: Write an in-depth, high-converting, SEO-optimized blog post. Use proper Markdown headings (##, ###), bullet points, and an engaging introduction.";
        } else if (contentType === 'social') {
            systemContext += "Task: Write an ultra-engaging social media caption. Include highly relevant emojis, structured line breaks, and viral hashtags at the end.";
        } else {
            systemContext += "Task: Provide a professional, concise, and structured output based on the user's requirement.";
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemContext}\n\nUser Prompt: ${prompt}`,
            config: {
                temperature: 0.7,
                maxOutputTokens: 2048
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error inside Gemini Service:", error);
        throw new Error("AI Generation Service failed to respond.");
    }
};

module.exports = { generateTextContent };
