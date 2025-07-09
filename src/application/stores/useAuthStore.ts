import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/domain/auth';

// Armazena informações de autenticação utilizando Zustand

interface AuthActions {
  login: (token: string, user: User) => void;
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    // Estado será salvo no localStorage
    (set) => ({
      token: null,
      user: null,
      login: (token: string, user: User) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth',
    },
  ),
);
