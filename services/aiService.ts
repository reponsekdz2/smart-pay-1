import { GoogleGenAI } from '@google/genai';

/**
 * @class AIService
 * Simulates the backend AI/ML microservice.
 * This class will interact with the Google GenAI SDK.
 */
export class AIService {
    private ai: GoogleGenAI;

    constructor() {
        // FIX: Initialize GoogleGenAI with the API key from environment variables.
        if (!process.env.API_KEY) {
            // In a real app, you might want a fallback or a disabled state.
            // For this mock, we'll log an error.
            console.error("API_KEY environment variable not set for AIService");
        }
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    }

    async getFinancialAdvice(prompt: string): Promise<string> {
        if (!process.env.API_KEY) {
             return 'The AI service is currently unavailable. Please configure the API Key.';
        }
        try {
            // FIX: Use ai.models.generateContent to query the model.
            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                 config: {
                    systemInstruction: 'You are a financial advisor for a user of the Smart Pay Rwanda app. Provide concise, helpful, and safe financial advice. Do not give specific investment recommendations.',
                }
            });

            // FIX: Access the generated text directly from the response object.
            return response.text;
        } catch (error) {
            console.error('Error getting financial advice from Gemini:', error);
            return 'Sorry, I am unable to provide advice at the moment.';
        }
    }
}
