import { FC, ButtonHTMLAttributes } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="w-full py-4 bg-red-500 text-white hover:bg-white hover:text-blue-900 disabled:bg-red-500/50 disabled:text-white/50 transition-colors rounded-md cursor-pointer font-light text-[15px]"
    >
      {children}
    </button>
  );
};

export default Button;
