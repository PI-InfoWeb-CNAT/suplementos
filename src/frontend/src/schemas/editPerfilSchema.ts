import { z } from "zod";

export const editPerfilSchema = z
  .object({
    nome: z.string().min(1, "O nome é obrigatório"),
    email: z.email("Email inválido"),
    cpf: z
        .string()
        .min(1, "O CPF é obrigatório"),
    telefone_celular: z
        .string()
        .min(8, "O telefone deve ter no mínimo 8 caracteres")
        .max(15, "O telefone deve ter no máximo 15 caracteres"),
  });

export type EditPerfilSchemaType = z.infer<typeof editPerfilSchema>;