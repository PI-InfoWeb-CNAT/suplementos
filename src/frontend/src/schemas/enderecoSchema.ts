import { z } from "zod";

export const enderecoSchema = z
  .object({
    apelido: z.
        string().
        min(1, "O apelido é obrigatório"),
    destinatario: z.
        string().
        min(1, "O destinatário é obrigatório"),
    cep: z.string()
        .transform(value => value.replace(/\D/g, "")) 
        .refine(value => value.length === 8, "O CEP precisa ter 8 dígitos"),
    uf: z
        .string()
        .length(2, "A UF precisa ter 2 digítos"),
    cidade: z
        .string()
        .min(1, "A cidade é obrigatória"),
    bairro: z
        .string()
        .min(1, "O bairro é obrigatório"),
    rua: z
        .string()
        .min(1, "A rua é obrigatória"),
    numero: z
        .string()
        .min(1, "O número é obrigatório"),
    complemento: z.
        string().
        optional(),
  })

export type EnderecoSchemaType = z.infer<typeof enderecoSchema>;