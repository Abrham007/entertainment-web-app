"use server";

import TmdbApi from "@/lib/TmdbAPI";

export const getTvShows = async (page?: number) => {
  const popularTvShows = await TmdbApi.getPopularTvShows(page);
  return popularTvShows.sort((a, b) => b.popularity - a.popularity);
};
