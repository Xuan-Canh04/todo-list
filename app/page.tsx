"use client";

import { useState, useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

export default function TodoApp() {
  const { tasks, addTask, toggleTask, updateTaskTitle, deleteTask } =
    useTodos();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Quản Lý Công Việc
        </h1>

        <TodoForm onAdd={addTask} />

        <TodoList
          tasks={tasks}
          onToggle={toggleTask}
          onUpdate={updateTaskTitle}
          onDelete={deleteTask}
        />

        <TodoStats tasks={tasks} />
      </div>
    </main>
  );
}