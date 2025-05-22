
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
  priority: TodoPriority;
  createdAt: Date;
}
