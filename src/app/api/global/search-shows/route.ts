import { NextRequest, NextResponse } from "next/server";
import TmdbApi from "@/lib/TmdbAPI";
import { ShowSchema } from "@/validation/tmbdSchema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as
    | ShowSchema["media_type"]
    | "movie&tv";
  const searchText = searchParams.get("searchText") || "";
  if (!type || !searchText) {
    return NextResponse.json(
      { error: "Missing type or searchText" },
      { status: 400 }
    );
  }
  const data = await TmdbApi.getSearchShows(type, searchText);
  return NextResponse.json(data);
}
