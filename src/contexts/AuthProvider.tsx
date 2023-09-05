"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import ApiService from "@/utils/ApiService";
import { LoginState } from "@/types/auth";
import { usePathname, useRouter } from "next/navigation";
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
  authToken: string | null;
}

const AUTH_ROUTES = ["/login", "/register"];
const AUTHENTICATED_ROUTES = ["/settings", "/questions/new", "/my-questions"];

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
  const [authIsChecked, setAuthIsChecked] = useState<boolean>(false);

  // Navigation related hooks
  const router = useRouter();
  const currentPage = usePathname();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Function checkAuth takes an authentication token, and checks for its validity
  const checkAuth = async (token: string) => {
    // If the token doesn't exist end the function early
    if (!token) {
      setLoading(false);
      setAuthIsChecked(true);
      return;
    }

    // Begin loading state
    setLoading(true);

    try {
      // Try to get the current user with the given token
      const res = await ApiService.getCurrentUser(token);

      // If the response is successful and user is found, setUser with data from response
      if (res && res.status === 200) {
        setUser(res.data);
      }
      // If the response has status 401 (unauthorized), clear the authentication token
      else if (res && res.status === 401) {
        setAuthToken(null);
      }
    } catch (error) {
      // If error occurs during the try block, setError with response from error caught
      setError("An error occurred while logging in.");
    } finally {
      // In either case (success or failure), toggle off loading state and indicate the authentication has been checked
      setLoading(false);
      setAuthIsChecked(true);
    }
  };

  // On routing or navigation, redirect based on authentication state
  React.useEffect(() => {
    // Clear any existing error
    setError(null);

    // If user is authenticated and tries to access auth routes, redirect to home page
    if (authIsChecked && isAuthenticated && AUTH_ROUTES.includes(currentPage)) {
      router.push("/");
    }

    // If user is not authenticated and tries to access routes that require authentication, redirect to login page
    if (
      authIsChecked &&
      !isAuthenticated &&
      AUTHENTICATED_ROUTES.includes(currentPage)
    ) {
      router.push("/login");
    }

    // End page loading after 500ms
    setTimeout(() => setPageLoading(false), 500);

    // Following line is to avoid eslint warning about dependencies in useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isAuthenticated, authIsChecked]);

  // When the component mounts, verify the user's authentication
  React.useEffect(() => {
    if (authToken) {
      checkAuth(authToken);
    }

    // Following line is to avoid eslint warning about dependencies in useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear user data if the authentication token disappears/gets cleared
  React.useEffect(() => {
    if (!authToken) {
      setUser(null);
      setAuthIsChecked(true);
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
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        error,
        loading,
        authToken,
      }}
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
