"use client";

import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../types/todo";
import TodoItem from "./TodoItem";
import { Circle, Clock, CheckCircle2 } from "lucide-react";

interface TodoListProps {
  tasks: Task[];
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
  onUpdate: (id: string, newTitle: string) => Promise<boolean | void>;
  onDelete: (id: string) => Promise<boolean | void>;
}

export default function TodoList({
  tasks,
  onStatusChange,
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
        <p className="text-center text-slate-400 py-8 text-sm">Đang tải...</p>
      </div>
    );
  }

  // Lọc trực tiếp danh sách task theo trạng thái
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Cột 1: Cần làm */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Circle size={18} className="text-slate-400" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Cần làm
            </h3>
          </div>
          <span className="bg-slate-200/80 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {todoTasks.length}
          </span>
        </div>
        <div className="space-y-3 flex-1 min-h-[150px]">
          {todoTasks.length === 0 ? (
            <p className="text-center text-slate-400 text-xs py-10 italic">Không có công việc</p>
          ) : (
            todoTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* Cột 2: Đang làm */}
      <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-4 flex flex-col shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-amber-200/80">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-amber-500 animate-pulse" />
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Đang làm
            </h3>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
            {inProgressTasks.length}
          </span>
        </div>
        <div className="space-y-3 flex-1 min-h-[150px]">
          {inProgressTasks.length === 0 ? (
            <p className="text-center text-amber-500/60 text-xs py-10 italic">Không có công việc</p>
          ) : (
            inProgressTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* Cột 3: Đã hoàn thành */}
      <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-4 flex flex-col shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-emerald-200/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Đã hoàn thành
            </h3>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
            {completedTasks.length}
          </span>
        </div>
        <div className="space-y-3 flex-1 min-h-[150px]">
          {completedTasks.length === 0 ? (
            <p className="text-center text-emerald-500/60 text-xs py-10 italic">Không có công việc</p>
          ) : (
            completedTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}