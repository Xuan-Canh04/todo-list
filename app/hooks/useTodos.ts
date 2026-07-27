import { useCallback, useEffect, useState } from 'react';
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

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(Array.isArray(data) ? data.map(normalizeServerTask) : []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    void fetchTasks().then(() => {
      if (!mounted) return;
    });

    return () => {
      mounted = false;
    };
  }, [fetchTasks]);

  const addTask = useCallback(async (title: string) => {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });

      if (!res.ok) {
        throw new Error('Failed to add task');
      }

      const created = await res.json();
      setTasks((prev) => [normalizeServerTask(created), ...prev]);
      return true;
    } catch (err) {
      console.error('Failed to add task:', err);
      return false;
    }
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    const existing = tasks.find((t) => t.id === id);
    if (!existing) return false;
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !existing.completed }),
      });
      if (!res.ok) throw new Error('Failed to toggle task');
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? normalizeServerTask(updated) : t)));
      return true;
    } catch (err) {
      console.error('Failed to toggle task:', err);
      return false;
    }
  }, [tasks]);

  const updateTaskTitle = useCallback(async (id: string, newTitle: string) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error('Failed to update task title');
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? normalizeServerTask(updated) : t)));
      return true;
    } catch (err) {
      console.error('Failed to update task title:', err);
      return false;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error('Failed to delete task:', err);
      return false;
    }
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    updateTaskTitle,
    deleteTask,
  };
}
