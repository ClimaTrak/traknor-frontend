export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'ADMIN' | 'TECH' | 'CLIENT';
  };
}

const AuthService = {
  async login({ email, password }: LoginPayload): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (password === 'password') {
      return {
        token: 'mock-token',
        user: { id: 1, email, name: 'Usuário', role: 'ADMIN' },
      };
    }
    throw new Error('Credenciais inválidas');
  },
};

export default AuthService;
