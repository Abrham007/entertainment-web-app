import { NextResponse } from "next/server";
import TmdbApi from "@/lib/TmdbAPI";

export async function GET() {
  const trendingShows = await TmdbApi.getTrendingMovieAndTvShows();
  trendingShows.sort((a, b) => b.popularity - a.popularity);
  return NextResponse.json(trendingShows);
}
