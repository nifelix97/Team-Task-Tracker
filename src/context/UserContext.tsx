import { createContext, useState, type ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@gmail.com",
    },
    {
      id: 2,
      name: "Jane Felix",
      email: "jane@gmail.com",
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob@gmail.com",
    },
  ]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};