import { z } from "zod";

export const redefinirSenhaSchema = z
  .object({
    senha_atual: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    nova_senha: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmacao_nova_senha: z.string(),
  })
  .refine((data) => data.nova_senha === data.confirmacao_nova_senha, {
    path: ["confirmacao_nova_senha"],
    message: "As senhas não coincidem",
  });

export type RedefinirSenhaSchemaType = z.infer<typeof redefinirSenhaSchema>;