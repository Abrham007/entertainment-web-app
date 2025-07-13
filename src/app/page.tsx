"use client";
import Nav from "@/components/Nav";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "./actions";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import ShowList from "@/components/ShowList";
import { getMovies } from "./movies/actions";
import { getTvShows } from "./tvshows/actions";
import _ from "lodash";

export default function Home() {
  const { bookmarkes, populateBookmarks } = useBookmarkStore();
  const { data: trendingData, isLoading: trendingIsLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks(bookmarkes);
      return _.shuffle(await getTrending());
    },
    queryKey: ["trending"],
  });

  const { data: recommendedData, isLoading: recommendedIsLoading } = useQuery({
    queryFn: async () => {
      const [movies, tv] = await Promise.all([getMovies(), getTvShows()]);

      return _.shuffle(_.concat(movies, tv));
    },
    queryKey: ["recommended"],
  });

  return (
    <main className="bg-blue-950 max-w-screen min-h-screen overflow-hidden w-full flex flex-col gap-6 sm:gap-8 sm:p-6 lg:p-8 lg:flex-row">
      <Nav />

      <div className="flex flex-col gap-6 sm:gap-8 ml-4 sm:ml-0">
        <div className="h-5 text-white sm:p-6 lg:p-8 ">Search</div>
        <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
          <section className="flex flex-col gap-4 sm:gap-6">
            <h2 className="text-4xl sm:text-5xl text-white">Trending</h2>
            <ShowList
              shows={trendingData}
              isLoading={trendingIsLoading}
              isTrending
            />
          </section>
          <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <h2 className="text-4xl sm:text-5xl text-white">
              Recommended for you
            </h2>
            <ShowList
              shows={recommendedData}
              isLoading={recommendedIsLoading}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
