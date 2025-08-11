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
        "text-white bg-neutral-700 px-4 py-2 rounded-md outline-none",
        className
      )}
      {...rest}
    />
  );
};

export default InputField;
