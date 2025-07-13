"use server";

import MoviesAPI from "@/lib/MoviesAPI";
import TmdbApi from "@/lib/TmdbAPI";
import WebTorrent from "webtorrent";

export const getTrending = async () => {
  const [config, trendingShows] = await Promise.all([
    TmdbApi.getConfigiration(),
    TmdbApi.getTrendingMovieAndTvShows(),
  ]);

  const { secure_base_url, backdrop_sizes, poster_sizes } = config.images;

  const backDropSize = backdrop_sizes[backdrop_sizes.length - 2];
  const posterSize = poster_sizes[poster_sizes.length - 4];

  const respose = await Promise.all(
    trendingShows.results.map(async (result) => {
      const movieDescription = (
        await MoviesAPI.getShowDescription(
          result.media_type,
          result.media_type === "movie"
            ? result.title ?? result.original_title!
            : result.name ?? result.original_name!,
          new Date(result.release_date ?? result.first_air_date!).getFullYear()
        )
      )?.find((description) => description.tmdbid === String(result.id));

      return {
        ...result,
        backdrop_path: secure_base_url + backDropSize + result.backdrop_path,
        poster_path: secure_base_url + posterSize + result.poster_path,
        quality: !movieDescription ? "CS" : movieDescription.quality,
      };
    })
  );

  respose.sort((a, b) => b.popularity - a.popularity);

  return respose;
};

export const getPopular = async () => {
  const file = await new Promise((resolve, reject) => {
    const client = new WebTorrent();

    const torrentId =
      "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent";

    client.add(torrentId, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file
      const file = torrent.files.find(function (file) {
        return file.name.endsWith(".mp4");
      });

      // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
      resolve(file);
    });
  });
  console.log("file", file);
  return file;
};
