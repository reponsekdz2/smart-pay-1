import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Loader } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useUserStore } from '../hooks/useUserStore';
import type { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // This is a fallback for development; in production, the key should be set.
  console.warn("API_KEY is not set. AI Assistant will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });


interface SmartAssistantScreenProps {
    onClose: () => void;
}

const SmartAssistantScreen: React.FC<SmartAssistantScreenProps> = ({ onClose }) => {
    const { user } = useUserStore();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: `Hello ${user.name}! I'm your Smart Assistant. How can I help you with your finances today? You can ask things like "How much did I spend on groceries?"` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare transaction data for the AI
            const transactionSummary = user.transactions.map(t => 
                `${t.type} of ${Math.abs(t.amount)} RWF for "${t.name}" (${t.description}) on ${new Date(t.date).toLocaleDateString()}`
            ).join('\n');
            
            const systemInstruction = `You are a friendly and helpful financial assistant for an app called Smart Pay Rwanda. The user's name is ${user.name}. Your goal is to answer their questions based on their transaction history. Be concise and helpful. Today's date is ${new Date().toLocaleDateString()}. Here is the user's transaction history:\n${transactionSummary}`;

            const chatHistory = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));
            
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: { role: "user", parts: [{ text: input }] },
              config: { systemInstruction }
            });

            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
            <div className="bg-background w-full h-[95%] rounded-t-2xl flex flex-col">
                <header className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Bot className="w-6 h-6 text-primary" />
                        <h2 className="text-lg font-bold text-textPrimary">Smart Assistant</h2>
                    </div>
                    <button onClick={onClose} className="text-textSecondary hover:text-textPrimary">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primaryLight flex items-center justify-center text-primary flex-shrink-0"><Bot size={20} /></div>}
                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-surface text-textPrimary rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-textSecondary flex-shrink-0"><User size={20} /></div>}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primaryLight flex items-center justify-center text-primary flex-shrink-0"><Bot size={20} /></div>
                            <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-surface text-textPrimary rounded-bl-none">
                                <Loader className="w-5 h-5 animate-spin text-textSecondary" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>

                <footer className="p-4 bg-surface border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-primary text-white p-3 rounded-full hover:bg-primaryDark disabled:bg-gray-400">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default SmartAssistantScreen;