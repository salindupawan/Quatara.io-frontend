import { cn } from "@/lib/utils";

type StatusType = "VIEWED" | "SIGNED" | "ID VERIFIED" | "SENT";

export const StatusBadge = ({ status }: { status: StatusType }) => {
  const styles = {
    VIEWED: "bg-[#EAB308]/20 text-[#A16207]", // Gold/Yellow
    SIGNED: "bg-[#22C55E] text-white",       // Solid Green
    "ID VERIFIED": "bg-[#3B82F6] text-white", // Solid Blue
    SENT: "bg-[#E5E7EB] text-[#6B7280]",      // Gray
  };

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase",
      styles[status]
    )}>
      {status}
    </span>
  );
};