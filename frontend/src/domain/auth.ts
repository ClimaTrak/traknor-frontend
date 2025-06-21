export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
