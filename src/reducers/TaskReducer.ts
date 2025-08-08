import type { Task, TaskAction } from '../types/tasks';

const STORAGE_KEY = 'team-task-tracker-tasks';

const saveTasksToLocalStorage = (tasks: Task[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to local storage:', error);
    }
}

export const loadTasksFromLocalStorage = (): Task[] => {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error('Error loading tasks from local storage:', error);
        return [];
    }
}

export const TaskReducer = (state: Task[], action: TaskAction): Task[] => {
    let newState: Task[];
    
    switch (action.type) {
        case 'ADD_TASK':
            newState = [...state, action.payload];
            break;
        case 'DELETE_TASK':
            newState = state.filter(task => task.id !== action.payload);
            break;
        case 'UPDATE_TASK':
        case 'EDIT_TASK':
            newState = state.map(task =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload, updatedAt: new Date().toISOString() }
                    : task
            );
            break;
        case 'UPDATE_TASK_STATUS':
            newState = state.map(task =>
                task.id === action.payload.id 
                    ? { ...task, status: action.payload.status, updatedAt: new Date().toISOString() }
                    : task
            );
            break;
        case 'LOAD_TASKS':
            return action.payload; // Don't save when loading
        default:
            return state;
    }

    saveTasksToLocalStorage(newState);
    return newState;
};