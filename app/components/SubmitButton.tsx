import React from "react";
import { motion } from "framer-motion";
import { MdSend } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
interface SubmitButtonProps {
  loading: boolean;
  click: boolean;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, click }) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, y: 1, boxShadow: "0 0 0 0" }}
      type="submit"
      disabled={click}
      className={`px-6 py-3 text-white font-semibold rounded-lg shadow-xl transition-colors focus:outline-none ${
        loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? (
        <FaSpinner className="text-2xl animate-spin" />
      ) : (
        <MdSend className="text-2xl" />
      )}
    </motion.button>
  );
};

export default SubmitButton;
