import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  icon: LucideIcon;
  message: string;
  actionText: string;
  type: 'warning' | 'error' | 'success';
}

export const NotificationItem = ({ icon: Icon, message, actionText, type }: NotificationItemProps) => {
  const styles = {
    warning: "border-[#B87333] bg-[#FCF9F6]",
    error: "border-[#EF4444] bg-[#FEF2F2]",
    success: "border-[#22C55E] bg-[#F0FDF4]"
  };

  return (
    <div className={cn("p-5 rounded-xl border-l-4 flex gap-4 transition-transform active:scale-[0.98] cursor-pointer", styles[type])}>
      <div className="shrink-0 w-8 h-8 rounded-lg bg-white/80 shadow-sm flex items-center justify-center">
        <Icon className={cn("w-4 h-4", 
          type === 'warning' && "text-[#B87333]",
          type === 'error' && "text-[#EF4444]",
          type === 'success' && "text-[#22C55E]"
        )} />
      </div>
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-[#001F3F] font-medium">{message}</p>
        <button className="text-[11px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1">
          {actionText} {type === 'warning' && '⚡'}
        </button>
      </div>
    </div>
  );
};