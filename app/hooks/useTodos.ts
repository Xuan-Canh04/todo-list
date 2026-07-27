import { useCallback, useEffect, useState } from 'react';
import { Task, TaskStatus } from '../types/todo';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function normalizeServerTask(t: any): Task {
  let currentStatus: TaskStatus = 'todo';
  if (t.status) {
    currentStatus = t.status;
  } else if (t.completed) {
    currentStatus = 'completed';
  }

  return {
    id: String(t.id),
    title: t.title,
    status: currentStatus,
    priority: t.priority,
    createdAt: t.createdAt ? Number(t.createdAt) : undefined,
  };
}

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingAction, setLoadingAction] = useState<{ type: 'delete' | 'toggle' | 'update' | 'add'; id?: string } | null>(null);

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
    setLoadingAction({ type: 'add' });
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status: 'todo' }),
      });

      if (!res.ok) throw new Error('Failed to add task');

      const created = await res.json();
      setTasks((prev) => [normalizeServerTask(created), ...prev]);
      return true;
    } catch (err) {
      console.error('Failed to add task:', err);
      return false;
    } finally {
      setLoadingAction(null);
    }
  }, []);

  const updateTaskStatus = useCallback(async (id: string, newStatus: TaskStatus) => {
    setLoadingAction({ type: 'toggle', id });
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update task status');
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? normalizeServerTask(updated) : t)));
      return true;
    } catch (err) {
      console.error('Failed to update task status:', err);
      return false;
    } finally {
      setLoadingAction(null);
    }
  }, []);

  const updateTaskTitle = useCallback(async (id: string, newTitle: string) => {
    setLoadingAction({ type: 'update', id });
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
    } finally {
      setLoadingAction(null);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    setLoadingAction({ type: 'delete', id });
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error('Failed to delete task:', err);
      return false;
    } finally {
      setLoadingAction(null);
    }
  }, []);

  return {
    tasks,
    loadingAction,
    addTask,
    updateTaskStatus,
    updateTaskTitle,
    deleteTask,
  };
}