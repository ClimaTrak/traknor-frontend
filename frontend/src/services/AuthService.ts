// Serviço que simula a autenticação do usuário.
// Aqui fazemos uma chamada fictícia e retornamos um token e as informações do usuário.
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
    role: 'admin' | 'manager' | 'technician';
  };
}

const AuthService = {
  async login({ email, password }: LoginPayload): Promise<LoginResponse> {
    // Simula atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (password === 'password') {
      // Caso a senha seja 'password', retornamos dados de login fictícios
      return {
        token: 'mock-token',
        user: { id: 1, email, name: 'Usuário', role: 'admin' },
      };
    }
    // Qualquer outra senha gera erro
    throw new Error('Credenciais inválidas');
  },
};

export default AuthService;
