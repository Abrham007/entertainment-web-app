import { MovieApiResponse } from "@/validation/moviesSchema";
import { ShowSchema } from "@/validation/tmbdSchema";

export default class MoviesAPI {
  static getShowDescription = async (
    type: Omit<ShowSchema["media_type"], "person">,
    query: string,
    year: number
  ) => {
    const url =
      type === "movie"
        ? `https://moviesapi.to/api/discover/movie?query=${query}&year=${year}`
        : `https://moviesapi.to/api/discover/tv?query=${query}`;
    try {
      const respose = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!respose.ok) {
        throw new Error(
          "Coudn't get the movie description please check connection and try again"
        );
      }

      const json = (await respose.json()) as MovieApiResponse;
      return json.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };
}
