import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
        .email("Email inválido"),
    senha: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
  })

export type LoginSchemaType = z.infer<typeof loginSchema>;