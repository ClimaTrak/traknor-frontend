import { useState } from 'react';
import Papa from 'papaparse';

export interface CsvPreview {
  data: Record<string, string>[];
}

export const useCsvImport = () => {
  const [preview, setPreview] = useState<CsvPreview | null>(null);

  const parse = (file: File) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      complete: (results) => {
        setPreview({ data: results.data });
      },
    });
  };

  return { preview, parse };
};
