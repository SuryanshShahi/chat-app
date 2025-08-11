import clsx from "clsx";
import React from "react";

const Button = ({
  children,
  className,
  variant = "primary",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline-dashed";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 text-center",
        {
          "bg-green-600 text-white rounded-md font-medium w-max":
            variant === "primary",
          "text-green-500 border border-dashed border-green-500 rounded-full py-2 text-sm":
            variant === "outline-dashed",
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
