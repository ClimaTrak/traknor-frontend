import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { EquipmentFormData, equipmentSchema } from '../schemas/equipmentSchema';

interface Props {
  initialValues?: EquipmentFormData;
  onSubmit: (data: EquipmentFormData) => void;
  onCancel: () => void;
}

const EquipamentoForm = ({ initialValues, onSubmit, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
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
        label="Modelo"
        {...register('model')}
        error={errors.model?.message}
      />
      <TextInput label="TAG" {...register('tag')} error={errors.tag?.message} />
      <TextInput
        label="Localização"
        {...register('location')}
        error={errors.location?.message}
      />
      <NumberInput
        label="BTUs"
        {...register('btus', { valueAsNumber: true })}
        error={errors.btus?.message}
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

export default EquipamentoForm;
