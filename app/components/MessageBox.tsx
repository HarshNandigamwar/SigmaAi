import { motion } from "framer-motion";
export type Role = "user" | "model";
export interface Message {
  id: string;
  role: Role;
  content: string;
  isLoading?: boolean;
  timestamp: string;
}

const MessageBox: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  const baseClasses =
    "max-w-[70%] p-3 pb-0 rounded-xl shadow-md my-2 whitespace-pre-wrap";
  const userClasses = "bg-blue-600 text-white ml-auto rounded-br-none";
  const modelClasses = "bg-[#2a2a2a] text-white mr-auto rounded-tl-none";

  // Time stamp
  const formatTimestamp = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const datePart = `${year}-${month}-${day}`;
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, "0");
    const timePart = `${formattedHours}:${minutes} ${ampm}`;
    return `${datePart} ${timePart}`;
  };
  const formattedTime = formatTimestamp(message.timestamp);

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
          <p
            className={`text-xs flex justify-end p-1 mt-1 ${
              isUser ? "text-blue-200" : "text-gray-400"
            }`}
          >
            {formattedTime}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default MessageBox;
