import { useState, useMemo, memo, useCallback } from 'react';
import { Button, Group, Loader, Stack, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { MantineDataTable } from '@mantine/datatable';
import {
  useGetApiEquipment,
  useDeleteApiEquipmentById,
} from '@/api/generated/hooks/equipment';
import { Equipment } from '@/api/generated/schemas';
import EquipmentFormModal from './EquipmentFormModal';
import { isAuthorized } from '@/utils/permissions';

const EquipmentTable = () => {
  const [page, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);
  const { data, isLoading, refetch } = useGetApiEquipment({
    page,
    page_size: 10,
  });
  const deleteMutation = useDeleteApiEquipmentById();

  const rows = data ?? [];

  const handleSubmit = useCallback(
    (values: Equipment) => {
      // placeholder - would call create/update hooks
      console.log(values);
      setOpened(false);
      refetch();
    },
    [refetch],
  );

  const columns = useMemo(
    () => [
      { accessor: 'nome', title: 'Nome' },
      { accessor: 'categoria', title: 'Categoria' },
      { accessor: 'status', title: 'Status' },
      {
        accessor: 'actions',
        title: '',
        render: (record: Equipment) => (
          <Group gap="xs">
            <Button
              size="xs"
              onClick={() => {
                setEditing(record);
                setOpened(true);
              }}
            >
              Editar
            </Button>
            {isAuthorized(['admin']) && (
              <ActionIcon
                color="red"
                aria-label="Excluir"
                onClick={() => deleteMutation.mutate(record.id)}
              >
                <IconTrash />
              </ActionIcon>
            )}
          </Group>
        ),
      },
    ],
    [deleteMutation],
  );

  return (
    <Stack>
      <Group justify="flex-end">
        <Button
          onClick={() => {
            setEditing(null);
            setOpened(true);
          }}
        >
          Novo
        </Button>
      </Group>
      {isLoading && <Loader />}
      {!isLoading && (
        <MantineDataTable
          records={rows}
          columns={columns}
          totalRecords={rows.length}
          recordsPerPage={10}
          page={page}
          onPageChange={setPage}
        />
      )}
      <EquipmentFormModal
        opened={opened}
        onClose={() => setOpened(false)}
        initialValues={editing ?? undefined}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
};

export default memo(EquipmentTable);
