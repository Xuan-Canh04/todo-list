'use client';

import { memo, type KeyboardEvent } from "react";
import { Pencil, Trash2, CheckCircle2, Circle, Clock, X, Loader2 } from "lucide-react";
import { Task, TaskStatus } from "../types/todo";

interface TodoItemActionsProps {
  task: Task;
  isEditing: boolean;
  editValue: string;
  isSaving: boolean;
  isDeleting: boolean;
  onEditChange: (value: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
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
  isSaving,
  isDeleting,
  onEditChange,
  onStatusChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onKeyDown,
}: TodoItemActionsProps) {
  const handleCycleStatus = () => {
    const nextStatusMap: Record<TaskStatus, TaskStatus> = {
      todo: "in-progress",
      "in-progress": "completed",
      completed: "todo",
    };
    onStatusChange(task.id, nextStatusMap[task.status]);
  };

  const isCompleted = task.status === "completed";
  const isInProgress = task.status === "in-progress";

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
        <button
          onClick={handleCycleStatus}
          className="text-slate-500 hover:text-slate-800 shrink-0 cursor-pointer transition-transform active:scale-95"
          title={`Trạng thái: ${task.status}. Bấm để đổi.`}
        >
          {isCompleted ? (
            <CheckCircle2 className="text-emerald-600" size={20} />
          ) : isInProgress ? (
            <Clock className="text-amber-500 animate-pulse" size={20} />
          ) : (
            <Circle size={20} className="text-slate-400" />
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
            <div className="flex flex-col min-w-0">
              <span
                className={`text-sm truncate block ${
                  isCompleted
                    ? "line-through text-slate-500"
                    : "text-slate-950 font-bold"
                }`}
              >
                {task.title}
              </span>
              <span className="text-[10px] font-medium mt-0.5">
                {task.status === "todo" && (
                  <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md inline-block w-fit">Cần làm</span>
                )}
                {task.status === "in-progress" && (
                  <span className="text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-md inline-block w-fit">Đang làm</span>
                )}
                {task.status === "completed" && (
                  <span className="text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md inline-block w-fit">Đã hoàn thành</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={onSaveEdit}
              disabled={isSaving}
              className="px-2.5 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1"
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
});

export default TodoItemActions;