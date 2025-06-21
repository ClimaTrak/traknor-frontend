import { UserRole } from '../schemas/userSchema';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
