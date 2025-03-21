import React from "react";
import { motion } from "framer-motion";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <motion.div
      onClick={() => toggle(id)}
      className="flex items-center my-3 gap-2 p-4 bg-[#2A2A3C] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.05, backgroundColor: "#33334D" }}
    >
      <div className="flex flex-1 items-center">
        <motion.img
          src={isComplete ? tick : not_tick}
          alt="Status Icon"
          className="w-7"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <p
          className={`ml-4 text-lg transition-all ${
            isComplete ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {text}
        </p>
      </div>

      <motion.img
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(id);
        }}
        src={delete_icon}
        alt="Delete Icon"
        className="w-4 cursor-pointer p-2 bg-red-500 rounded-md hover:bg-red-600 transition-all"
        whileHover={{ scale: 1.2, rotate: 10 }}
      />
    </motion.div>
  );
};

export default TodoItems;
