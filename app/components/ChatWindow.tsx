// components/ChatWindow.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Don't forget the CSS!

// Use the types you defined earlier
export type Role = 'user' | 'model';
export interface Message {
  id: string; 
  role: Role;
  content: string;
  isLoading?: boolean; 
}

// Utility component for message display (Tailwind styling applied here)
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.role === 'user';
    const baseClasses = "max-w-[70%] p-3 rounded-xl shadow-md my-2 whitespace-pre-wrap";

    // Tailwind classes for modern, distinct bubbles
    const userClasses = "bg-blue-600 text-white ml-auto rounded-br-none";
    const modelClasses = "bg-gray-100 text-gray-800 mr-auto rounded-tl-none";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`${baseClasses} ${isUser ? userClasses : modelClasses}`}>
                {message.content}
            </div>
        </motion.div>
    );
};

export const ChatWindow = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isAILoading, setIsAILoading] = useState(false);

    // Ref for auto-scrolling
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ... logic for handleSend will go here

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header (Optional) */}
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-900">Modern Gemini Chat</h1>
            </header>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}

                {/* Skeleton Loader for AI Response */}
                {isAILoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[70%] p-3 my-2">
                            <Skeleton count={2} height={20} width={250} />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input and Submit Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                {/* The input form logic will go here */}
            </div>
        </div>
    );
};