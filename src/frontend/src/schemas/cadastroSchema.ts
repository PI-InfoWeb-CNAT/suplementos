import { z } from "zod";

export const cadastroSchema = z
  .object({
    nome: z.string().min(1, "O nome é obrigatório"),
    email: z.email("Email inválido"),
    cpf: z
        .string()
        .min(1, "O CPF é obrigatório"),
    telefone: z
        .string()
        .min(8, "O telefone deve ter no mínimo 8 caracteres")
        .max(15, "O telefone deve ter no máximo 15 caracteres"),
    senha: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmacaoSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    path: ["confirmacaoSenha"],
    message: "As senhas não coincidem",
  });

export type CadastroSchemaType = z.infer<typeof cadastroSchema>;