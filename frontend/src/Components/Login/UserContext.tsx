import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthUser {
  userId: string | null;
}

interface UserContextType {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>({ userId: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};