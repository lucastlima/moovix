import * as z from "zod";

export const TvShow = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type TvShow = z.infer<typeof TvShow>;

export const TvShowsResponseSchema = z.object({
  page: z.number(),
  results: z.array(TvShow),
  total_pages: z.number(),
  total_results: z.number(),
});

export type TvShowsResponse = z.infer<typeof TvShowsResponseSchema>;
