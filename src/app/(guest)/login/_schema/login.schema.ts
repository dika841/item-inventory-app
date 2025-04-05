import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z.string({ message: "Password is required" }),
});

export type TLoginForm = z.infer<typeof LoginSchema>;
