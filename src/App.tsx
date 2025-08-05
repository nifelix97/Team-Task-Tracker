import { useState } from 'react'
import NavBar from './components/NavBar'
import TaskCard from './components/cards/TaskCard'
import { LuClipboardList } from "react-icons/lu";


function App() {

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-6 pt-24 md:pt-20">
        <TaskCard icon={LuClipboardList} title="Task 1" number={5} />
        <TaskCard icon={LuClipboardList} title="Task 2" number={3} />
        <TaskCard icon={LuClipboardList} title="Task 3" number={8} />
      </main>
    </div>
    </>
  )
}

export default App


