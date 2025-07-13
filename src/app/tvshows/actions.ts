"use server";

// import MoviesAPI from "@/lib/MoviesAPI";
import TmdbApi from "@/lib/TmdbAPI";
import { ShowSchema } from "@/validation/tmbdSchema";

export const getTvShows = async (page?: number) => {
  const [config, trendingShows] = await Promise.all([
    TmdbApi.getConfigiration(),
    TmdbApi.getPopularTvShows(page),
  ]);

  const { secure_base_url, backdrop_sizes, poster_sizes } = config.images;

  const backDropSize = backdrop_sizes[backdrop_sizes.length - 2];
  const posterSize = poster_sizes[poster_sizes.length - 4];

  const respose = await Promise.all(
    trendingShows.results.map(async (result) => {
      // const movieDescription = (
      //   await MoviesAPI.getShowDescription(
      //     "tv",
      //     result.name ?? result.original_name!,
      //     new Date(result.release_date ?? result.first_air_date!).getFullYear()
      //   )
      // )?.find((description) => description.tmdbid === String(result.id));

      return {
        ...result,
        backdrop_path: secure_base_url + backDropSize + result.backdrop_path,
        poster_path: secure_base_url + posterSize + result.poster_path,
        quality: "CS",
        media_type: "tv" as ShowSchema["media_type"],
      };
    })
  );

  respose.sort((a, b) => b.popularity - a.popularity);

  return respose;
};
