"use client";

import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
import ApiService from "@/utils/ApiService";
import { LoginState } from "@/types/auth";
import { useRouter, usePathname } from "next/navigation";
import { UserData } from "@/types/user";
import { useLocalStorage } from "usehooks-ts";
import { LuLoader2 } from "react-icons/lu";

interface AuthContextType {
  user: UserData | null;
  login: (state: LoginState) => Promise<UserData | null>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const AUTH_ROUTES = ["/login", "/register"];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component to encapsulate parts of your app where you want to share this context
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Loading state to manage API loading status
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // Error management states
  const [error, setError] = useState<string | null>(null);

  // User authentication token and user data state
  const [authToken, setAuthToken] = useLocalStorage("access_token", null);
  const [user, setUser] = useState<UserData | null>(null);

  // Navigation related hooks
  const router = useRouter();
  const currentPage = usePathname();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Function to verify authentication token
  const checkAuth = async (token: string) => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await ApiService.getCurrentUser(token);
      if (res && res.status === 200) {
        setUser(res.data);
      } else if (res && res.status === 401) {
        setAuthToken(null);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  // When location changes, clear error and if authenticated user navigates to auth routes, redirect to home
  React.useEffect(() => {
    setError(null);
    if (user && AUTH_ROUTES.includes(currentPage)) {
      router.push("/");
    }
    setTimeout(() => setPageLoading(false), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, user]);

  // Verify authentication when component mounts
  React.useEffect(() => {
    if (authToken) {
      checkAuth(authToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If authentication token disappears, clear user data
  React.useEffect(() => {
    if (!authToken) {
      setUser(null);
    }
  }, [authToken]);

  // Login function
  const login = async ({ email, password }: LoginState) => {
    setError(null);
    setLoading(true);
    try {
      const res = await ApiService.login(email, password);
      if (res && res.status === 200) {
        await checkAuth(res.data.token);
        setAuthToken(res.data.token);
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

  // Logout function
  const logout = async () => {
    await ApiService.logout();
    router.push("/login");
    setAuthToken(null);
  };

  if (pageLoading) {
    return (
      <div className={"flex h-screen items-center justify-center"}>
        <LuLoader2 className="animate-spin" size={48} />
      </div>
    );
  }

  // Exposing context to children
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/// Hook to expose Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
