import React from 'react'
import { useTask } from '../hooks/useTask'
import FilterComponent from './FilterComponent'

const FilterBar: React.FC = () => {
    const { filteredTasks, tasks, clearFilters, filters } = useTask();

    const hasActiveFilters = 
        filters.status !== 'all' ||
        filters.priority !== 'all' ||
        filters.dueDate !== 'all' ||
        filters.category !== 'all' ||
        filters.assignedTo !== 'all';

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 justify-between">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Filter Tasks 
                    <span className="ml-2 text-sm font-normal text-gray-600">
                        ({filteredTasks.length} of {tasks.length} tasks)
                    </span>
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <FilterComponent label="Status" filterType="status" />
                <FilterComponent label="Priority" filterType="priority" />
                <FilterComponent label="Due Date" filterType="dueDate" />
                <FilterComponent label="Category" filterType="category" />
                <FilterComponent label="Assigned To" filterType="assignedTo" />
            </div>
        </div>
    );
};

export default FilterBar;