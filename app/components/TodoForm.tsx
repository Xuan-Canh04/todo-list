'use client';

import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Thêm công việc mới..."
        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
      />
      <button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <Plus size={18} /> Thêm
      </button>
    </form>
  );
}
