import { z } from "zod";

export const recuperarSenhaSchema = z.object({
  email: z
    .email("Email inválido"),
});

export type RecuperarSenhaSchemaType = z.infer<typeof recuperarSenhaSchema>;


export const resetPasswordSchema = z.object({
    new_password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    re_new_password: z.string()
}).refine((data) => data.new_password === data.re_new_password, {
    message: "As senhas não coincidem",
    path: ["re_new_password"],
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;