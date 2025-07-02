import { User, UserInput } from '../domain/user';

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

const delay = () => new Promise((r) => setTimeout(r, 100));

const UserService = {
  // Retorna a lista completa de usuários
  async list(): Promise<User[]> {
    await delay();
    return users;
  },
  // Cria um novo usuário na base local
  async create(data: UserInput): Promise<User> {
    await delay();
    const exists = users.some((u) => u.email === data.email);
    if (exists) {
      const err = new Error('E-mail já em uso');
      // @ts-ignore
      err.status = 422;
      throw err;
    }
    const newUser: User = { id: Date.now(), active: true, ...data };
    users.push(newUser);
    return newUser;
  },
  // Atualiza dados de um usuário existente
  async update(id: number, data: Partial<UserInput>): Promise<User> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('Not found');
    if (
      data.email &&
      users.some((u) => u.email === data.email && u.id !== id)
    ) {
      const err = new Error('E-mail já em uso');
      // @ts-ignore
      err.status = 422;
      throw err;
    }
    users[idx] = { ...users[idx], ...data } as User;
    return users[idx];
  },
  // Ativa ou desativa um usuário
  async toggleActive(id: number): Promise<void> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx].active = !users[idx].active;
    }
  },
};

export default UserService;
