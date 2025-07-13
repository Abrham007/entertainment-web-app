"use client";

import Image from "next/image";
import { FC } from "react";
import vidowIcon from "../../public/videoIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import BookmarkNavIcon from "./ui/icons/BookmarkNavIcon";
import { usePathname, useRouter } from "next/navigation";
import MoviesIcon from "./ui/icons/MoviesIcon";
import TvShowsIcon from "./ui/icons/TvShowsIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth";
import toast from "react-hot-toast";

const Nav: FC = () => {
  const { currentUser, handleLogOut, customClaims } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-between items-center px-4 py-[18px] sm:p-5 bg-blue-900 sm:rounded-[10px] lg:w-24 lg:max-h-240 lg:flex-col lg:justify-start lg:gap-18">
      <Image
        src={vidowIcon.src}
        alt="Food Icon"
        width={vidowIcon.width}
        height={vidowIcon.height}
        className="h-8 w-8 sm:h-9 sm:w-9"
      />
      <ul className="flex gap-6 sm:gap-8 lg:gap-10 lg:flex-col">
        <li>
          <Link href="/">
            <HomeIcon isActive={pathname === "/"} />
          </Link>
        </li>
        <li>
          <Link href="/movies">
            <MoviesIcon isActive={pathname === "/movies"} />
          </Link>
        </li>
        <li>
          <Link href="/tvshows">
            <TvShowsIcon isActive={pathname === "/tvshows"} />
          </Link>
        </li>
        <li>
          <Link href="/bookmarks">
            <BookmarkNavIcon isActive={pathname === "/bookmarks"} />
          </Link>
        </li>
      </ul>
      <div className="lg:flex-1 lg:flex lg:flex-col lg:justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-9 sm:size-10 lg:size-11 border-2 border-[#10141E] bg-blue-950">
              {currentUser?.photoURL && (
                <AvatarImage src={currentUser.photoURL} />
              )}
              <AvatarFallback>
                {currentUser?.email?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-blue-900 text-white border-[#10141E] w-60 ml-20 p-2 py-3 flex flex-col gap-2"
            sideOffset={10}
          >
            <DropdownMenuLabel className="flex flex-col gap-2">
              <p className="text-white text-2xl capitalize">
                {currentUser?.displayName ?? currentUser?.email?.split("@")[0]}
              </p>
              <p className="text-white text-base">{currentUser?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#10141E]" />
            {customClaims?.admin ? (
              <DropdownMenuItem className="text-white text-xl">
                <Link href="/admin-dashboard">Admin Dashboard</Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem className="text-white text-xl">
              <Link href="/">My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white text-xl">
              <button
                onClick={async () => {
                  toast.promise(
                    async () => {
                      await handleLogOut();
                    },
                    {
                      loading: "Logging out user",
                      success: () => {
                        router.refresh();
                        return "Successfull logged out user";
                      },
                      error: "Error logging out user",
                    }
                  );
                }}
              >
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;
