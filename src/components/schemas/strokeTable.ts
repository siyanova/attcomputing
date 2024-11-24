import { z } from "zod";

export const StrokeTableFromSchema = z.object({
  name: z.string().min(1, "Поле не должно быть пустым"),
  engineer: z
    .string(),
  cabinet: z.string().min(1, "Поле не должно быть пустым"),
  status:z.string().min(1,"Поле не должно быть пустым"),
  teacher:z.string(),
  startDate:z.string().date("Формат даты dd.mm.yyyy"),
  endDate:z.string().date("Формат даты dd.mm.yyyy"),

});