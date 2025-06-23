import { useState } from 'react';
import { api } from '@/infrastructure/api/axios';
import { showNotification } from '@mantine/notifications';
import { saveAs } from 'file-saver';
import type { ReportType, ReportFormat } from '../domain/report';

const useDownloadReport = () => {
  const [isFetching, setIsFetching] = useState(false);

  const download = async (type: ReportType, format: ReportFormat) => {
    const id = `report-${Date.now()}`;
    showNotification({ id, message: 'Gerando relatório…', loading: true });
    try {
      setIsFetching(true);
      const { data } = await api.get<Blob>('/api/reports/', {
        params: { type, format },
        responseType: 'blob',
      });
      saveAs(data, `report-${type}.${format}`);
      showNotification({ id, message: 'Relatório baixado', color: 'green' });
    } catch {
      showNotification({
        id,
        message: 'Falha ao gerar relatório',
        color: 'red',
      });
    } finally {
      setIsFetching(false);
    }
  };

  return { download, isFetching };
};

export default useDownloadReport;
