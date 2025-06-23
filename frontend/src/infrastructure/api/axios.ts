import axios, { AxiosError } from 'axios';
import { tokenStore } from '@/utils/tokenStorage';
import { refreshToken, logout } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  const access = tokenStore.access;
  if (access) {
    // eslint-disable-next-line no-param-reassign
    (config.headers ||= {}).Authorization = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original: any = error.config;
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;
      try {
        const { access, refresh } = await refreshToken();
        tokenStore.set(access, refresh);
        return api(original);
      } catch {
        logout();
        return Promise.reject(error);
      }
    }
    if (error.response?.status === 403) {
      logout();
    }
    return Promise.reject(error);
  },
);

export { api };
