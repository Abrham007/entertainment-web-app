import { FC } from "react";

interface TvShowsIconProps {
  className?: string;
  isActive?: boolean;
}

const TvShowsIcon: FC<TvShowsIconProps> = ({ className, isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      className={`${className} h-4 w-4 sm:h-5 sm:w-5 group/tvshows cursor-pointer`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.08 4.78101H20V20.2999H0V4.78101H4.92L2.22 1.50264L3.78 0.329025L7 4.20875L10.22 0.299927L11.78 1.50264L9.08 4.78101ZM2 6.72088V18.3601H12V6.72088H2ZM17 14.4803H15V12.5405H17V14.4803ZM15 10.6006H17V8.66074H15V10.6006Z"
        fill="#5A698F"
        className={`fill-[#5A698F] group-hover/tvshows:fill-red-500 ${
          isActive ? "fill-white" : ""
        }`}
      />
    </svg>
  );
};

export default TvShowsIcon;
