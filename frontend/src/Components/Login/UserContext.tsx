import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthUser {
  userId: string | null;
  // Include any other user details you want to store globally
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