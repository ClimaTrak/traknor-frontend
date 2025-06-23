import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { login as apiLogin, logout as apiLogout } from '@/infrastructure/api/auth';
import { tokenStore } from '@/utils/tokenStorage';

interface Credentials { username: string; password: string; }

interface AuthContextValue {
  access: string | null;
  refresh: string | null;
  login: (c: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<string | null>(tokenStore.access);
  const [refresh, setRefresh] = useState<string | null>(tokenStore.refresh);

  const login = useCallback(async (cred: Credentials) => {
    const { access: a, refresh: r } = await apiLogin(cred);
    setAccess(a);
    setRefresh(r);
  }, []);

  const logout = useCallback(() => {
    apiLogout();
  }, []);

  return (
    <AuthContext.Provider value={{ access, refresh, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
