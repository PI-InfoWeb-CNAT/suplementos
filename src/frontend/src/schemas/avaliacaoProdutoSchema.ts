import { z } from "zod";

export const avaliacaoProdutoSchema = z.object({
  nota: z
    .number("Por favor, avalie o produto.")
    .or(z.nan()) 
    .refine((val) => !Number.isNaN(val), "Por favor, clique nas estrelas para dar uma nota.")
    .refine((val) => val >= 1 && val <= 5, "A nota deve ser entre 1 e 5.")
});

export type AvaliacaoProdutoSchemaType = z.infer<typeof avaliacaoProdutoSchema>;