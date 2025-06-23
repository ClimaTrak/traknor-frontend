import { api } from './axios';
import { tokenStore } from '@/utils/tokenStorage';

interface LoginDTO { username: string; password: string; }
interface TokenPair { access: string; refresh: string; }

export async function login(payload: LoginDTO): Promise<TokenPair> {
  const { data } = await api.post<TokenPair>('/api/auth/login/', payload);
  tokenStore.set(data.access, data.refresh);
  return data;
}

export async function refreshToken(): Promise<TokenPair> {
  const { data } = await api.post<TokenPair>('/api/auth/refresh/', {
    refresh: tokenStore.refresh,
  });
  return data;
}

export function logout() {
  tokenStore.clear();
  window.location.href = '/login';
}
