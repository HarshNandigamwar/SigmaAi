import { motion } from "framer-motion";
export type Role = "user" | "model";
export interface Message {
  id: string;
  role: Role;
  content: string;
  isLoading?: boolean;
}

const MessageBox: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  const baseClasses =
    "max-w-[70%] p-3 rounded-xl shadow-md my-2 whitespace-pre-wrap";
  const userClasses = "bg-blue-600 text-white ml-auto rounded-br-none";
  const modelClasses = "bg-gray-100 text-gray-800 mr-auto rounded-tl-none";

  return (
    <>
      <p
        className={`mb-0 underline text-gray-400 flex ${
          isUser ? "hidden" : "justify-start"
        }`}
      >
        Sigma AI
      </p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`${baseClasses} ${isUser ? userClasses : modelClasses}`}
        >
          {message.content}
        </div>
      </motion.div>
    </>
  );
};

export default MessageBox;
