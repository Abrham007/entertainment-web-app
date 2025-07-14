"use client";

import { FC, InputHTMLAttributes, ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchIcon from "./icons/SearchIcon";
import { ShowSchema } from "@/validation/tmbdSchema";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getSearchedShows } from "@/actions/global-actions";
import ShowList from "../ShowList";
import { usePathname } from "next/navigation";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import Fuse from "fuse.js";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const SearchInput: FC<SearchInputProps> = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const { bookmarkes, populateBookmarks } = useBookmarkStore();
  const pathname = usePathname();

  const { placeholder, type } = useMemo(() => {
    switch (pathname) {
      case "/":
        return {
          placeholder: "Search for movies or TV series",
          type: "movie&tv",
        };
      case "/movie":
        return { placeholder: "Search for movies", type: "movie" };
      case "/tvshow":
        return { placeholder: "Search for TV series", type: "tv" };
      case "/bookmarks":
        return {
          placeholder: "Search for bookmarked shows",
          type: "bookmarks",
        };
      default:
        return {
          placeholder: "Search for movies or TV series",
          type: "movie&tv",
        };
    }
  }, [pathname]);

  const { data: searchData, isLoading: searchIsLoading } = useQuery({
    queryFn: async () => {
      if (type === "bookmarks") {
        await populateBookmarks(bookmarkes);
        return bookmarkes;
      }

      return getSearchedShows(
        type as ShowSchema["media_type"] | "movie&tv",
        searchText
      );
    },
    queryKey: ["search", type, searchText],
    enabled: !!searchText,
  });

  const movieFuse = useMemo(
    () =>
      new Fuse(
        bookmarkes.filter((show) => show.media_type === "movie"),
        {
          keys: ["title", "original_title"],
          threshold: 0.3, // 0.0 = exact match, 1.0 = very fuzzy
          includeScore: true, // include match score in results
        }
      ),
    [bookmarkes]
  );

  const tvFuse = useMemo(
    () =>
      new Fuse(
        bookmarkes.filter((show) => show.media_type === "tv"),
        {
          keys: ["name", "original_name"],
          threshold: 0.3, // 0.0 = exact match, 1.0 = very fuzzy
          includeScore: true, // include match score in results
        }
      ),
    [bookmarkes]
  );

  const searchContent =
    type === "bookmarks" ? (
      <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
        <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <h2 className="text-4xl sm:text-6xl text-white">Bookmarked Movies</h2>
          <ShowList
            shows={movieFuse.search(searchText).map((r) => r.item)}
            isLoading={searchIsLoading}
          />
        </section>
        <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <h2 className="text-4xl sm:text-6xl text-white">
            Bookmarked TV Series
          </h2>
          <ShowList
            shows={tvFuse.search(searchText).map((r) => r.item)}
            isLoading={searchIsLoading}
          />
        </section>
      </div>
    ) : (
      <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        <h2 className="text-4xl sm:text-6xl text-white">
          Found {searchData?.length} results for &quot;{searchText}&quot;
        </h2>
        <ShowList shows={searchData} isLoading={searchIsLoading} />
      </section>
    );

  return (
    <>
      <motion.fieldset
        className=" flex gap-4 justify-between items-center cursor-pointer mr-4 sm:mr-0 lg:mr-50"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <SearchIcon className="w-6 h-6 sm:w-8 sm:h-8 self-center" />
        <div className="relative flex flex-1 py-1 sm:py-2  border-[1px] border-transparent focus-within:border-b-[1px] focus-within:border-b-blue-500 ">
          <input
            className="min-w-1 w-full bg-transparent text-white outline-none cursor-pointer text-2xl sm:text-5xl font-light"
            placeholder={placeholder}
            onChange={_.debounce((e) => {
              setSearchText(e.target.value);
            }, 300)}
          />

          <motion.div
            variants={{
              rest: { scaleX: 0, opacity: 0 },
              hover: {
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              },
            }}
            style={{ originX: 0.5 }}
            className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-500 pointer-events-none"
          />
        </div>
      </motion.fieldset>
      {searchText ? searchContent : children}
    </>
  );
};

export default SearchInput;
