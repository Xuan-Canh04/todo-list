"use client";

import { Task } from "../types/todo";

interface TodoStatsProps {
  tasks: Task[];
}

export default function TodoStats({ tasks }: TodoStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
        <span>Thống kê tiến độ</span>
        <span className="text-emerald-600 font-bold">{completed}/{total} hoàn thành ({percentage}%)</span>
      </div>

      {/* Thanh tiến trình */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
        <div
          className="bg-emerald-500 transition-all duration-300"
          style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
        />
        <div
          className="bg-amber-500 transition-all duration-300"
          style={{ width: `${total > 0 ? (inProgress / total) * 100 : 0}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Cần làm: <strong className="text-slate-700">{todo}</strong></span>
        <span>Đang làm: <strong className="text-amber-600">{inProgress}</strong></span>
        <span>Đã hoàn thành: <strong className="text-emerald-600">{completed}</strong></span>
      </div>
    </div>
  );
}