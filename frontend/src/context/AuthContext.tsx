import {
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  useEffect(() => {
    const token = tokenStorage.getToken();
    const user = tokenStorage.getUser();

    if (token && user) {
      setAuth({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  const login = (token: string, user: User) => {
    tokenStorage.setToken(token);
    tokenStorage.setUser(JSON.stringify(user));

    setAuth({
      token,
      user,
    });
  };

  const logout = () => {
    tokenStorage.clear();

    setAuth({
      token: null,
      user: null,
    });
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      login,
      logout,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}