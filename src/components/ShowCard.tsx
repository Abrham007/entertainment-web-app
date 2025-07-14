"use client";

import Image from "next/image";
import playIcon from "../../public/icon-play.svg";
import { Fragment } from "react";
import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import { FC } from "react";
import { ShowSchema } from "@/validation/tmbdSchema";
import { useAuth } from "@/context/auth";
import { useMutation } from "@tanstack/react-query";
import { addBookmarks as addBookmarksToDatabase } from "@/app/bookmarks/actions";
import toast from "react-hot-toast";
import { useBookmarkStore } from "@/stores/bookmarkStore";

interface ShowCardProps {
  size: "small" | "large";
  show: ShowSchema;
}

const ShowCard: FC<ShowCardProps> = ({ size, show }) => {
  const { bookmarks, addBookmarks, removeBookmark } = useBookmarkStore();
  const { currentUser } = useAuth();
  const isBookmarked = bookmarks
    .map((bookmark) => bookmark.id)
    .includes(show.id);
  const { mutate: mutateAddBookmarks } = useMutation({
    mutationFn: async () => {
      const tokenResult = await currentUser?.getIdTokenResult();
      if (!tokenResult) {
        throw new Error("User is not authorized");
      }

      addBookmarks([show]);
      await addBookmarksToDatabase(tokenResult.token, show);
    },
    onError(error) {
      removeBookmark(show.id);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add show to bookmark"
      );
    },
  });

  if (size === "large") {
    return (
      <div className="relative w-60 h-[140px] sm:w-[470px] sm:h-[230px] rounded-[8px] overflow-hidden cursor-pointer group hover:scale-[1.05] transition-transform duration-300">
        <button className="z-1 absolute top-0 left-0 w-full h-full hidden group-hover:flex items-center justify-center bg-black/50 rounded-[8px] cursor-pointer ">
          <div className="h-[48px] w-[117px] flex gap-4 items-center p-[9px] bg-white/30 rounded-full">
            <Image
              src={playIcon.src}
              alt="play icon"
              width={playIcon.width}
              height={playIcon.height}
              className="w-[30px] h-[30px]"
            />
            <span className="text-white text-3xl">Play</span>
          </div>
        </button>
        <Image
          src={show.backdrop_path}
          alt="Movie picture"
          fill
          className="object-cover"
        />
        <div className="z-2 absolute bottom-0 w-full flex flex-col gap-2 p-4 sm:px-6 sm:py-[21px] bg-gradient-to-b from-black/0 to-black/75">
          <p className="text-sm sm:text-xl text-white/50 font-medium flex gap-2 align-end justify-start">
            {[
              new Date(show.release_date ?? show.first_air_date!).getFullYear(),
              show.media_type,
              show.quality?.toUpperCase() ?? "CS",
            ].map((item, index) => (
              <Fragment key={index}>
                <span className="capitalize">{item}</span>
                {index < 2 && (
                  <span className="bg-white/50 h-1 w-1 rounded-full self-center"></span>
                )}
              </Fragment>
            ))}
          </p>
          <h2 className="text-white text-xl sm:text-5xl font-medium truncate text-ellipsis max-w-55">
            {show.media_type === "movie"
              ? show.title ?? show.original_title!
              : show.name ?? show.original_name!}
          </h2>
        </div>
        <button
          className="absolute top-4 right-4 sm:right-6 z-2"
          onClick={() => mutateAddBookmarks()}
        >
          <BookmarkIcon isActive={isBookmarked} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-[164px] h-[110px] sm:w-[220px] sm:h-[140px] lg:w-[280px] lg:h-[174px] rounded-[8px] overflow-hidden cursor-pointer group hover:scale-[1.05] transition-transform duration-300">
        <button className="z-1 absolute top-0 left-0 w-full h-full hidden group-hover:md:flex items-center justify-center bg-black/50 rounded-[8px] cursor-pointer ">
          <div className="h-[48px] w-[117px] flex gap-4 items-center p-[9px] bg-white/30 rounded-full">
            <Image
              src={playIcon.src}
              alt="play icon"
              width={playIcon.width}
              height={playIcon.height}
              className="w-[30px] h-[30px]"
            />
            <span className="text-white text-3xl">Play</span>
          </div>
        </button>
        <Image
          src={show.backdrop_path}
          alt="Movie picture"
          fill
          className="object-cover rounded-[8px]"
          unoptimized
        />
        <button
          className="z-2 absolute top-2 right-2 sm:top-4 sm:right-4"
          onClick={() => mutateAddBookmarks()}
        >
          <BookmarkIcon isActive={isBookmarked} />
        </button>
      </div>
      <p className="text-xs sm:text-base text-white/50 font-medium flex gap-2 align-end justify-start">
        {[
          new Date(show.release_date ?? show.first_air_date!).getFullYear(),
          show.media_type,
          show.quality?.toUpperCase() ?? "CS",
        ].map((item, index) => (
          <Fragment key={index}>
            <span className="capitalize">{item}</span>
            {index < 2 && (
              <span className="bg-white/50 h-1 w-1 rounded-full self-center"></span>
            )}
          </Fragment>
        ))}
      </p>
      <h2 className="text-white text-lg sm:text-3xl font-medium truncate text-ellipsis max-w-[164px] sm:max-w-55">
        {show.media_type === "movie"
          ? show.title ?? show.original_title ?? ""
          : show.name ?? show.original_name ?? ""}
      </h2>
    </div>
  );
};

export default ShowCard;
