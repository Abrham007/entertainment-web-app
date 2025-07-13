import {
  ConfigirationShema,
  ShowSchema,
  ShowsSchema,
  VideosInfo,
} from "@/validation/tmbdSchema";

export default class TmdbApi {
  static getConfigiration = async () => {
    try {
      const respose = await fetch(
        "https://api.themoviedb.org/3/configuration",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      if (!respose.ok) {
        throw new Error(
          "Coudn't get the configiration please check connection and try again"
        );
      }

      const json = (await respose.json()) as ConfigirationShema;
      return json;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };

  static getVideoInfomation = async (
    id: number,
    type: ShowSchema["media_type"]
  ) => {
    const url =
      type === "movie"
        ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
        : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
    try {
      const respose = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      });

      if (!respose.ok) {
        throw new Error(
          "Coudn't get the video information please check connection and try again"
        );
      }

      const json = (await respose.json()) as VideosInfo;
      return json;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };

  static getTrendingMovieAndTvShows = async () => {
    try {
      const respose = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      if (!respose.ok) {
        throw new Error(
          "Coudn't get the treanding movie and tv shows please check connection and try again"
        );
      }

      const json = (await respose.json()) as ShowsSchema;
      json.results = json.results.filter(
        (item) => item.media_type !== "person"
      );

      return json;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };

  static getPopularMovies = async (page = 1) => {
    try {
      const respose = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      if (!respose.ok) {
        throw new Error(
          "Coudn't get the popular movies please check connection and try again"
        );
      }

      const json = (await respose.json()) as ShowsSchema;
      return json;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };

  static getPopularTvShows = async (page = 1) => {
    try {
      const respose = await fetch(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      if (!respose.ok) {
        throw new Error(
          "Coudn't get the popular tv shows please check connection and try again"
        );
      }

      const json = (await respose.json()) as ShowsSchema;
      return json;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };
}
