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
    tipo: z
        .enum(["debito", "credito"], {
            message: "Selecione Débito ou Crédito"
        }),
  })

export type CartaoSchemaType = z.infer<typeof cartaoSchema>;