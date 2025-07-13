import { FC } from "react";

interface HomeIconProps {
  className?: string;
  isActive?: boolean;
}

const HomeIcon: FC<HomeIconProps> = ({ className, isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      className={`${className} h-4 w-4 sm:h-5 sm:w-5 group/home cursor-pointer`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.04004 0H8.04004C8.64004 0 9.04004 0.4 9.04004 1V8C9.04004 8.6 8.64004 9 8.04004 9H1.04004C0.440039 9 0.0400391 8.6 0.0400391 8V1C0.0400391 0.4 0.440039 0 1.04004 0ZM1.04004 11H8.04004C8.64004 11 9.04004 11.4 9.04004 12V19C9.04004 19.6 8.64004 20 8.04004 20H1.04004C0.440039 20 0.0400391 19.6 0.0400391 19V12C0.0400391 11.4 0.440039 11 1.04004 11ZM19.04 0H12.04C11.44 0 11.04 0.4 11.04 1V8C11.04 8.6 11.44 9 12.04 9H19.04C19.64 9 20.04 8.6 20.04 8V1C20.04 0.4 19.64 0 19.04 0ZM12.04 11H19.04C19.64 11 20.04 11.4 20.04 12V19C20.04 19.6 19.64 20 19.04 20H12.04C11.44 20 11.04 19.6 11.04 19V12C11.04 11.4 11.44 11 12.04 11Z"
        className={`fill-[#5A698F] group-hover/home:fill-red-500 ${
          isActive ? "fill-white" : ""
        }`}
      />
    </svg>
  );
};

export default HomeIcon;
