import { createContext, useReducer, useState, useMemo, type ReactNode, useEffect } from "react";
import { loadTasksFromLocalStorage, TaskReducer } from "../reducers/TaskReducer";
import type { Task, Category, TaskAction, TaskStatus, TaskPriority, DueDate } from '../types/tasks';

interface FilterState {
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    dueDate: DueDate | 'all';
    category: string | 'all';
    assignedTo?: string | 'all';
}

interface TaskContextType {
    tasks: Task[]
    filteredTasks: Task[]
    categories: Category[]
    filters: FilterState
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>
    dispatch: (action: TaskAction) => void; 
    clearFilters: () => void;
}

interface TaskProviderProps {
    children: ReactNode
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({children}: TaskProviderProps) => {
    const [tasks, dispatch] = useReducer(TaskReducer, []);
    
    const [categories, setCategories] = useState<Category[]>([]);
    
    const [filters, setFilters] = useState<FilterState>({
        status: 'all',
        priority: 'all',
        dueDate: 'all',
        category: 'all',
        assignedTo: 'all'
    });

    useEffect(() => {
        const savedTasks = loadTasksFromLocalStorage();
        if (savedTasks.length > 0) {
            console.log('Loading tasks from localStorage:', savedTasks);
            dispatch({ type: 'LOAD_TASKS', payload: savedTasks });
        }
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filters.status !== 'all' && task.status !== filters.status) {
                return false;
            }
            if (filters.priority !== 'all' && task.priority !== filters.priority) {
                return false;
            }
            if (filters.dueDate !== 'all' && task.dueDate !== filters.dueDate) {
                return false;
            }
            if (filters.category !== 'all' && task.category !== filters.category) {
                return false;
            }
            if (filters.assignedTo && filters.assignedTo !== 'all' && task.assignedTo !== filters.assignedTo) {
                return false;
            }
            return true;
        });
    }, [tasks, filters]);

    const clearFilters = () => {
        setFilters({
            status: 'all',
            priority: 'all',
            dueDate: 'all',
            category: 'all',
            assignedTo: 'all'
        });
    };

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            filteredTasks,
            categories, 
            filters,
            setCategories, 
            setFilters,
            dispatch, // ✅ Only expose dispatch - no wrapper functions
            clearFilters,
        }}>
            {children}
        </TaskContext.Provider>
    );
}