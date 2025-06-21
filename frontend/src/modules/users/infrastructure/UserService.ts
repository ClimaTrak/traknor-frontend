import { User, UserInput } from '../domain/user';

let users: User[] = [
  { id: 1, name: 'Admin', email: 'admin@example.com', role: 'ADMIN', active: true },
  { id: 2, name: 'Técnico', email: 'tech@example.com', role: 'TECH', active: true },
  { id: 3, name: 'Cliente', email: 'client@example.com', role: 'CLIENT', active: true },
];

const delay = () => new Promise((r) => setTimeout(r, 100));

const UserService = {
  async list(): Promise<User[]> {
    await delay();
    return users;
  },
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
  async update(id: number, data: Partial<UserInput>): Promise<User> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('Not found');
    if (data.email && users.some((u) => u.email === data.email && u.id !== id)) {
      const err = new Error('E-mail já em uso');
      // @ts-ignore
      err.status = 422;
      throw err;
    }
    users[idx] = { ...users[idx], ...data } as User;
    return users[idx];
  },
  async toggleActive(id: number): Promise<void> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx].active = !users[idx].active;
    }
  },
};

export default UserService;
