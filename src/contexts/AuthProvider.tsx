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
import { useRouter } from "next/navigation";
import { UserData } from "@/types/user";

interface AuthContextType {
  user: UserData | null;
  login: (state: LoginState) => Promise<UserData | null>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkAuth = async () => {
    if (!(await hasCookie())) return;
    setLoading(true);
    try {
      const res = await ApiService.getCurrentUser();
      if (res && res.status === 200) {
        setUser(res.data);
      } else if (res && res.status === 401) {
        setUser(null);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  const login = async ({ email, password }: LoginState) => {
    setError(null);
    setLoading(true);
    try {
      const res = await ApiService.login(email, password);
      if (res && res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        await checkAuth();
        router.push("/");
        return res.data;
      } else if (res && res.status === 401) {
        setError("Invalid email or password.");
        return null;
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await ApiService.logout();
    router.push("/login");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, error, loading }}
    >
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
