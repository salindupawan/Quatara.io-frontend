import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  icon: LucideIcon;
  iconColor: string;
  progress?: number;
}

export const StatCard = ({ title, value, subtitle, trend, icon: Icon, iconColor, progress }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-[180px]">
      <div className="flex justify-between items-start">
        <p className="text-muted-foreground">
          {title}
        </p>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-[#001F3F] mb-1">{value}</h3>
        {trend && (
          <p className="text-sm  text-[#22C55E]">
            {trend} <span className="text-muted-foreground font-medium ml-1">vs last month</span>
          </p>
        )}
        {subtitle && <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>}
        
        {progress !== undefined && (
          <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};