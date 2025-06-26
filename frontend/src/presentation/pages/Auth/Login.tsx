import { useState } from 'react';
import { Button, PasswordInput, Stack, TextInput, Loader } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getHomeByRole } from '@/utils/getHomeByRole';

const schema = z.object({
  username: z.string().min(1, 'Usuário obrigatório'),
  password: z.string().min(1, 'Senha obrigatória'),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const { login, role } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await login(data);
      navigate(getHomeByRole(role), { replace: true });
    } catch (err: any) {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Usuário"
          {...register('username')}
          error={errors.username?.message}
        />
        <PasswordInput
          label="Senha"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader size="xs" />} Entrar
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </Stack>
    </form>
  );
};

export default Login;
