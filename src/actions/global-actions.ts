"use server";

import TmdbApi from "@/lib/TmdbAPI";
import { ShowSchema } from "@/validation/tmbdSchema";

export const getVideoInfo = async (
  id: number,
  type: ShowSchema["media_type"]
) => {
  return TmdbApi.getVideoInfomation(id, type);
};

export const getSearchedShows = async (
  type: ShowSchema["media_type"] | "movie&tv",
  searchText: string
) => {
  return await TmdbApi.getSearchShows(type, searchText);
};
