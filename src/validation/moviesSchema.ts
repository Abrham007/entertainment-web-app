import { z } from "zod";

const MovieItemSchema = z.object({
  id: z.number(),
  orig_title: z.string(),
  imdb_id: z.string(),
  tmdbid: z.string(),
  year: z.number(),
  quality: z.string(),
  type: z.string(),
  featured: z.boolean(),
  slider: z.boolean(),
  update: z.boolean(),
  credits: z.string(),
  last_update: z.string(),
});

export const MovieApiResponseSchema = z.object({
  result: z.boolean(),
  data: z.array(MovieItemSchema),
  current_page: z.number(),
  from: z.number(),
  to: z.union([z.number(), z.string()]),
  per_page: z.number(),
  last_page: z.number(),
  first_page_url: z.string().url(),
  next_page_url: z.string().url().nullable(),
  prev_page_url: z.string().url().nullable(),
  path: z.string(),
  total: z.union([z.number(), z.string()]),
  total_count: z.union([z.number(), z.string()]),
});

export type MovieApiResponse = z.infer<typeof MovieApiResponseSchema>;
