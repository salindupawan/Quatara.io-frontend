import type { ReactNode } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ to, icon, children, onClick }: NavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
          isActive
            ? "bg-white text-[#2956F7] shadow-sm md:shadow-none"
            : "text-[#5B636C] hover:text-[#2956F7] hover:bg-gray-100/50"
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className={cn("w-5 h-5", isActive ? "text-[#2956F7]" : "text-[#878D95]")}>
            {icon}
          </div>
          {children}
        </>
      )}
    </RouterNavLink>
  );
};