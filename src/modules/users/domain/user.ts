import { UserRole } from '../schemas/userSchema';

/**
 * Representa um usuário do sistema.
 *
 * Utilizada em toda a aplicação para tipar as entidades vindas da API ou
 * armazenadas localmente. Segue o padrão definido na camada de domínio
 * utilizando apenas os campos necessários para as funcionalidades de usuários.
 */

export interface User {
  /** Identificador único do usuário */
  id: number;
  /** Nome completo */
  name: string;
  /** Endereço de e-mail utilizado para login */
  email: string;
  /** Papel atribuído ao usuário dentro do sistema */
  role: UserRole;
  /** Flag indicando se o usuário está ativo */
  active: boolean;
}

/**
 * Dados necessários para criar ou atualizar um usuário.
 * Geralmente provenientes de formulários.
 */
export interface UserInput {
  /** Nome completo */
  name: string;
  /** Endereço de e-mail */
  email: string;
  /** Senha em texto plano */
  password: string;
  /** Papel do usuário */
  role: UserRole;
}
