import { z } from "zod";

export const cartaoSchema = z
  .object({
    apelido: z.
        string().
        min(1, "O apelido é obrigatório"),
    titular: z.
        string().
        min(1, "O titular é obrigatório"),
    numero: z.string()
        .transform(value => value.replace(/\D/g, "")) 
        .refine(value => value.length >= 12, "O número precisa ter no mínimo 12 dígitos"),
    bandeira: z
        .string()
        .min(1, "A bandeira é obrigatória"),
    tipo: z.string()
  })

export type CartaoSchemaType = z.infer<typeof cartaoSchema>;

export const editCartaoSchema = cartaoSchema.omit({ numero: true });

export type EditCartaoSchemaType = z.infer<typeof editCartaoSchema>;