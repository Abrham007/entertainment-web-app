import { FC, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: FC<InputProps> = ({ error, ...props }) => {
  return (
    <motion.fieldset
      className="relative flex justify-between items-center p-4 border-b-[1px] border-b-blue-500 focus-within:border-b-[1px] focus-within:border-b-white cursor-pointer"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <input
        {...props}
        className="min-w-1 bg-transparent text-white outline-none cursor-pointer text-xl"
      />

      {error && (
        <p className="text-red-500 text-[13px] font-light leading-4 min-w-fit">
          {error}
        </p>
      )}
      <motion.div
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          },
        }}
        style={{ originX: 0.5 }}
        className="absolute left-0 bottom-0 w-full h-[1px] bg-white pointer-events-none"
      />
    </motion.fieldset>
  );
};

export default Input;
