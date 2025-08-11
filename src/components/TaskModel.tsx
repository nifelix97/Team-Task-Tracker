import React, { useState, useEffect } from 'react'
import { useTask } from '../hooks/useTask'
import InPuts from './InPuts';
import type { TaskPriority, TaskStatus, DueDate, Task } from '../types/tasks';

interface TaskModelProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
}

interface TaskFormState {
  name: string;
  category: string;
  priority: TaskPriority | '';
  dueDate: DueDate | '';
  status: TaskStatus;
  assignedTo: string;
  errors: {
    name?: string;
    category?: string;
    priority?: string;
    dueDate?: string;
    assignedTo?: string;
  };
}

export default function TaskModel({ isOpen, onClose, taskToEdit }: TaskModelProps) {
  const { dispatch } = useTask(); 
  const isEditing = !!taskToEdit;

  const [formState, setFormState] = useState<TaskFormState>({
    name: '',
    category: '',
    priority: '',
    dueDate: '',
    status: 'Incompleted',
    assignedTo: '',
    errors: {}
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormState({
        name: taskToEdit.name,
        category: taskToEdit.category,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
        status: taskToEdit.status,
        assignedTo: taskToEdit.assignedTo,
        errors: {}
      });
    } else {
      setFormState({
        name: '',
        category: '',
        priority: '',
        dueDate: '',
        status: 'Incompleted',
        assignedTo: '',
        errors: {}
      });
    }
  }, [taskToEdit, isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  };

  const validateForm = (): boolean => {
    const errors: any = {};
    
    if (!formState.name.trim()) errors.name = 'Task name is required';
    if (!formState.category.trim()) errors.category = 'Category is required';
    if (!formState.priority) errors.priority = 'Priority is required';
    if (!formState.dueDate) errors.dueDate = 'Due date is required';
    if (!formState.assignedTo.trim()) errors.assignedTo = 'Assigned to is required';

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isEditing && taskToEdit) {
      const updatedTask: Task = {
        ...taskToEdit,
        name: formState.name,
        category: formState.category,
        priority: formState.priority as TaskPriority,
        dueDate: formState.dueDate as DueDate,
        status: formState.status,
        assignedTo: formState.assignedTo,
        updatedAt: new Date().toISOString()
      };
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } else {
      const newTask: Task = {
        id: Date.now(),
        name: formState.name,
        category: formState.category,
        priority: formState.priority as TaskPriority,
        dueDate: formState.dueDate as DueDate,
        status: formState.status,
        assignedTo: formState.assignedTo,
        updatedAt: new Date().toISOString()
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }
    handleClose();
  };

  const handleClose = () => {
    setFormState({
      name: '',
      category: '',
      priority: '',
      dueDate: '',
      status: 'Incompleted',
      assignedTo: '',
      errors: {}
    });
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="p-4 bg-white dark:bg-gray-500 rounded-lg shadow-md max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <InPuts 
            label="Task Name"
            name="name"
            placeholder="Enter task name"
            value={formState.name}
            onChange={handleInputChange}
          />
          {formState.errors.name && (
            <p className="text-red-500 text-sm mb-2">{formState.errors.name}</p>
          )}

          <InPuts 
            label="Category"
            name="category"
            placeholder="Enter category"
            value={formState.category}
            onChange={handleInputChange}
          />
          {formState.errors.category && (
            <p className="text-red-500 text-sm mb-2">{formState.errors.category}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={formState.priority}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {formState.errors.priority && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.priority}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Due Date</label>
            <select
              name="dueDate"
              value={formState.dueDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select due date</option>
              <option value="Overdue">Overdue</option>
              <option value="Today">Today</option>
              <option value="Upcoming">Upcoming</option>
              <option value="No Due Date">No Due Date</option>
            </select>
            {formState.errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.dueDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Incompleted">Incompleted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <InPuts 
            label="Assigned To"
            name="assignedTo"
            placeholder="Enter assignee name"
            value={formState.assignedTo}
            onChange={handleInputChange}
          />
          {formState.errors.assignedTo && (
            <p className="text-red-500 text-sm mb-2">{formState.errors.assignedTo}</p>
          )}

          <div className="flex gap-3 mt-4">
            <button 
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
            <button 
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}