import { FC } from "react";

interface MoviesIconProps {
  className?: string;
  isActive?: boolean;
}

const MoviesIcon: FC<MoviesIconProps> = ({ className, isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      className={`${className} h-4 w-4 sm:h-5 sm:w-5 group/movies cursor-pointer`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9556 0.299927H3.04444C1.36304 0.299927 0 1.66297 0 3.34437V17.2555C0 18.9369 1.36304 20.2999 3.04444 20.2999H16.9556C17.763 20.2999 18.5374 19.9792 19.1083 19.4082C19.6792 18.8373 20 18.0629 20 17.2555V3.34437C20 2.53693 19.6792 1.76257 19.1083 1.19162C18.5374 0.62068 17.763 0.299927 16.9556 0.299927ZM4 9.29993H2V7.29993H4V9.29993ZM4 11.2999H2V13.2999H4V11.2999ZM18 9.29993H16V7.29993H18V9.29993ZM18 11.2999H16V13.2999H18V11.2999ZM18 3.03993V4.29993H16V2.29993H17.26C17.4563 2.29993 17.6445 2.37789 17.7833 2.51667C17.922 2.65544 18 2.84367 18 3.03993ZM4 2.29993H2.74C2.54374 2.29993 2.35552 2.37789 2.21674 2.51667C2.07796 2.65544 2 2.84367 2 3.03993V4.29993H4V2.29993ZM2 17.5599V16.2999H4V18.2999H2.74C2.54374 18.2999 2.35552 18.222 2.21674 18.0832C2.07796 17.9444 2 17.7562 2 17.5599ZM17.26 18.2999C17.6687 18.2999 18 17.9686 18 17.5599V16.2999H16V18.2999H17.26Z"
        fill="#5A698F"
        className={`fill-[#5A698F] group-hover/movies:fill-red-500 ${
          isActive ? "fill-white" : ""
        }`}
      />
    </svg>
  );
};

export default MoviesIcon;
