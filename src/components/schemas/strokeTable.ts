import { z } from "zod";

const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const StrokeTableFromSchema = z.object({
  description: z.string().min(1, "Поле не должно быть пустым"),
  engineer: z.string(),
  cabinet: z.string().min(1, "Поле не должно быть пустым"),
  status: z.string().min(1, "Поле не должно быть пустым"),
  teacher: z.string(),
  startDate: z.string().refine((value) => dateRegex.test(value), {
    message: "Формат даты должен быть ГГГГ-ММ-ДД",
  }),
  endDate: z
  .string()
  .optional()
  .refine((value) => value === undefined || value === "" || dateRegex.test(value), {
    message: "Формат даты должен быть ГГГГ-ММ-ДД или пустым",
  }),

});
