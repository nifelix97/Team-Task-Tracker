import FilterBar from "./FilterBar";
import TaskCard from "./cards/TaskCard";
import { useTask } from "../hooks/useTask";
import { FaTasks } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdOutlineDangerous } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import TasksTable from "./TasksTable";
import Layout from '../components/Layout'

export default function Dashboard() {
    const { tasks } = useTask();
    
    return (
        <Layout>
            <main className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 p-6 pt-24 md:pt-20">
                <TaskCard 
                    icon={FaTasks}
                    title="Total Tasks"
                    number={tasks.length}
                />
                <TaskCard 
                    icon={IoCheckmarkDoneOutline} 
                    title="Total Completed" 
                    number={tasks.filter(task => task.status === 'Completed').length} 
                />
                <TaskCard 
                    icon={MdOutlineDangerous} 
                    title="Total Incomplete" 
                    number={tasks.filter(task => task.status === 'Incompleted').length} 
                />
                <TaskCard 
                    icon={TbCategoryPlus} 
                    title="Total Categories" 
                    number={new Set(tasks.map(task => task.category)).size} 
                />
            </main>
            
            <div className="mx-6 my-4">
                <FilterBar />
            </div>
            
            <div className="mx-6 my-4 p-4 bg-white shadow-md rounded-lg">
                <TasksTable />
            </div>
        </Layout>
    )
}