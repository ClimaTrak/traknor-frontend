import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/modules/users/schemas/userSchema';

/**
 * Verifica se o usuário atual possui permissão para acessar determinado recurso.
 */

/**
 * Retorna `true` caso o papel do usuário esteja na lista de papéis permitidos.
 */
export function isAuthorized(allowed: UserRole[]): boolean {
  const { role } = useAuth();
  return !!role && allowed.includes(role);
}
