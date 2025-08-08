import { TaskProvider } from './context/TaskContext';
import { CheckLoggedInProvider } from './context/CheckLoggedInContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <CheckLoggedInProvider>
      <TaskProvider>
        <AppRoutes />
      </TaskProvider>
    </CheckLoggedInProvider>
  )
}

export default App