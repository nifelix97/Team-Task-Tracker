import { useState } from 'react';
import Button from './Button';
import TaskModel from './TaskModel'; 

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);

  return (
    <>
      <div className='bg-green-500 text-white p-4 fixed top-0 left-0 right-0 shadow-md z-50 '>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg md:text-xl font-bold truncate'>Team Task Tracker</h1>
          
          <div className='hidden sm:block'>
            <Button 
              label='+ Add Task' 
              onClick={() => {
                setIsTaskModelOpen(true)
              }} 
              className='bg-red-500 text-blue-500 px-4 py-2 text-sm md:text-base' 
            />
          </div>

          <div className='sm:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 rounded-md hover:bg-blue-600 transition-colors'
              aria-label='Toggle menu'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {isMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className='sm:hidden mt-4 pt-4 border-t border-blue-400'>
            <Button 
              label='+ Add Task' 
              onClick={() => {
                setIsMenuOpen(false);
                setIsTaskModelOpen(true);
              }} 
              className='bg-red-500 text-blue-500 w-full px-4 py-2 text-sm' 
            />
          </div>
        )}
      </div>
      <TaskModel 
          isOpen={isTaskModelOpen} 
          onClose={() => setIsTaskModelOpen(false)} 
        />
    </>
  )
}