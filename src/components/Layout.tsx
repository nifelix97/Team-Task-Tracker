import type { ReactNode } from 'react';
import NavBar from './NavBar'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      {children}
    </div>
  )
}