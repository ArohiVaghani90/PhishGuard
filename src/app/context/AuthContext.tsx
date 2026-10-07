import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  joinedAt: string;
  points: number;
  department?: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (data: SignupData) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    username: 'Alex_J1!',
    email: 'user@phishguard.com',
    password: 'Password1!',
    role: 'user',
    joinedAt: '2024-01-15',
    points: 2450,
    department: 'Engineering',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    username: 'Admin_S2!',
    email: 'admin@phishguard.com',
    password: 'Admin1!',
    role: 'admin',
    joinedAt: '2023-09-01',
    points: 5800,
    department: 'IT Security',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const account = DEMO_USERS.find(a => a.email === email && a.password === password);
    if (account) {
      const { password: _pw, ...userData } = account;
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (data: SignupData): boolean => {
    const newUser: User = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      role: 'user',
      joinedAt: new Date().toISOString().split('T')[0],
      points: 0,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{
      user, login, signup, logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
