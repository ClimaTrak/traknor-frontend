import { useState, memo, useMemo, useCallback } from 'react';
import { Grid, Loader, Center, Stack, TextInput, Select } from '@mantine/core';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import { useWorkOrders } from '@/modules/workorders/application/useWorkOrders';
import type { WorkOrder } from '@/modules/workorders/domain/workorder';
import WorkOrderDetail from './WorkOrderDetail';

const priorities = [
  { value: 'LOW', label: 'Baixa' },
  { value: 'MEDIUM', label: 'Média' },
  { value: 'HIGH', label: 'Alta' },
];

const statuses = [
  { value: 'OPEN', label: 'Aberta' },
  { value: 'IN_PROGRESS', label: 'Em Andamento' },
  { value: 'DONE', label: 'Concluída' },
  { value: 'CANCELLED', label: 'Cancelada' },
];

const WorkOrderInbox = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const { data, isLoading, refetch } = useWorkOrders({
    page,
    search,
    status,
    priority,
  });

  const records = data ?? [];

  const columns = useMemo(
    () => [
      { accessor: 'id', title: 'Nº OS' },
      { accessor: 'titulo', title: 'Título' },
      { accessor: 'prioridade', title: 'Prioridade' },
      { accessor: 'equipamento', title: 'Equipamento' },
      { accessor: 'status', title: 'Status' },
      { accessor: 'dataAbertura', title: 'Abertura' },
    ],
    [],
  );

  const handleRowClick = useCallback((record: WorkOrder) => {
    setSelected(record.id);
  }, []);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack>
          <TextInput
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Select
            placeholder="Status"
            data={statuses}
            value={status}
            onChange={setStatus}
            allowDeselect
          />
          <Select
            placeholder="Prioridade"
            data={priorities}
            value={priority}
            onChange={setPriority}
            allowDeselect
          />
          {isLoading && <Loader />}
          {!isLoading && (
            <MantineDataTable
              records={records}
              columns={columns}
              totalRecords={records.length}
              recordsPerPage={10}
              page={page}
              onPageChange={setPage}
              rowStyle={() => ({ cursor: 'pointer' })}
              onRowClick={handleRowClick}
            />
          )}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        {selected ? (
          <WorkOrderDetail id={selected} />
        ) : (
          <Center h="100%">Selecione uma OS</Center>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default memo(WorkOrderInbox);
