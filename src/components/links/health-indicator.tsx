import { cn } from "@/lib/utils";

export const HealthIndicator = ({ color }: { color: "green" | "yellow" | "red" }) => {
  const colors = {
    green: "bg-[#22C55E]",
    yellow: "bg-[#FACC15]",
    red: "bg-[#EF4444]",
  };

  return <div className={cn("w-2 h-2 rounded-full", colors[color])} />;
};