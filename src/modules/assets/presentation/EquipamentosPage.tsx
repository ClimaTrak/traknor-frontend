import { useState } from 'react';
import { Button, Group, Modal, Stack, Table, Text, Title } from '@mantine/core';
import { useEquipments } from '@/modules/assets/application/useEquipments';
import EquipamentoForm from './EquipamentoForm';
import { EquipmentFormData } from '@/modules/assets/schemas/equipmentSchema';

/** Tela de listagem e manutenção de equipamentos. */

/**
 * Página de administração de equipamentos cadastrados.
 */
const EquipamentosPage = () => {
  const { data, isLoading, create, update, remove } = useEquipments();
  const [opened, setOpened] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const editingItem = data?.find((e) => e.id === editingId);

  /**
   * Decide se cria ou atualiza um equipamento no envio do formulário.
   */
  const handleSubmit = (form: EquipmentFormData) => {
    if (editingId) {
      update.mutate(
        { id: editingId, data: form },
        { onSuccess: () => setOpened(false) },
      );
    } else {
      create.mutate(form, { onSuccess: () => setOpened(false) });
    }
  };

  return (
    <Stack p="lg">
      <Group justify="space-between" mb="md">
        <Title order={1}>Equipamentos</Title>
        <Button
          onClick={() => {
            setEditingId(null);
            setOpened(true);
          }}
        >
          Novo
        </Button>
      </Group>
      {isLoading && <Text>Carregando...</Text>}
      {data && (
        <Table striped withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Modelo</Table.Th>
              <Table.Th>TAG</Table.Th>
              <Table.Th>Localização</Table.Th>
              <Table.Th>BTUs</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((eq) => (
              <Table.Tr key={eq.id}>
                <Table.Td>{eq.name}</Table.Td>
                <Table.Td>{eq.model}</Table.Td>
                <Table.Td>{eq.tag}</Table.Td>
                <Table.Td>{eq.location}</Table.Td>
                <Table.Td>{eq.btus}</Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-end">
                    <Button
                      size="xs"
                      onClick={() => {
                        setEditingId(eq.id);
                        setOpened(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => remove.mutate(eq.id)}
                    >
                      Remover
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Equipamento"
      >
        <EquipamentoForm
          initialValues={editingItem ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setOpened(false)}
        />
      </Modal>
    </Stack>
  );
};

export default EquipamentosPage;
