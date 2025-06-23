import { Role } from '../domain/auth';

const ROLE_KEY = 'tk_role';

export const roleStorage = {
  get role(): Role | null {
    return localStorage.getItem(ROLE_KEY) as Role | null;
  },
  set(role: Role) {
    localStorage.setItem(ROLE_KEY, role);
  },
  clear() {
    localStorage.removeItem(ROLE_KEY);
  },
};
