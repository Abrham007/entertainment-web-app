"use client";

import Nav from "@/components/Nav";
import TrendingList from "@/components/TrendingList";
import { useQuery } from "@tanstack/react-query";
import { getPopular } from "./actions";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryFn: async () => getPopular(),
    queryKey: ["torrent"],
  });
  return (
    <main className="bg-blue-950 max-w-screen min-h-screen overflow-hidden w-full flex flex-col gap-6 sm:gap-8 sm:p-6 lg:p-8 lg:flex-row">
      <Nav />

      <div className="flex flex-col gap-6 sm:gap-8 ml-4 sm:ml-0">
        <div className="h-5 text-white sm:p-6 lg:p-8 ">Search</div>
        <div className="flex-1 flex flex-col gap-6 sm:gap-10 ">
          <section className="flex flex-col gap-4 sm:gap-6">
            <h2 className="text-4xl sm:text-5xl text-white">Trending</h2>
            <TrendingList />
          </section>
          <section className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <h2 className="text-4xl sm:text-5xl text-white">
              Recommended for you
            </h2>
            {/* <Iframe
              url="https://multiembed.mov/?video_id=1231813"
              width="640px"
              height="320px"
              id=""
              className=""
              display="block"
              position="relative"
            /> */}
            {data}
          </section>
        </div>
      </div>
    </main>
  );
}
