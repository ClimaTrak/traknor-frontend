import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { UserFormData, userSchema, roleEnum } from '../schemas/userSchema';

interface Props {
  initialValues?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const UsuarioForm = ({ initialValues, onSubmit, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <TextInput
        label="Nome"
        {...register('name')}
        error={errors.name?.message}
      />
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
      <Select
        label="Papel"
        data={roleEnum.options}
        {...register('role')}
        error={errors.role?.message}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </Group>
    </form>
  );
};

export default UsuarioForm;
