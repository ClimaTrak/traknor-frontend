import { useState } from 'react';
import {
  Container,
  SimpleGrid,
  Paper,
  Stack,
  TextInput,
  PasswordInput,
  Anchor,
  Alert,
} from '@mantine/core';
import { IconMail, IconLock } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import GradientButton from '@/components/GradientButton';
import HeroImage from '@/components/HeroImage';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export interface LoginPageProps {
  initialError?: string;
}

type FormValues = z.infer<typeof schema>;

const LoginPage = ({ initialError }: LoginPageProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(initialError ?? null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setFormError(null);
    try {
      await login({ username: data.email, password: data.password });
      navigate('/dashboard');
    } catch {
      setFormError('Credenciais inválidas');
    }
  };

  return (
    <Container size="lg" className="flex min-h-screen items-center">
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={0} className="flex-1">
        <div className="flex flex-col justify-center items-center p-6 md:p-12">
          <Paper w="100%" maw={400} p="xl" shadow="md">
            <Stack>
              <h1 className="text-3xl font-bold text-center mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00fff4] to-[#00968f]">
                  CLIMA
                </span>
                <span className="text-[#00968f]">TRAK</span>
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                  label="Email"
                  placeholder="Seu email"
                  leftSection={<IconMail size={20} />}
                  {...register('email')}
                  error={errors.email?.message}
                />
                <PasswordInput
                  label="Senha"
                  placeholder="Sua senha"
                  leftSection={<IconLock size={20} />}
                  {...register('password')}
                  error={errors.password?.message}
                />
                {formError && (
                  <Alert color="red" title="Erro">
                    {formError}
                  </Alert>
                )}
                <GradientButton type="submit" fullWidth>
                  Acessar
                </GradientButton>
              </form>
              <Anchor href="/forgot-password" className="text-sm">
                Problemas de acesso?
              </Anchor>
              <Anchor
                href="https://help.example.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm self-end"
              >
                Central de Ajuda
              </Anchor>
            </Stack>
          </Paper>
        </div>
        <div className="hidden lg:block">
          <HeroImage image="/login-image.png" />
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default LoginPage;
