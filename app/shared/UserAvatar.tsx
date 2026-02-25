import clsx from "clsx";

interface UserAvatarProps {
  name?: string;
  className?: string;
}

const UserAvatar = ({ name, className }: UserAvatarProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border border-emerald-400/50 bg-[#202c33] text-sm font-semibold uppercase text-emerald-100",
        className
      )}
    >
      {(name || "?").charAt(0)}
    </div>
  );
};

export default UserAvatar;
