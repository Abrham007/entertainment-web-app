import { NextRequest, NextResponse } from "next/server";
import TmdbApi from "@/lib/TmdbAPI";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined;
  const popularTvShows = await TmdbApi.getPopularTvShows(page);
  popularTvShows.sort((a, b) => b.popularity - a.popularity);
  return NextResponse.json(popularTvShows);
}
