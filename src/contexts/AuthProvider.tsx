"use client";

import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
import { hasCookie } from "@/actions/checkCookie";
import ApiService from "@/utils/ApiService";
import { LoginState } from "@/types/auth";

interface UserData {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (state: LoginState) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      if (!(await hasCookie())) return;
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/auth/check",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.isAuth) {
          setIsAuthenticated(data.isAuth);
        }
      } catch (error) {}
    };
    checkAuth();
  }, []);

  const login = async ({ email, password }: LoginState) => {
    const res = await ApiService.login(email, password);
    if (res && res.status === 200) {
      setIsAuthenticated(true);
      return res.data;
    }
    return null;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
