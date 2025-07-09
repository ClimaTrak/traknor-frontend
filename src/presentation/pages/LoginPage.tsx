import { useState } from 'react';
import {
  Anchor,
  Button,
  Flex,
  Image,
  Notification,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuthStore } from '../../application/stores/useAuthStore';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
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
      const { token, user } = await AuthService.login(data);
      login(token, user);
      navigate('/app/overview', { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex mih="100vh">
      <Flex flex={1} justify="center" align="center">
        <Paper w={{ base: '90%', sm: 300 }} p="xl" shadow="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="E-mail"
                {...register('email')}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Senha"
                {...register('password')}
                error={errors.password?.message}
              />
              <Button type="submit" loading={loading} fullWidth>
                Entrar
              </Button>
              <Anchor href="#" size="sm">
                Esqueci minha senha
              </Anchor>
              {error && (
                <Notification
                  color="red"
                  title="Erro"
                  onClose={() => setError(null)}
                >
                  {error}
                </Notification>
              )}
            </Stack>
          </form>
        </Paper>
      </Flex>
      <Flex
        flex={1}
        className="hidden md:flex"
        align="center"
        justify="center"
        bg="gray.0"
      >
        <Image src="/login-image.png" alt="Login" />
      </Flex>
    </Flex>
  );
};

export default LoginPage;
