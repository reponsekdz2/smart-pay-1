
import React, { useState } from 'react';
import Header from '../components/Header';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';

const SmartAssistantScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [messages, setMessages] = useState([
        { from: 'bot', text: `Hello ${user?.name?.split(' ')[0]}! How can I help you today?` }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMessages = [...messages, { from: 'user', text: input }];
        // Placeholder bot response
        newMessages.push({ from: 'bot', text: "I'm still learning! This feature is under construction." });
        
        setMessages(newMessages);
        setInput('');
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col">
            <Header
                title="Smart Assistant"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="flex-1 p-4 flex flex-col-reverse overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-surface dark:bg-gray-700 text-textPrimary dark:text-white'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
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
                    />
                    <button onClick={handleSend} className="p-3 bg-primary text-white rounded-lg">
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartAssistantScreen;
