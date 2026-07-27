import { useEffect, useState } from 'react';
import { Task } from '../types/todo';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function normalizeServerTask(t: any): Task {
  return {
    id: String(t.id),
    title: t.title,
    completed: !!t.completed,
    priority: t.priority,
    createdAt: t.createdAt ? Number(t.createdAt) : undefined,
  };
}

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let mounted = true;

    async function fetchTasks() {
      try {
        const res = await fetch(`${API_BASE}/tasks`);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        if (mounted) setTasks(Array.isArray(data) ? data.map(normalizeServerTask) : []);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    }

    fetchTasks();
    return () => {
      mounted = false;
    };
  }, []);

  const addTask = async (title: string) => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      const created = await res.json();
      setTasks((prev) => [normalizeServerTask(created), ...prev]);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const toggleTask = async (id: string) => {
    const existing = tasks.find((t) => t.id === id);
    if (!existing) return;
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !existing.completed }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? normalizeServerTask(updated) : t)));
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const updateTaskTitle = async (id: string, newTitle: string) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? normalizeServerTask(updated) : t)));
    } catch (err) {
      console.error('Failed to update task title:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return {
    tasks,
    addTask,
    toggleTask,
    updateTaskTitle,
    deleteTask,
  };
}
