import clsx from "clsx";
import React from "react";
import Loader from "./Loader";

const Button = ({
  children,
  className,
  variant = "primary",
  isLoading = false,
  loadingText,
  disabled,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline-dashed" | "danger" | "ghost";
  isLoading?: boolean;
  loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 disabled:cursor-not-allowed disabled:opacity-60",
        {
          "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-600/90":
            variant === "primary",
          "text-emerald-300 border border-dashed border-emerald-400/60 hover:bg-emerald-400/10":
            variant === "outline-dashed",
          "bg-red-500/90 text-white hover:bg-red-500": variant === "danger",
          "text-slate-300 hover:bg-white/10": variant === "ghost",
        },
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader />
          {loadingText || "Loading..."}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
