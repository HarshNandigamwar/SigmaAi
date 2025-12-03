"use client";

import React, { useState, useRef } from "react";
import { FiImage } from "react-icons/fi";
import axios from "axios";
import SubmitButton from "../components/SubmitButton";
import Loader from "../components/Loader";
import Header from "../components/Header";
import MessageBox from "../components/MessageBox";

export type Role = "user" | "model";
export interface Message {
  id: string;
  role: Role;
  content: string;
  isLoading?: boolean;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Function to automatically scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Reference for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setSelectedFile(file);

      // Create a FileReader instance
      const reader = new FileReader();

      // Set the function to run when the file is done loading
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };

      // Read the file as a Data URL
      reader.readAsDataURL(file);
    } else {
      // If the file selection is cleared
      setSelectedFile(null);
      setImagePreviewUrl(null);
    }
  };

  // Convert Image file into  Base64 encoded string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // logic for handleSend
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isAILoading) return;

    // Prepare data for the API
    let base64Image: string | undefined;
    if (selectedFile) {
      const base64String = await fileToBase64(selectedFile);
      base64Image = base64String.split(",")[1];
    }

    const userInput = input.trim();
    setInput("");
    setIsAILoading(true);

    // Add user message to state
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
    };

    // update state directly to avoid race conditions with the API call
    setMessages((prev) => [...prev, newUserMessage]);

    // Scroll immediately after adding the user message
    setTimeout(scrollToBottom, 0);

    try {
      const historyForAPI = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call your internal API Route
      const response = await axios.post("/api/chat", {
        history: historyForAPI,
        prompt: userInput,
        image: base64Image,
        mimeType: selectedFile?.type,
      });
      const aiText = response.data.text;

      // Add the AI response message to state
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
      setSelectedFile(null);
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a]">
      {/* Header*/}
      <Header />

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}

        {/* Display Loader for Response */}
        {isAILoading && <Loader />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and Submit */}
      <div className="p-4 bg-[#1e1e1e]">
        <form onSubmit={handleSend} className="flex space-x-3 items-center">
          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isAILoading}
            className="flex-1 p-3 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {/* Submit Button  */}
          {input.trim().length > 0 && (
            <SubmitButton
              loading={isAILoading}
              click={isAILoading || !input.trim()}
            />
          )}
          {/* Display the File Upload Button And Image */}
          {selectedFile ? (
            <span>
              {imagePreviewUrl && (
                <div className="relative">
                  <img
                    src={imagePreviewUrl}
                    alt="Image Preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setImagePreviewUrl(null);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center shadow-lg"
                  >
                    &times;
                  </button>
                </div>
              )}
            </span>
          ) : (
            <label className="px-6 py-3 text-white font-semibold rounded-lg shadow-xl transition-colors focus:outline-none bg-blue-600 hover:bg-blue-700">
              <FiImage className="text-2xl" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isAILoading}
              />
            </label>
          )}
        </form>
      </div>
    </div>
  );
};
export default ChatWindow;
