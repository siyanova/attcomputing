import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .email("Некорректный email")
    .min(1, "Поле не должно быть пустым"),
  password: z.string().min(1, "Поле не должно быть пустым"),
});
