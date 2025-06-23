import { useState } from 'react';
import { Stack, Button, Select } from '@mantine/core';
import { IconDownload } from '@mantine/icons-react';
import type { ReportType, ReportFormat } from '@/modules/reports/domain/report';
import useDownloadReport from '@/modules/reports/application/useDownloadReport';

const typeOptions = [
  { value: 'equipment', label: 'Equipamentos' },
  { value: 'workorder', label: 'Ordens de Serviço' },
];

const formatOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'xlsx', label: 'Excel' },
];

const ReportDownloader = () => {
  const [type, setType] = useState<ReportType | ''>('');
  const [format, setFormat] = useState<ReportFormat | ''>('');
  const { download, isFetching } = useDownloadReport();

  const handleDownload = () => {
    if (type && format) {
      download(type, format);
    }
  };

  return (
    <Stack maw={320}>
      <Select
        label="Tipo"
        placeholder="Selecione"
        data={typeOptions}
        value={type}
        onChange={(val) => setType(val as ReportType)}
        disabled={isFetching}
        allowDeselect
      />
      <Select
        label="Formato"
        placeholder="Selecione"
        data={formatOptions}
        value={format}
        onChange={(val) => setFormat(val as ReportFormat)}
        disabled={isFetching}
        allowDeselect
      />
      <Button
        leftSection={<IconDownload size={16} />}
        disabled={!type || !format}
        loading={isFetching}
        onClick={handleDownload}
      >
        Download
      </Button>
    </Stack>
  );
};

export default ReportDownloader;
