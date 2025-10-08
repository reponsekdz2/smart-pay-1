
import { GoogleGenAI } from "@google/genai";
import type { ApiResponse } from '../types.ts';

// This would be initialized with an API key from a secure source
// Note: SmartAssistantScreen.tsx creates its own instance. This could be a shared instance.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

export class AiService {
    async getFinancialAdvice(prompt: string): Promise<ApiResponse<string>> {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: "You are a helpful and concise financial assistant for Smart Pay Rwanda. Provide financial advice based on the user's query."
                }
            });
            return { success: true, data: response.text };
        } catch (error) {
            console.error("AI Service Error:", error);
            return { success: false, error: "Failed to get advice from AI service." };
        }
    }
}
