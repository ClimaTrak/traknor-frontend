import { useState } from 'react';
import { Button, Group, Modal, Stack, Table, Text, Title } from '@mantine/core';
import { useUsers } from '../application/useUsers';
import UsuarioForm from './UsuarioForm';
import { UserFormData } from '../schemas/userSchema';

const UsuariosPage = () => {
  const { data, isLoading, create, update, toggleActive } = useUsers();
  const [opened, setOpened] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const editingItem = data?.find((u) => u.id === editingId);

  const handleSubmit = (form: UserFormData) => {
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
        <Title order={1}>Usuários</Title>
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
              <Table.Th>E-mail</Table.Th>
              <Table.Th>Papel</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((u) => (
              <Table.Tr key={u.id}>
                <Table.Td>{u.name}</Table.Td>
                <Table.Td>{u.email}</Table.Td>
                <Table.Td>{u.role}</Table.Td>
                <Table.Td>{u.active ? 'Ativo' : 'Inativo'}</Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-end">
                    <Button
                      size="xs"
                      onClick={() => {
                        setEditingId(u.id);
                        setOpened(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="xs"
                      color={u.active ? 'red' : 'green'}
                      onClick={() => toggleActive.mutate(u.id)}
                    >
                      {u.active ? 'Desativar' : 'Ativar'}
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Usuário">
        <UsuarioForm
          initialValues={editingItem ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setOpened(false)}
        />
      </Modal>
    </Stack>
  );
};

export default UsuariosPage;
