import {
  ConfigirationShema,
  ShowSchema,
  ShowsSchema,
  VideosInfo,
} from "@/validation/tmbdSchema";

export default class TmdbApi {
  static secure_base_url = "";
  static backdrop_base_url = "";
  static poster_base_url = "";

  private static makeShowsData = async (rawShowsData: ShowsSchema) => {
    try {
      if (
        !this.secure_base_url ||
        !this.backdrop_base_url ||
        !this.poster_base_url
      ) {
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
        const config = (await respose.json()) as ConfigirationShema;
        const { secure_base_url, backdrop_sizes, poster_sizes } = config.images;
        const backDropSize = backdrop_sizes[backdrop_sizes.length - 2];
        const posterSize = poster_sizes[poster_sizes.length - 2];

        this.secure_base_url = secure_base_url;
        this.backdrop_base_url = secure_base_url + backDropSize;
        this.poster_base_url = secure_base_url + posterSize;
      }

      const showsData = rawShowsData.results
        .filter((result) => result.backdrop_path && result.poster_path)
        .map((result) => {
          return {
            ...result,
            backdrop_path: this.backdrop_base_url + result.backdrop_path,
            poster_path: this.poster_base_url + result.poster_path,
            quality: "HD",
          };
        });

      return showsData;
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

      return await this.makeShowsData(json);
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
      json.results = json.results.map((result) => ({
        ...result,
        media_type: "movie",
      }));
      return await this.makeShowsData(json);
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
      json.results = json.results.map((result) => ({
        ...result,
        media_type: "tv",
      }));
      return await this.makeShowsData(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };

  static getSearchShows = async (
    type: ShowSchema["media_type"] | "movie&tv",
    searchText: string
  ) => {
    let url;
    switch (type) {
      case "movie":
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchText
        )}&include_adult=false&language=en-US&page=1`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
          searchText
        )}&include_adult=false&language=en-US&page=1`;
        break;
      default:
        url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          searchText
        )}&include_adult=false&language=en-US&page=1`;
        break;
    }

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
          "Coudn't get the searched shows please check connection and try again"
        );
      }

      const json = (await respose.json()) as ShowsSchema;
      json.results = json.results.map((result) => ({
        ...result,
        ...(type === "movie&tv" ? {} : { media_type: type }),
      }));
      return await this.makeShowsData(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error?.message ?? "Some thing went wrong with fetching the data"
      );
    }
  };
}
