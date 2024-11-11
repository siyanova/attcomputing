import { z } from "zod";

export const engineerFromSchema = z.object({
  name: z.string().min(1, "Поле не должно быть пустым"),
  email: z
    .string()
    .email("Некорректный email")
    .min(1, "Поле не должно быть пустым"),
  telegramId: z.string().length(9, "TelegramID должен содержать ровно 9 символов"),
});
