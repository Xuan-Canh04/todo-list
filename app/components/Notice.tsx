'use client';

import {
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';

export interface NoticeData {
  type: 'success' | 'error';
  message: string;
}

interface NoticeProps {
  notice: NoticeData | null;
  onClose?: () => void;
}

export default function Notice({
  notice,
  onClose,
}: NoticeProps) {
  if (!notice) {
    return null;
  }

  const isSuccess = notice.type === 'success';

  return (
    <div
      className="fixed right-5 top-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
      role={isSuccess ? 'status' : 'alert'}
      aria-live="polite"
    >
      <div
        className={`relative overflow-hidden flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-xl transition-all ${
          isSuccess
            ? 'border-emerald-500/20 bg-white/95 text-emerald-900 shadow-emerald-500/5'
            : 'border-rose-500/20 bg-white/95 text-rose-900 shadow-rose-500/5'
        }`}
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="size-5" aria-hidden="true" />
          ) : (
            <AlertCircle className="size-5" aria-hidden="true" />
          )}
        </div>
        <span className="pr-2 text-sm font-semibold tracking-tight text-slate-800">
          {notice.message}
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Đóng thông báo"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
        <div
          className={`absolute bottom-0 left-0 h-[2px] w-full animate-pulse ${
            isSuccess ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
          style={{
            animationDuration: '2.5s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
      </div>
    </div>
  );
}