import { z } from "zod";

export const carrinhoSchema = z
  .object({
    quantidade: z
        .number()
        .min(1, "A quantidade mínima é 1")
  })

export type CarrinhoSchemaType = z.infer<typeof carrinhoSchema>;