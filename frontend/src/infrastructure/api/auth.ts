import { api } from './axios';
import { tokenStore } from '@/utils/tokenStorage';
import { roleStorage } from '@/utils/roleStorage';
import { User } from '@/domain/auth';

interface LoginDTO {
  username: string;
  password: string;
}
interface TokenPair {
  access: string;
  refresh: string;
}
interface LoginResponse extends TokenPair {
  user: User;
}

export async function login(payload: LoginDTO): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/api/auth/login/', payload);
  tokenStore.set(data.access, data.refresh);
  roleStorage.set(data.user.role);
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
