"use client";

import { useState } from "react";
import { Pencil, Trash2, CheckCircle2, Circle, X } from "lucide-react";
import { Task } from "../types/todo";

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  task,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onUpdate(task.id, trimmed);
    setIsEditing(false);
  };

  return (
    <div className={"flex items-center justify-between p-3.5 rounded-xl border transition-all " + (task.completed ? "bg-slate-50 border-slate-200 opacity-75" : "bg-white border-slate-200 shadow-xs")}>
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
        <button onClick={() => onToggle(task.id)} className="text-slate-500 hover:text-slate-800 shrink-0 cursor-pointer">
          {task.completed ? <CheckCircle2 className="text-emerald-600" size={20} /> : <Circle size={20} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") setIsEditing(false);
            }}
            className="flex-1 px-2 py-1 border border-slate-400 rounded-lg bg-white text-sm font-bold text-slate-900 shadow-sm focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
            autoFocus
          />
        ) : (
          <span className={"text-sm truncate " + (task.completed ? "line-through text-slate-500" : "text-slate-950 font-bold")}>
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit} className="px-2.5 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 cursor-pointer">Lưu</button>
            <button onClick={() => setIsEditing(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><X size={16} /></button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" title="Sửa"><Pencil size={16} /></button>
            <button onClick={() => onDelete(task.id)} className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer" title="Xóa"><Trash2 size={16} /></button>
          </>
        )}
      </div>
    </div>
  );
}
