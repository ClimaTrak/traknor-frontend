import { User, UserInput } from '../domain/user';
import { HttpError } from '@/infrastructure/errors';

/**
 * Serviço responsável por manipular usuários na camada de infraestrutura.
 *
 * Neste exemplo os dados são mantidos somente em memória, simulando a
 * comunicação com uma API ou banco de dados real. Cada método possui um pequeno
 * atraso artificial para imitar chamadas assíncronas.
 */

// Base de usuários mantida apenas em memória para fins de demonstração
let users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
    active: true,
  },
  {
    id: 2,
    name: 'Manager',
    email: 'manager@example.com',
    role: 'manager',
    active: true,
  },
  {
    id: 3,
    name: 'Technician',
    email: 'tech@example.com',
    role: 'technician',
    active: true,
  },
];

// Simula latência de rede de 100ms
const delay = () => new Promise((r) => setTimeout(r, 100));

/**
 * Conjunto de operações disponíveis para lidar com usuários.
 */
const UserService = {
  /**
   * Retorna a lista completa de usuários.
   */
  async list(): Promise<User[]> {
    await delay();
    return users;
  },
  /**
   * Cria um novo usuário na base local.
   * Lança erro caso o e-mail informado já esteja em uso.
   */
  async create(data: UserInput): Promise<User> {
    await delay();
    const exists = users.some((u) => u.email === data.email);
    if (exists) {
      throw new HttpError('E-mail já em uso', 422);
    }
    const newUser: User = { id: Date.now(), active: true, ...data };
    users.push(newUser);
    return newUser;
  },
  /**
   * Atualiza dados de um usuário existente.
   * Também valida se o e-mail informado está disponível.
   */
  async update(id: number, data: Partial<UserInput>): Promise<User> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('Not found');
    if (
      data.email &&
      users.some((u) => u.email === data.email && u.id !== id)
    ) {
      throw new HttpError('E-mail já em uso', 422);
    }
    users[idx] = { ...users[idx], ...data } as User;
    return users[idx];
  },
  /**
   * Alterna o status ativo/inativo de um usuário.
   */
  async toggleActive(id: number): Promise<void> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx].active = !users[idx].active;
    }
  },
};

export default UserService;
