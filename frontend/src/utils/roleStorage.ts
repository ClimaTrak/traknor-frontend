import { Role } from '../domain/auth';

// Armazena o papel do usuário selecionado

const ROLE_KEY = 'tk_role';

export const roleStorage = {
  // Obtém o papel salvo
  get role(): Role | null {
    return localStorage.getItem(ROLE_KEY) as Role | null;
  },
  // Define o papel no localStorage
  set(role: Role) {
    localStorage.setItem(ROLE_KEY, role);
  },
  // Remove o papel armazenado
  clear() {
    localStorage.removeItem(ROLE_KEY);
  },
};
