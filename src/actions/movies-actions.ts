"use server";

import TmdbApi from "@/lib/TmdbAPI";

export const getMovies = async (page?: number) => {
  const popularShows = await TmdbApi.getPopularMovies(page);
  return popularShows.sort((a, b) => b.popularity - a.popularity);
};
