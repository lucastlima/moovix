import * as z from "zod";

export const ImagesSchema = z.object({
  base_url: z.string(),
  secure_base_url: z.string(),
  backdrop_sizes: z.array(z.string()),
  logo_sizes: z.array(z.string()),
  poster_sizes: z.array(z.string()),
  profile_sizes: z.array(z.string()),
  still_sizes: z.array(z.string()),
});

export type Images = z.infer<typeof ImagesSchema>;

export const ApiConfigSchema = z.object({
  images: ImagesSchema,
  change_keys: z.array(z.string()),
});

export type ApiConfig = z.infer<typeof ApiConfigSchema>;
