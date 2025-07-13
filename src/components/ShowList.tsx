"use client";

import { FC } from "react";
import ShowCard from "./ShowCard";
import { Skeleton } from "./ui/skeleton";
import _ from "lodash";
import { ShowSchema } from "@/validation/tmbdSchema";

interface ShowListProps {
  shows: Array<ShowSchema> | undefined;
  isLoading: boolean;
}

const ShowList: FC<ShowListProps> = ({ shows, isLoading }) => {
  if (isLoading) {
    return (
      <div className="max-w-screen overflow-x-scroll lg:pr-40">
        <div className="min-w-fit flex justify-center lg:justify-start gap-4 sm:gap-8 lg:gap-x-10 lg:gap-y-6 flex-wrap">
          {_.range(15).map((index) => (
            <Skeleton
              key={index}
              className="w-[164px] h-[110px] sm:w-[220px] sm:h-[140px] lg:w-[280px] lg:h-[174px] rounded-[8px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!shows) {
    <h1>Error</h1>;
  }

  return (
    <div className="max-w-screen overflow-x-scroll lg:pr-40">
      <div className="min-w-fit flex justify-start sm:justify-center lg:justify-start gap-4 sm:gap-8 lg:gap-x-10 lg:gap-y-6 flex-wrap">
        {shows?.map((show, index) => (
          <ShowCard key={index} size="small" show={show} />
        ))}
      </div>
    </div>
  );
};

export default ShowList;
