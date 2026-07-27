'use client';

import { memo, type KeyboardEvent } from "react";
import { Pencil, Trash2, CheckCircle2, Circle, X } from "lucide-react";
import { Task } from "../types/todo";

interface TodoItemActionsProps {
  task: Task;
  isEditing: boolean;
  editValue: string;
  onEditChange: (value: string) => void;
  onToggle: (id: string) => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const TodoItemActions = memo(function TodoItemActions({
  task,
  isEditing,
  editValue,
  onEditChange,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onKeyDown,
}: TodoItemActionsProps) {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
      <button
        onClick={() => onToggle(task.id)}
        className="text-slate-500 hover:text-slate-800 shrink-0 cursor-pointer"
      >
        {task.completed ? (
          <CheckCircle2 className="text-emerald-600" size={20} />
        ) : (
          <Circle size={20} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full px-2 py-1 border border-slate-400 rounded-lg bg-white text-sm font-bold text-slate-900 shadow-sm focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
            autoFocus
          />
        ) : (
          <span
            className={`text-sm truncate block ${
              task.completed
                ? "line-through text-slate-500"
                : "text-slate-950 font-bold"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={onSaveEdit}
              className="px-2.5 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 cursor-pointer"
            >
              Lưu
            </button>
            <button
              onClick={onCancelEdit}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onStartEdit}
              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              title="Sửa"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
              title="Xóa"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default TodoItemActions;