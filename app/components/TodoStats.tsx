import { Task } from "../types/todo";

interface TodoStatsProps {
  tasks: Task[];
}

export default function TodoStats({ tasks }: TodoStatsProps) {
  if (tasks.length === 0) return null;

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
      <span>Tổng số: {tasks.length} task</span>
      <span>
        Đã hoàn thành: {completedCount} / {tasks.length}
      </span>
    </div>
  );
}