import { Role } from '../domain/auth';

/**
 * Retorna a rota inicial apropriada para o papel informado.
 */

/**
 * Mapeia o papel do usuário para a rota padrão correspondente.
 */
export function getHomeByRole(role: Role | null | undefined): string {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'manager':
      return '/dashboard';
    case 'technician':
      return '/work-orders/my';
    default:
      return '/dashboard';
  }
}
