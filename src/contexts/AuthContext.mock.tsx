import type { ReactNode } from 'react';
import { AuthContext } from '@/hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider
    value={{ access: 'dev', refresh: 'dev', role: 'admin', login: async () => {}, logout: () => {} }}
  >
    {children}
  </AuthContext.Provider>
);
