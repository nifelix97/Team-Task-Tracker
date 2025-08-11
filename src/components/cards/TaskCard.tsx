import React from 'react'
import type { IconType } from 'react-icons/lib';

interface TaskCardProps {
    icon: IconType;
    title: string;
    number: number;
    
}

const TaskCard: React.FC<TaskCardProps> = ({ icon: Icon, title, number }) => {
    return (
        <div className='bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 mb-4'>
            <Icon className='w-8 h-8 text-white rounded bg-green-500' />
            <div>
                <h3 className='text-lg font-semibold'>{title}</h3>
                <p className='text-gray-500'>{number} tasks</p>
            </div>
        </div>
    );
}

export default TaskCard;
