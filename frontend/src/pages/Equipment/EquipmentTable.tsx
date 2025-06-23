import { useState } from 'react';
import { Button, Group, Loader, Stack } from '@mantine/core';
import { MantineDataTable } from '@mantine/datatable';
import { useGetApiEquipment, useDeleteApiEquipmentById } from '@/api/generated/hooks/equipment';
import { Equipment } from '@/api/generated/schemas';
import EquipmentFormModal from './EquipmentFormModal';

const EquipmentTable = () => {
  const [page, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);
  const { data, isLoading, refetch } = useGetApiEquipment({ page, page_size: 10 });
  const deleteMutation = useDeleteApiEquipmentById();

  const rows = data ?? [];

  const handleSubmit = (values: Equipment) => {
    // placeholder - would call create/update hooks
    console.log(values);
    setOpened(false);
    refetch();
  };

  return (
    <Stack>
      <Group justify="flex-end">
        <Button onClick={() => { setEditing(null); setOpened(true); }}>Novo</Button>
      </Group>
      {isLoading && <Loader />}
      {!isLoading && (
        <MantineDataTable
          records={rows}
          columns={[
            { accessor: 'nome', title: 'Nome' },
            { accessor: 'categoria', title: 'Categoria' },
            { accessor: 'status', title: 'Status' },
            {
              accessor: 'actions',
              title: '',
              render: (record) => (
                <Group gap="xs">
                  <Button size="xs" onClick={() => { setEditing(record); setOpened(true); }}>Editar</Button>
                  <Button size="xs" color="red" onClick={() => deleteMutation.mutate(record.id)}>Excluir</Button>
                </Group>
              ),
            },
          ]}
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

export default EquipmentTable;
