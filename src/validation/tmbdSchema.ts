import { z } from "zod";

export const configirationShema = z.object({
  change_keys: z.array(
    z.enum([
      "adult",
      "air_date",
      "also_known_as",
      "alternative_titles",
      "biography",
      "birthday",
      "budget",
      "cast",
      "certifications",
      "character_names",
      "created_by",
      "crew",
      "deathday",
      "episode",
      "episode_number",
      "episode_run_time",
      "freebase_id",
      "freebase_mid",
      "general",
      "genres",
      "guest_stars",
      "homepage",
      "images",
      "imdb_id",
      "languages",
      "name",
      "network",
      "origin_country",
      "original_name",
      "original_title",
      "overview",
      "parts",
      "place_of_birth",
      "plot_keywords",
      "production_code",
      "production_companies",
      "production_countries",
      "releases",
      "revenue",
      "runtime",
      "season",
      "season_number",
      "season_regular",
      "spoken_languages",
      "status",
      "tagline",
      "title",
      "translations",
      "tvdb_id",
      "tvrage_id",
      "type",
      "video",
      "videos",
    ])
  ),
  images: z.object({
    base_url: z.string().url(),
    secure_base_url: z.string().url(),
    backdrop_sizes: z.array(z.enum(["w300", "w780", "w1280", "original"])),
    logo_sizes: z.array(
      z.enum(["w45", "w92", "w154", "w185", "w300", "w500", "original"])
    ),
    poster_sizes: z.array(
      z.enum(["w92", "w154", "w185", "w342", "w500", "w780", "original"])
    ),
    profile_sizes: z.array(z.enum(["w45", "w185", "h632", "original"])),
    still_sizes: z.array(z.enum(["w92", "w185", "w300", "original"])),
  }),
});

export type ConfigirationShema = z.infer<typeof configirationShema>;

export const showSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      adult: z.boolean(),
      backdrop_path: z.string(),
      id: z.number(),
      // movies use `title`/`original_title`, TV shows use `name`/`original_name`
      title: z.string().optional(),
      original_title: z.string().optional(),
      name: z.string().optional(),
      original_name: z.string().optional(),
      overview: z.string(),
      poster_path: z.string(),
      media_type: z.enum(["movie", "tv", "person"]),
      original_language: z.string(),
      genre_ids: z.array(z.number()),
      popularity: z.number(),
      // movies use `release_date`, TV shows use `first_air_date`
      release_date: z.string().optional(),
      first_air_date: z.string().optional(),
      video: z.boolean().optional(),
      vote_average: z.number(),
      vote_count: z.number(),
      origin_country: z.array(z.string()).optional(),
      quality: z.string().optional(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

export type ShowsSchema = z.infer<typeof showSchema>;

export type ShowSchema = ShowsSchema["results"][number];

// Schema for a single video item
const VideoInfoSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

// Top‐level schema
export const VideosInfoSchema = z.object({
  id: z.number(),
  results: z.array(VideoInfoSchema),
});

// Inferred TypeScript type
export type VideosInfo = z.infer<typeof VideosInfoSchema>;
