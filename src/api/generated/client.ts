// Cliente Axios gerado automaticamente
import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.DEV ? '/' : import.meta.env.VITE_API_URL,
});
