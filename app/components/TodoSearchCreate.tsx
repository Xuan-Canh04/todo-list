'use client';

import { Plus, Search } from 'lucide-react';

interface TodoSearchCreateProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreate: (title: string) => void;
}

export default function TodoSearchCreate({
  searchTerm,
  onSearchChange,
  onCreate,
}: TodoSearchCreateProps) {
  return (
    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
        <Search size={18} />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Tìm kiếm hoặc nhập để thêm công việc mới..."
        className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-800"
      />
      {searchTerm.trim() && (
        <button
          type="button"
          onClick={() => {
            onCreate(searchTerm.trim());
            onSearchChange('');
          }}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all shadow-sm"
        >
          <Plus size={14} />
          Thêm mới
        </button>
      )}
    </div>
  );
}