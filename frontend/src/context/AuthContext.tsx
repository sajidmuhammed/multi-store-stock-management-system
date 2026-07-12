import {
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";
import type { User } from "../features/auth/types/auth.types";
import { tokenStorage } from "../lib/token";

interface AuthState {
  token: string | null;
  user: User | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    user: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = tokenStorage.getToken();
    const user = tokenStorage.getUser();

    if (token && user) {
      setAuth({
        token,
        user: JSON.parse(user),
      });
    }

    setIsInitialized(true);
  }, []);

  const login = (token: string, user: User) => {
    tokenStorage.setToken(token);
    tokenStorage.setUser(JSON.stringify(user));

    setAuth({
      token,
      user,
    });

    toast.success("Logged in successfully");
  };

  const logout = () => {
    tokenStorage.clear();

    setAuth({
      token: null,
      user: null,
    });

    toast.success("Logged out successfully");
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      isInitialized,
      login,
      logout,
    }),
    [auth, isInitialized]
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}