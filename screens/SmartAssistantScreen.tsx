
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header.tsx';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore.ts';
import { GoogleGenAI } from '@google/genai';

const SmartAssistantScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [messages, setMessages] = useState([
        { from: 'bot', text: `Hello ${user?.name?.split(' ')[0]}! I'm your Smart Pay assistant, powered by Gemini. How can I help you with your finances today?` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // FIX: Initialize GoogleGenAI with API key from environment variables.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = { from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // FIX: Use ai.models.generateContent to get a response from the Gemini API.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `As a friendly financial assistant for an app called Smart Pay Rwanda, answer the following user query: "${input}"`,
                config: {
                    systemInstruction: "You are a helpful and concise financial assistant for Smart Pay Rwanda. You can answer questions about budgeting, savings, and general financial concepts. You cannot perform actions like sending money, but you can guide the user on how to do it in the app. Keep responses brief and helpful.",
                }
            });
            
            // FIX: Extract the text from the response and display it.
            const botMessage = { from: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage = { from: 'bot', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background dark:bg-gray-900 h-full flex flex-col">
            <Header
                title="Smart Assistant"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="flex-1 p-4 flex flex-col-reverse overflow-y-auto">
                <div className="space-y-4" ref={messagesEndRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-surface dark:bg-gray-700 text-textPrimary dark:text-white'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-surface dark:bg-gray-700 text-textPrimary dark:text-white">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <div className="p-4 bg-surface dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                        className="w-full p-3 bg-background dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-textPrimary dark:text-white"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} className="p-3 bg-primary text-white rounded-lg disabled:bg-primary/50" disabled={isLoading}>
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartAssistantScreen;
