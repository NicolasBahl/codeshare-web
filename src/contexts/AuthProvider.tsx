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
import { useRouter, usePathname } from "next/navigation";
import { UserData } from "@/types/user";

interface AuthContextType {
  user: UserData | null;
  login: (state: LoginState) => Promise<UserData | null>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component to encapsulate parts of your app where you want to share this context
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Use state hooks for user, authentication state, loading state and error state
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation related hooks
  const router = useRouter();
  const currentPage = usePathname();

  // Perform an authentication check. If user has a cookie, try to get current user.
  // If successful and user exists, set user. If unauthorized, set user to null.
  const checkAuth = async () => {
    if (!(await hasCookie())) {
      setLoading(false);
      return;
    }
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

  // Clear error when navigating to a new page
  React.useEffect(() => {
    setError(null);
  }, [currentPage]);

  // Check authentication on mount
  React.useEffect(() => {
    checkAuth();
  }, []);

  // For logging in a user. Makes a login request with email and password, then modifies
  // state based on server's response. Navigates to home page if login is successful.
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

  // To handle logging out. It makes a logout request and then updates state.
  const logout = async () => {
    await ApiService.logout();
    router.push("/login");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Provide context values to children
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use our Auth context. Will throw an error if not used within a component wrapped by `AuthProvider`.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
