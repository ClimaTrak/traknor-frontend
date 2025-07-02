// Utilitário simples para armazenar tokens no localStorage
const ACCESS_KEY = 'tk_access';
const REFRESH_KEY = 'tk_refresh';

export const tokenStore = {
  // Token de acesso salvo no localStorage
  get access() {
    return localStorage.getItem(ACCESS_KEY);
  },
  // Refresh token salvo no localStorage
  get refresh() {
    return localStorage.getItem(REFRESH_KEY);
  },
  // Salva ambos os tokens
  set(access: string, refresh: string) {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  // Remove os tokens armazenados
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
