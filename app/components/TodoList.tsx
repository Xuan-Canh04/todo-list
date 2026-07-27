"use client";

import { useState, useEffect } from "react";
import { Task } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  tasks,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-3">
        <p className="text-center text-slate-400 py-8 text-sm">
          Đang tải...
        </p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-center text-slate-400 py-8 text-sm">
          Chưa có công việc nào. Hãy thêm task mới!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}