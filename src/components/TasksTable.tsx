import { CiEdit } from "react-icons/ci";
import { MdAutoDelete } from "react-icons/md";
import { useTask } from '../hooks/useTask';
import type { Task, TaskStatus, DueDate } from '../types/tasks';
import { ImSearch } from "react-icons/im";
import { useState } from "react";
import TaskModel from "./TaskModel";

export default function TasksTable() {
  const { filteredTasks, dispatch } = useTask();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);

  const handleEdit = (task: Task) => {
    let newStatus: TaskStatus;
    switch (task.status) {
      case 'Incompleted':
        newStatus = 'Completed';
        break;
      case 'Completed':
        newStatus = 'Incompleted';
        break;
      default:
        newStatus = 'Completed';
    }

    dispatch({ 
      type: 'UPDATE_TASK_STATUS', 
      payload: { id: task.id, status: newStatus }
    });
  };

  const handleUpdateTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModelOpen(true);
  }

  const handleCloseEditModel = () => {
    setEditingTask(null);
    setIsEditModelOpen(false);
  }

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }

  const getStatusBadge = (status: TaskStatus) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case 'Incompleted':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (priority) {
      case 'High':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Medium':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getDueDateBadge = (dueDate: DueDate) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (dueDate) {
      case 'Overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Today':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Upcoming':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'No Due Date':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4"><ImSearch className="mx-auto text-blue-500"/></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Task Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Priority</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Assigned To</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="py-2 px-4 border-b">{task.name}</td>
                <td className="py-2 px-4 border-b">{task.category}</td>
                <td className="py-2 px-4 border-b">
                  <span className={getPriorityBadge(task.priority)}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <span className={getDueDateBadge(task.dueDate)}>
                    {task.dueDate}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{task.assignedTo}</td>
                <td className="py-2 px-4 border-b">
                  <span className={getStatusBadge(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2 items-center justify-center">
                    <button 
                      onClick={() => handleEdit(task)} 
                      className="text-blue-500 hover:underline mr-2"
                      title="Toggle Status"
                    >
                      <CiEdit className='w-6 h-6'/>
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)} 
                      className="text-red-500 hover:underline"
                      title="Delete Task"
                    >
                      <MdAutoDelete className='w-6 h-6'/>
                    </button>
                    <button
                      onClick={() => handleUpdateTask(task)}
                      className='bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-300'
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModelOpen && editingTask && (
        <TaskModel
          isOpen={isEditModelOpen}
          onClose={handleCloseEditModel}
          taskToEdit={editingTask}
        />
      )}
    </>
  )
}