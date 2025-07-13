import { FC } from "react";

interface BookmarkNavIconProps {
  className?: string;
  isActive?: boolean;
}

const BookmarkNavIcon: FC<BookmarkNavIconProps> = ({ className, isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      className={`${className} h-4 w-4 sm:h-5 sm:w-5 group/bookmarkNav cursor-pointer`}
    >
      <path
        d="M12.5413 0C12.7034 0 12.8585 0.031725 13.0066 0.0951751C13.2392 0.186825 13.4243 0.331351 13.5617 0.528751C13.6992 0.726151 13.768 0.944701 13.768 1.1844V14.8156C13.768 15.0553 13.6992 15.2738 13.5617 15.4712C13.4243 15.6686 13.2392 15.8132 13.0066 15.9048C12.8726 15.9612 12.7175 15.9894 12.5413 15.9894C12.2029 15.9894 11.9103 15.8766 11.6635 15.651L6.99994 11.1672L2.33636 15.651C2.08256 15.8837 1.78999 16 1.45864 16C1.29649 16 1.14139 15.9683 0.993335 15.9048C0.760684 15.8132 0.575622 15.6686 0.438146 15.4712C0.300671 15.2738 0.231934 15.0553 0.231934 14.8156V1.1844C0.231934 0.944701 0.300671 0.726151 0.438146 0.528751C0.575622 0.331351 0.760684 0.186825 0.993335 0.0951751C1.14139 0.031725 1.29649 0 1.45864 0H12.5413Z"
        className={`fill-[#5A698F] group-hover/bookmarkNav:fill-red-500 ${
          isActive ? "fill-white" : ""
        }`}
      />
    </svg>
  );
};

export default BookmarkNavIcon;
