export type Role = 'admin' | 'manager' | 'technician';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
