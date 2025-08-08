import React, { createContext, useState, useEffect } from 'react'

const CheckLoggedInContext = createContext<{
  user: User[];
  setUser: React.Dispatch<React.SetStateAction<User[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: [],
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
})

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export function CheckLoggedInProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(
    [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: 'password123'
        }
    ]
  );

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <CheckLoggedInContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </CheckLoggedInContext.Provider>
  )
}

export { CheckLoggedInContext }