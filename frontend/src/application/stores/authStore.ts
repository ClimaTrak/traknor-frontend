import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../../domain/auth';

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      login: (token: string) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth',
    },
  ),
);
