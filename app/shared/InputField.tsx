import clsx from "clsx";
import React from "react";

const InputField = ({
  className,
  ...rest
}: {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        "h-11 w-full rounded-xl border border-[#2a3942] bg-[#202c33] px-4 text-sm text-[#e9edef] outline-none transition-all placeholder:text-[#8696a0] focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...rest}
    />
  );
};

export default InputField;
