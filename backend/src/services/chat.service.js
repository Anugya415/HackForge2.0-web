import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

export class ChatService {
    static async getChatResponse(message, history = []) {
        try {
            if (!genAI || !process.env.GEMINI_API_KEY) {
                throw new Error('Gemini API key is not configured.');
            }

            const systemPrompt = "You are Chilli, the AI assistant for GROEI (which stands for Growth). GROEI is an AI-powered job platform that connects world-class talent with exceptional opportunities. Your goal is to be helpful, professional, and encouraging. You specialize in resume parsing, job matching, and career advice. Keep your responses concise and focused on how GROEI's features (Resume Scanner, Smart Matching, Heatmap Analytics) can help the user.";

            const model = genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction: systemPrompt,
            });

            const chat = model.startChat({
                history: history.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }],
                })),
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                }
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Chat Service Error Detail:', error);
            throw new Error(`AI Chat error: ${error.message}`);
        }
    }
}
