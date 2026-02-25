import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
export interface IModal {
  isOpen: boolean;
  close: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  wrapperClass?: string;
  disableAnimation?: boolean;
}
export const Modal: FC<PropsWithChildren<IModal>> = ({
  isOpen,
  close,
  children,
  className,
  size = "md",
  wrapperClass,
  disableAnimation,
}) => {
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#0b141a]/80 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className={clsx(
            "flex min-h-full justify-center text-center items-center",
            wrapperClass
          )}
        >
          <DialogPanel
            transition
            className={clsx(
              "mx-5 relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#2a3942] bg-[#111b21] text-left shadow-2xl shadow-black/40 sm:my-8 sm:max-h-[calc(100vh-100px)] sm:rounded-2xl max-h-[calc(100vh-50px)]",
              {
                "sm:max-w-[640px]": size === "lg",
                "sm:max-w-[545px]": size === "md",
                "sm:max-w-[400px]": size === "sm",
              },
              !disableAnimation &&
                "transform transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95",
              className
            )}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
