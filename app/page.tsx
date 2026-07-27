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
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(null), 2500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const showNotice = (success: boolean, message: string) => {
    setNotice(
      success
        ? { type: "success", message }
        : { type: "error", message: `Thất bại: ${message}` }
    );
  };

  const handleAddTask = async (title: string) => {
    const success = await addTask(title);
    showNotice(success, success ? "Thêm công việc thành công!" : "Không thể thêm công việc.");
    return success;
  };

  const handleToggleTask = async (id: string) => {
    const success = await toggleTask(id);
    showNotice(success, success ? "Cập nhật trạng thái thành công!" : "Không thể cập nhật trạng thái.");
    return success;
  };

  const handleUpdateTaskTitle = async (id: string, newTitle: string) => {
    const success = await updateTaskTitle(id, newTitle);
    showNotice(success, success ? "Sửa công việc thành công!" : "Không thể sửa công việc.");
    return success;
  };

  const handleDeleteTask = async (id: string) => {
    const success = await deleteTask(id);
    showNotice(success, success ? "Xóa công việc thành công!" : "Không thể xóa công việc.");
    return success;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Quản Lý Công Việc
        </h1>

        {notice && (
          <div
            className={`fixed top-4 right-4 z-50 max-w-xs rounded-xl border px-4 py-3 text-sm shadow-lg animate-pulse ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {notice.message}
          </div>
        )}

        <TodoForm onAdd={handleAddTask} />

        <TodoList
          tasks={tasks}
          onToggle={handleToggleTask}
          onUpdate={handleUpdateTaskTitle}
          onDelete={handleDeleteTask}
        />

        <TodoStats tasks={tasks} />
      </div>
    </main>
  );
}