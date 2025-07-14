"use client";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/actions/home-actions";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import ShowList from "@/components/ShowList";
import { getMovies } from "@/actions/movies-actions";
import { getTvShows } from "@/actions/tvshows-actions";
import _ from "lodash";
import SearchInput from "@/components/ui/SearchInput";

export default function Home() {
  const { bookmarks, populateBookmarks } = useBookmarkStore();

  const { data: trendingData, isLoading: trendingIsLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks(bookmarks);
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
    <SearchInput type="movie&tv">
      <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
        <section className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-4xl sm:text-6xl text-white">Trending</h2>
          <ShowList
            shows={trendingData}
            isLoading={trendingIsLoading}
            isTrending
          />
        </section>
        <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <h2 className="text-4xl sm:text-6xl text-white">
            Recommended for you
          </h2>
          <ShowList shows={recommendedData} isLoading={recommendedIsLoading} />
        </section>
      </div>
    </SearchInput>
  );
}
