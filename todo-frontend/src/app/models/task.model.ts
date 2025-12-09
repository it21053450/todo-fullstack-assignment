export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string; // ISO date string from backend
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}