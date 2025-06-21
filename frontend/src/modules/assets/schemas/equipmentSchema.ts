import { z } from 'zod';

export const equipmentSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  model: z.string().nonempty('Modelo é obrigatório'),
  tag: z.string().nonempty('TAG é obrigatória'),
  location: z.string().nonempty('Localização é obrigatória'),
  btus: z
    .number({ invalid_type_error: 'BTUs deve ser um número' })
    .positive('BTUs deve ser positivo'),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
