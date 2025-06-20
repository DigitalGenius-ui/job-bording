import { z } from "zod";

export const getJobsSchemas = z.object({
  country: z.string().optional(),
  category: z.string().optional(),
  keyword: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});
