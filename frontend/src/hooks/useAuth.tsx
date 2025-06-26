import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
} from '@/infrastructure/api/auth';
import { tokenStore } from '@/utils/tokenStorage';
import { roleStorage } from '@/utils/roleStorage';
import type { Role } from '@/domain/auth';

interface Credentials {
  username: string;
  password: string;
}

interface AuthContextValue {
  access: string | null;
  refresh: string | null;
  role: Role | null;
  login: (c: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<string | null>(tokenStore.access);
  const [refresh, setRefresh] = useState<string | null>(tokenStore.refresh);
  const [role, setRole] = useState<Role | null>(roleStorage.role);

  const login = useCallback(async (cred: Credentials) => {
    const { access: a, refresh: r, user } = await apiLogin(cred);
    setAccess(a);
    setRefresh(r);
    setRole(user.role);
  }, []);

  const logout = useCallback(() => {
    roleStorage.clear();
    apiLogout();
  }, []);

  return (
    <AuthContext.Provider value={{ access, refresh, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
