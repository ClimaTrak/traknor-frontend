import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/modules/users/schemas/userSchema';

export function isAuthorized(allowed: UserRole[]): boolean {
  const { role } = useAuth();
  return !!role && allowed.includes(role);
}
