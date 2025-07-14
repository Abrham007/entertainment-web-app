"use server";

import TmdbApi from "@/lib/TmdbAPI";

export const getTrending = async () => {
  const trendingShows = await TmdbApi.getTrendingMovieAndTvShows();
  trendingShows.sort((a, b) => b.popularity - a.popularity);
  return trendingShows;
};
