"use client";

import { useState } from "react";
import { Pencil, Trash2, CheckCircle2, Circle, Clock, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Task, TaskStatus } from "../types/todo";

interface TodoItemProps {
  task: Task;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
  onUpdate: (id: string, newTitle: string) => Promise<boolean | void>;
  onDelete: (id: string) => Promise<boolean | void>;
}

export default function TodoItem({
  task,
  onStatusChange,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed || isSaving) return;

    setIsSaving(true);
    const success = await onUpdate(task.id, trimmed);
    if (success !== false) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  // Định nghĩa thứ tự các bước: 0: todo, 1: in-progress, 2: completed
  const statusOrder: TaskStatus[] = ["todo", "in-progress", "completed"];

  const handleMoveLeft = () => {
    const currentIndex = statusOrder.indexOf(task.status);
    if (currentIndex > 0) {
      onStatusChange(task.id, statusOrder[currentIndex - 1]);
    }
  };

  const handleMoveRight = () => {
    const currentIndex = statusOrder.indexOf(task.status);
    if (currentIndex < statusOrder.length - 1) {
      onStatusChange(task.id, statusOrder[currentIndex + 1]);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    if (task.status === "completed") {
      const confirmed = window.confirm("Công việc này đã hoàn thành. Bạn có chắc chắn muốn xóa không?");
      if (!confirmed) return;
    }

    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const isCompleted = task.status === "completed";
  const isInProgress = task.status === "in-progress";
  const isTodo = task.status === "todo";

  return (
    <div
      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
        isCompleted
          ? "bg-slate-50 border-slate-200 opacity-75"
          : isInProgress
          ? "bg-amber-50/40 border-amber-200 shadow-xs"
          : "bg-white border-slate-200 shadow-xs"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
        {/* Nút lùi bước */}
        {!isTodo && (
          <button
            onClick={handleMoveLeft}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Lùi bước trước"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div className="text-slate-500 shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="text-emerald-600" size={20} />
          ) : isInProgress ? (
            <Clock className="text-amber-500 animate-pulse" size={20} />
          ) : (
            <Circle size={20} className="text-slate-400" />
          )}
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void handleSaveEdit();
              }
              if (e.key === "Escape") setIsEditing(false);
            }}
            className="flex-1 px-2 py-1 border border-slate-400 rounded-lg bg-white text-sm shadow-sm focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
            autoFocus
          />
        ) : (
          <div className="flex flex-col min-w-0 flex-1">
            <span
              className={`text-sm truncate ${
                isCompleted ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {/* Nút tiến bước */}
        {!isCompleted && (
          <button
            onClick={handleMoveRight}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Tiến bước tiếp theo"
          >
            <ChevronRight size={16} />
          </button>
        )}

        {isEditing ? (
          <>
            <button
              onClick={() => void handleSaveEdit()}
              disabled={isSaving}
              className="px-2.5 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1 ml-1"
            >
              {isSaving ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Đang lưu...
                </>
              ) : (
                "Lưu"
              )}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              title="Sửa"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              title="Xóa"
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </button>
          </>
        )}
      </div>
    </div>
  );
}