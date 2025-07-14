"use client";

import ShowList from "@/components/ShowList";
import SearchInput from "@/components/ui/SearchInput";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { useQuery } from "@tanstack/react-query";

export default function Bookmarks() {
  const { bookmarkes, populateBookmarks } = useBookmarkStore();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks(bookmarkes);

      return bookmarkes;
    },
    queryKey: ["bookmarks", bookmarkes],
  });

  return (
    <SearchInput>
      <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
        <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <h2 className="text-4xl sm:text-6xl text-white">Bookmarks</h2>
          <ShowList shows={data} isLoading={isLoading} />
        </section>
      </div>
    </SearchInput>
  );
}
