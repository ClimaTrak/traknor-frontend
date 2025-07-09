import { Modal, FileInput, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { usePostApiEquipmentImport } from '@/api/generated/hooks/equipment';

interface Props {
  opened: boolean;
  onClose: () => void;
}

const ImportCsvModal = ({ opened, onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const importMutation = usePostApiEquipmentImport();

  const handleImport = () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    importMutation.mutate(form, { onSuccess: onClose });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Importar CSV">
      <FileInput
        label="Arquivo CSV"
        accept=".csv"
        value={file}
        onChange={setFile}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onClose} type="button">
          Cancelar
        </Button>
        <Button onClick={handleImport} loading={importMutation.isPending}>
          Importar
        </Button>
      </Group>
    </Modal>
  );
};

export default ImportCsvModal;
