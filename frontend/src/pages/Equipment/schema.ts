import { z } from 'zod';

export const equipmentFormSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório'),
  categoria: z.string().nonempty('Categoria é obrigatória'),
  fabricante: z.string().nonempty('Fabricante é obrigatório'),
  numeroSerie: z.string().nonempty('Número de série é obrigatório'),
  status: z.string().nonempty('Status é obrigatório'),
});

export type EquipmentFormData = z.infer<typeof equipmentFormSchema>;
