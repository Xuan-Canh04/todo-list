'use client';

import { memo, useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAdd: (title: string) => Promise<boolean | void>;
}

const TodoForm = memo(function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onAdd(trimmed);
    if (success !== false) {
      setInput('');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Thêm công việc mới..."
        className={`flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 ${
          input ? 'text-slate-950' : 'text-slate-500'
        }`}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Đang thêm...' : 'Thêm'}
      </button>
    </form>
  );
});

export default TodoForm;
