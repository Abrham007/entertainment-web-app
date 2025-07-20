import { NextRequest, NextResponse } from "next/server";
import TmdbApi from "@/lib/TmdbAPI";
import { ShowSchema } from "@/validation/tmbdSchema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const type = searchParams.get("type") as ShowSchema["media_type"];
  if (!id || !type) {
    return NextResponse.json({ error: "Missing id or type" }, { status: 400 });
  }
  const data = await TmdbApi.getVideoInfomation(id, type);
  return NextResponse.json(data);
}
