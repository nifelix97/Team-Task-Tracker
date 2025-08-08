import React from 'react'
import { useTask } from '../hooks/useTask'

interface FilterComponentProps {
    label: string;
    filterType: 'status' | 'priority' | 'dueDate' | 'category'| 'assignedTo';
}

const FilterComponent: React.FC<FilterComponentProps> = ({ label, filterType }) => {
    const { filters, setFilters, tasks } = useTask();

    const handleFilterChange = (value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const getUniqueCategories = () => {
        const categories = [...new Set(tasks.map(task => task.category))];
        return categories.filter(category => category !== undefined && category !== '');
    };

    const renderFilterInput = () => {
        switch (filterType) {
            case 'status':
                return (
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="all">All</option>
                        <option value="Incompleted">Incompleted</option>
                        <option value="Completed">Completed</option>
                    </select>
                );

            case 'priority':
                return (
                    <select
                        value={filters.priority}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="all">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                );

            case 'dueDate':
                return (
                    <select
                        value={filters.dueDate}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="all">All Due Dates</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Today">Today</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="No Due Date">No Due Date</option>
                    </select>
                );

            case 'category':
                const categories = getUniqueCategories();
                return (
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                );

            case 'assignedTo':
                const assignedToOptions = [...new Set(tasks.map(task => task.assignedTo))].filter(Boolean);
                return (
                    <select
                        value={filters.assignedTo}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="all">All Assigned To</option>
                        {assignedToOptions.map((assigned) => (
                            <option key={assigned} value={assigned}>
                                {assigned}
                            </option>
                        ))}
                    </select>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {renderFilterInput()}
        </div>
    );
};

export default FilterComponent;