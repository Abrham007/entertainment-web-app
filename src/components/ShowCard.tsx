"use client";

import Image from "next/image";
import playIcon from "../../public/icon-play.svg";
import { Fragment, useEffect, useState } from "react";
import { useAnimation, motion, LegacyAnimationControls } from "framer-motion";
import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import { FC } from "react";
import { ShowSchema } from "@/validation/tmbdSchema";
import { useAuth } from "@/context/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import IframePlayer from "./IframePlayer";

interface ShowCardProps {
  size: "small" | "large";
  show: ShowSchema;
}

// PlayButtonOverlay: Play button overlay for show cards
const PlayButtonOverlay: FC<{
  className?: string;
  controls: LegacyAnimationControls;
  handleTap: () => void;
}> = ({ className = "", controls, handleTap }) => {
  return (
    <motion.button
      className={`z-1 absolute top-0 left-0 w-full h-full hidden group-hover:flex items-center justify-center bg-black/50 rounded-[8px] cursor-pointer ${className}`}
      style={{ overflow: "hidden" }}
      onClick={handleTap}
    >
      <div className="h-[48px] w-[117px] flex gap-4 items-center p-[9px] bg-white/30 rounded-full relative">
        <motion.span
          initial={{ x: 12 }}
          animate={controls}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center"
        >
          <Image
            src={playIcon.src}
            alt="play icon"
            width={playIcon.width}
            height={playIcon.height}
            className="w-[30px] h-[30px]"
          />
        </motion.span>
        <span className="text-white text-3xl ml-[40px]">Play</span>
      </div>
    </motion.button>
  );
};

// ShowInfo: Info row for year, type, quality
const ShowInfo: FC<{ show: ShowSchema; className?: string }> = ({
  show,
  className = "",
}) => {
  return (
    <p
      className={`text-sm sm:text-xl text-white/50 font-medium flex gap-2 align-end justify-start ${className}`}
    >
      {[
        new Date(show.release_date ?? show.first_air_date!).getFullYear(),
        show.media_type,
        show.quality?.toUpperCase() ?? "CS",
      ]
        .filter((item) =>
          typeof item === "number" && Number.isNaN(item) ? false : true
        )
        .map((item, index) => (
          <Fragment key={index}>
            <span className="capitalize">{item}</span>
            {index < 2 && (
              <span className="bg-white/50 h-1 w-1 rounded-full self-center"></span>
            )}
          </Fragment>
        ))}
    </p>
  );
};

const ShowCard: FC<ShowCardProps> = ({ size, show }) => {
  const [showVideo, setShowVideo] = useState(false);
  const { bookmarks, addBookmarks, removeBookmark } = useBookmarkStore();
  const { currentUser } = useAuth();
  const controls = useAnimation();
  const client = useQueryClient();

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
      await fetch("/api/bookmarks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authToken: tokenResult.token, show }),
        credentials: "include",
      });
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

  const query = {
    queryKey: ["video-information", show.id],
    queryFn: async () => {
      const res = await fetch(
        `/api/global/video-info?id=${show.id}&type=${show.media_type}`
      );
      if (!res.ok) throw new Error("Failed to fetch video info");
      const videoInfo = await res.json();
      const result = videoInfo.results?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => result.type === "Trailer" && result.site === "YouTube"
      )?.key;
      if (!result) {
        throw new Error("Could not find video");
      }
      return result;
    },
    staleTime: 5 * 60 * 1000,
  };

  const prefetch = () => client.prefetchQuery(query);
  const { data: videoKey, error } = useQuery({ ...query, enabled: showVideo });

  // Animate to x:80, then animate back to x:12
  const handleTap = async () => {
    if (error) {
      toast.error("Error: Could not find the video");
      return;
    }

    setShowVideo(true);

    await controls.start({
      x: 80,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.7,
      },
    });

    await controls.start({
      x: 12,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.7,
      },
    });
  };

  // Spinning animation effect
  useEffect(() => {
    let cancelled = false;
    const spin = async () => {
      while (showVideo && !videoKey && !cancelled && !error) {
        await controls.start({
          rotateZ: 360,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 1,
          },
        });
        controls.set({ rotateZ: 0 });
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };
    if (showVideo && !videoKey) {
      spin();
    }
    if (showVideo && error) {
      toast.error("Error: Could not find the video");
      return;
    }
    return () => {
      cancelled = true;
    };
  }, [showVideo, videoKey, controls, error]);

  if (size === "large") {
    return (
      <div
        onMouseEnter={prefetch}
        onMouseLeave={() => setShowVideo(false)}
        className="relative w-60 h-[140px] sm:w-[470px] sm:h-[230px] rounded-[8px] overflow-hidden cursor-pointer group hover:scale-[1.05] transition-transform duration-300"
      >
        <Image
          src={show.backdrop_path}
          alt="Movie picture"
          fill
          className="object-cover"
        />
        <PlayButtonOverlay
          controls={controls}
          handleTap={handleTap}
          className="z-10"
        />

        {showVideo && videoKey && <IframePlayer id={videoKey} />}

        <div
          onClick={handleTap}
          className="z-20 absolute bottom-0 w-full flex flex-col gap-2 p-4 sm:px-6 sm:py-[21px] bg-gradient-to-b from-black/0 to-black/75"
        >
          <ShowInfo show={show} />
          <h2 className="text-white text-xl sm:text-5xl font-medium truncate text-ellipsis max-w-55">
            {show.media_type === "movie"
              ? show.title ?? show.original_title!
              : show.name ?? show.original_name!}
          </h2>
        </div>
        <button
          className="absolute top-4 right-4 sm:right-6 z-20"
          onClick={() => mutateAddBookmarks()}
        >
          <BookmarkIcon isActive={isBookmarked} />
        </button>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={prefetch}
      onMouseLeave={() => setShowVideo(false)}
      className="flex flex-col gap-2"
    >
      <div className="relative w-[164px] h-[110px] sm:w-[220px] sm:h-[140px] lg:w-[280px] lg:h-[174px] rounded-[8px] overflow-hidden cursor-pointer group hover:scale-[1.05] transition-transform duration-300">
        <PlayButtonOverlay
          controls={controls}
          handleTap={handleTap}
          className="group-hover:md:flex"
        />

        {showVideo && videoKey && <IframePlayer id={videoKey} />}

        <Image
          src={show.backdrop_path}
          alt="Movie picture"
          fill
          className="object-cover rounded-[8px]"
        />
        <button
          className="z-2 absolute top-2 right-2 sm:top-4 sm:right-4"
          onClick={() => mutateAddBookmarks()}
        >
          <BookmarkIcon isActive={isBookmarked} />
        </button>
      </div>
      <ShowInfo show={show} className="text-xs sm:text-base" />
      <h2 className="text-white text-lg sm:text-3xl font-medium truncate text-ellipsis max-w-[164px] sm:max-w-55">
        {show.media_type === "movie"
          ? show.title ?? show.original_title ?? ""
          : show.name ?? show.original_name ?? ""}
      </h2>
    </div>
  );
};

export default ShowCard;
