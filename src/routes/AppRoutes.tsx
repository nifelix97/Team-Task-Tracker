import { Routes, Route } from "react-router-dom"
import Dashboard from "../components/Dashboard"
import Login from "../pages/auth/LoginPage"
import { NotFoundPage } from "../pages/NotFoundPage"

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
