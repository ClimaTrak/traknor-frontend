import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { EquipmentInput } from '@/api/generated/schemas';
import { equipmentFormSchema } from './schema';

interface Props {
  opened: boolean;
  onClose: () => void;
  initialValues?: EquipmentInput;
  onSubmit: (data: EquipmentInput) => void;
}

const EquipmentFormModal = ({
  opened,
  onClose,
  initialValues,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentInput>({
    resolver: zodResolver(equipmentFormSchema),
    defaultValues: initialValues,
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Equipamento">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nome"
          {...register('nome')}
          error={errors.nome?.message}
        />
        <TextInput
          label="Categoria"
          {...register('categoria')}
          error={errors.categoria?.message}
        />
        <TextInput
          label="Fabricante"
          {...register('fabricante')}
          error={errors.fabricante?.message}
        />
        <TextInput
          label="Número de Série"
          {...register('numeroSerie')}
          error={errors.numeroSerie?.message}
        />
        <TextInput
          label="Status"
          {...register('status')}
          error={errors.status?.message}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EquipmentFormModal;
