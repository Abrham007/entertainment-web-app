"use client";
import { useQuery } from "@tanstack/react-query";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import ShowList from "@/components/ShowList";
import _ from "lodash";
import SearchInput from "@/components/ui/SearchInput";

export default function Home() {
  const { bookmarks, populateBookmarks } = useBookmarkStore();

  const { data: trendingData, isLoading: trendingIsLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks(bookmarks);
      const res = await fetch("/api/home/trending");
      if (!res.ok) throw new Error("Failed to fetch trending shows");
      return _.shuffle(await res.json());
    },
    queryKey: ["trending"],
  });

  const { data: recommendedData, isLoading: recommendedIsLoading } = useQuery({
    queryFn: async () => {
      const [moviesRes, tvRes] = await Promise.all([
        fetch("/api/movies/get"),
        fetch("/api/tvshows/get"),
      ]);
      if (!moviesRes.ok || !tvRes.ok)
        throw new Error("Failed to fetch recommended shows");
      const [movies, tv] = await Promise.all([moviesRes.json(), tvRes.json()]);
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
