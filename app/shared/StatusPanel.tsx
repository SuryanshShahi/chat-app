import { PropsWithChildren } from "react";

interface StatusPanelProps extends PropsWithChildren {
  title: string;
  description?: string;
}

const StatusPanel = ({ title, description, children }: StatusPanelProps) => {
  return (
    <div className="max-w-md rounded-2xl border border-[#2a3942] bg-[#111b21] px-8 py-7 text-center">
      <h2 className="text-lg font-semibold text-[#e9edef]">{title}</h2>
      {description && <p className="mt-2 text-sm text-[#8696a0]">{description}</p>}
      {children}
    </div>
  );
};

export default StatusPanel;
