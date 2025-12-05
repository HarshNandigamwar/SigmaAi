"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import Footer from "../components/Footer";
import { FaSpinner } from "react-icons/fa";
const page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const gradientTextClass =
    "p-2 text-6xl md:text-7xl font-extrabold tracking-tight " +
    "bg-clip-text text-transparent mb-2 " +
    "bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-600";
  const buttonClass =
    "px-10 py-5 text-2xl font-bold rounded-xl transition-all duration-300 " +
    "shadow-2xl hover:shadow-lg focus:outline-none";

  const router = useRouter();
  const handleStartChat = () => {
    setIsLoading(true);
    router.push("/chatbot");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <h1 className={gradientTextClass}>Sigma-AI</h1>
      <p className="text-xl md:text-2xl mt-4 text-gray-400">
        Intelligent Conversations, Unleashed.
      </p>

      <div className="w-full max-w-lg text-center p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/50">
        <div className="space-y-3 mb-10 text-gray-400">
          <p className="text-sm md:text-base">
            <span className="font-semibold text-gray-300">Powered By:</span>{" "}
            Google Gemini 2.5 Flash
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold text-gray-300">Developed By:</span>{" "}
            Shriharsh Nandigamwar
          </p>
        </div>
        <div className="flex justify-center space-x-6 mb-12">
          {/* Linkedin */}
          <motion.a
            href="https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 transition-colors"
          >
            <FaLinkedin size={30} />
          </motion.a>
          {/* Twitter */}
          <motion.a
            href="https://x.com/Harsh477011?s=09
"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 transition-colors"
          >
            <FaTwitter size={30} />
          </motion.a>
          {/* GitHub */}
          <motion.a
            href="https://github.com/HarshNandigamwar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 transition-colors"
          >
            <FaGithub size={30} />
          </motion.a>
        </div>
        {/* Start Chat Button */}
        <motion.button
          onClick={handleStartChat}
          disabled={isLoading}
          className={buttonClass + " text-white border-none cursor-pointer"}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, y: 1, boxShadow: "0 0 0 0" }}
          style={{
            backgroundImage: "linear-gradient(45deg, #4F46E5, #9333EA)",
          }}
        >
          {!isLoading ? (
            <span className="flex gap-2 items-center">
              <FaSpinner className="animate-spin" size={24} />
              <span>Loading...</span>
            </span>
          ) : (
            "Start Chat"
          )}
        </motion.button>
      </div>

      {/* Footer   */}
      <Footer />
    </div>
  );
};

export default page;
