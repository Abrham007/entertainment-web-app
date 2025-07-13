"use client";

import { FC } from "react";
import ShowCard from "./ShowCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import _ from "lodash";
import { getTrending } from "@/app/actions";
import { useBookmarkStore } from "@/stores/bookmarkStore";

const TrendingList: FC = () => {
  const { populateBookmarks } = useBookmarkStore();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      await populateBookmarks();
      return getTrending();
    },
    queryKey: ["trending"],
  });

  if (isLoading) {
    return (
      <div className="max-w-screen overflow-x-scroll pr-5 lg:pr-50">
        <div className="min-w-fit flex gap-4 sm:gap-10">
          {_.range(3).map((index) => (
            <Skeleton
              key={index}
              className="w-60 h-[140px] sm:w-[470px] sm:h-[230px] rounded-[8px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen overflow-x-scroll pr-5 lg:pr-30">
      <div className="min-w-fit max-w-screen overflow-x-scroll pr-5 lg:pr-50 flex gap-4 sm:gap-10 ">
        {data?.map((show, index) => (
          <ShowCard key={index} size="large" show={show} />
        ))}
      </div>
    </div>
  );
};

export default TrendingList;
