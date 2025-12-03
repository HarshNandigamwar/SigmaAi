"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SubmitButton from "./SubmitButton";
import Loader from "./Loader";
import Header from "./Header";

export type Role = "user" | "model";
export interface Message {
  id: string;
  role: Role;
  content: string;
  isLoading?: boolean;
}

// Utility component for message display
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  const baseClasses =
    "max-w-[70%] p-3 rounded-xl shadow-md my-2 whitespace-pre-wrap";

  // Tailwind classes for modern, distinct bubbles
  const userClasses = "bg-blue-600 text-white ml-auto rounded-br-none";
  const modelClasses = "bg-gray-100 text-gray-800 mr-auto rounded-tl-none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`${baseClasses} ${isUser ? userClasses : modelClasses}`}>
        {message.content}
      </div>
    </motion.div>
  );
};

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to automatically scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  //** logic for handleSend **
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAILoading) return;

    const userInput = input.trim();
    setInput("");
    setIsAILoading(true);

    // 1. Add user message to state
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
    };

    // We update state directly to avoid race conditions with the API call
    setMessages((prev) => [...prev, newUserMessage]);

    // Scroll immediately after adding the user message
    setTimeout(scrollToBottom, 0);

    try {
      // Prepare history for the API (only need role and content for the backend)
      const historyForAPI = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // 2. Call your internal API Route
      const response = await axios.post("/api/chat", {
        history: historyForAPI,
        prompt: userInput,
      });
      const aiText = response.data.text;

      // 3. Add the AI response message to state
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: aiText,
      };
      setMessages((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Frontend Axios Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: "Sorry, I ran into an error. Please try again.",
        isLoading: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAILoading(false);
      // Scroll after the response is received
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a]">
      {/* Header*/}
      <Header />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Display Loader for Response */}
        {isAILoading && <Loader />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and Submit */}
      <div className="p-4 bg-[#1e1e1e]">
        <form onSubmit={handleSend} className="flex space-x-3">
          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isAILoading}
            className="flex-1 p-3 border border-blue-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {/* Submit Button  */}
          {input.trim().length > 0 && (
            <SubmitButton
              loading={isAILoading}
              click={isAILoading || !input.trim()}
            />
          )}
        </form>
      </div>
    </div>
  );
};
