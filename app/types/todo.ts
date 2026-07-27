export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: number;
}