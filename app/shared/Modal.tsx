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
        className="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
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
              "mx-5 relative overflow-hidden sm:rounded-lg rounded-3xl flex flex-col sm:max-h-[calc(100vh-100px)] max-h-[calc(100vh-50px)] bg-neutral-800 text-left shadow-xl sm:my-8 w-full",
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
