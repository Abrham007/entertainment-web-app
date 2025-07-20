"use client";

import ShowList from "@/components/ShowList";
import { useQuery } from "@tanstack/react-query";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import SearchInput from "@/components/ui/SearchInput";

export default function Movies() {
  const { bookmarks, populateBookmarks } = useBookmarkStore();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks(bookmarks);
      const res = await fetch("/api/movies/get");
      if (!res.ok) throw new Error("Failed to fetch movies");
      return await res.json();
    },
    queryKey: ["movies"],
  });
  return (
    <SearchInput>
      <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
        <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <h2 className="text-4xl sm:text-6xl text-white">Movies</h2>
          <ShowList shows={data} isLoading={isLoading} />
        </section>
      </div>
    </SearchInput>
  );
}
