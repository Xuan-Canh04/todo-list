'use client';

import { memo, useEffect, useRef, useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAdd: (title: string) => Promise<boolean | void>;
}

const TodoForm = memo(function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

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
});

export default TodoForm;
