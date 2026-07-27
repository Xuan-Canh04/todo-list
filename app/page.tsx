"use client";

import { useState, useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import Notice from "./components/Notice";
import TodoSearchCreate from "./components/TodoSearchCreate";
import { TaskStatus } from "./types/todo";

export default function TodoApp() {
  const { tasks, addTask, updateTaskStatus, updateTaskTitle, deleteTask } = useTodos();
  const [isMounted, setIsMounted] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

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

  const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
    const success = await updateTaskStatus(id, newStatus);
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
    if (!success) return false;
    showNotice(success, "Xóa công việc thành công!");
    return success;
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          QUẢN LÝ CÔNG VIỆC
        </h1>

        <Notice notice={notice} onClose={() => setNotice(null)} />

        <div className="max-w-xl mx-auto mb-6">
          <TodoForm onAdd={handleAddTask} />
        </div>

        <div className="max-w-xl mx-auto mb-6">
          <TodoSearchCreate
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCreate={handleAddTask}
          />
        </div>

        <TodoList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onUpdate={handleUpdateTaskTitle}
          onDelete={handleDeleteTask}
        />

        <div className="mt-8 max-w-xl mx-auto">
          <TodoStats tasks={tasks} />
        </div>
      </div>
    </main>
  );
}