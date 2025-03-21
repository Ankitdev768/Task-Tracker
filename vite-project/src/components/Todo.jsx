import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "" || todoList.some(todo => todo.text === inputText)) {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-[#1E1E2E] place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-xl text-[#EAEAEA]">
      {/* Title */}
      <div className="flex items-center mt-7 gap-3">
        <img className="w-10" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-3xl font-bold">ToDo List</h1>
      </div>

      {/* Input Box */}
      <div className="flex items-center my-7 bg-[#2A2A3C] rounded-lg shadow-md">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 text-lg text-white placeholder:text-gray-400"
          type="text"
          placeholder="Add your task..."
          onKeyDown={(e) => e.key === "Enter" && add()}
          aria-label="Task Input Field"
        />
        <button
          onClick={add}
          className="border-none rounded-lg bg-[#FF8C00] w-32 h-14 text-white text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-[#FFA500] hover:scale-105"
        >
          ADD +
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
