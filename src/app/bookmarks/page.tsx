"use client";

import Nav from "@/components/Nav";
import ShowList from "@/components/ShowList";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { useQuery } from "@tanstack/react-query";

export default function Bookmarks() {
  const { bookmarkes, populateBookmarks } = useBookmarkStore();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks();

      return bookmarkes;
    },
    queryKey: ["bookmarks", bookmarkes],
  });

  return (
    <main className="bg-blue-950 max-w-screen min-h-screen overflow-hidden w-full flex flex-col gap-6 sm:gap-8 sm:p-6 lg:p-8 lg:flex-row">
      <Nav />
      <div className="flex flex-col gap-6 sm:gap-8 ml-4 sm:ml-0">
        <div className="h-5 text-white sm:p-6 lg:p-8 ">Search</div>
        <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
          <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <h2 className="text-4xl sm:text-5xl text-white">Bookmarks</h2>
            <ShowList shows={data} isLoading={isLoading} />
          </section>
        </div>
      </div>
    </main>
  );
}
