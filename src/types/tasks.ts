export interface Task {
  id: number;
  name: string;
  category: string;
  priority: TaskPriority;
  dueDate: DueDate;
  assignedTo: string;
  status: TaskStatus;
  updatedAt: string;
}

export type TaskStatus = 'Incompleted' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskFilter = 'all' | 'Pending' | 'In Progress' | 'Completed';
export type DueDate = 'Overdue' | 'Today' | 'Upcoming' | 'No Due Date';

export interface Category {
  id: number;
  name: string;
}

export type TaskAction = 
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number } 
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'UPDATE_TASK_STATUS'; payload: { id: number; status: TaskStatus } }
  | { type: 'LOAD_TASKS'; payload: Task[] };