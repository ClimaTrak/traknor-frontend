import { z } from 'zod';

export const roleEnum = z.enum(['ADMIN', 'TECH', 'CLIENT']);

export const userSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha obrigatória'),
  role: roleEnum,
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserRole = z.infer<typeof roleEnum>;
