import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    const modelName = 'gemini-2.5-flash';
    console.log(`Testing ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: "You are a test bot."
        });
        const result = await model.generateContent('Hi');
        const response = await result.response;
        console.log(`SUCCESS:`, response.text());
    } catch (error) {
        console.error(`FAILED:`, error);
    }
}

test();
