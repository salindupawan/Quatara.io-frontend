import { Grid3X3, Link2, Signature, FileText, Settings, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "./ui/nav-link";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SidebarContent = ({ onNavItemClick }: { onNavItemClick?: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-extrabold text-[#111928] tracking-tight">QUATARA.IO</h1>
        <p className="text-[10px] font-bold text-[#878D95] tracking-widest uppercase mt-1 opacity-80">
          The Sovereign Ledger
        </p>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-1.5">
          <NavLink to="/overview" icon={<Grid3X3 size={20} />} onClick={onNavItemClick}>Overview</NavLink>
          <NavLink to="/all-links" icon={<Link2 size={20} />} onClick={onNavItemClick}>All Links</NavLink>
          <NavLink to="/signatures" icon={<Signature size={20} />} onClick={onNavItemClick}>Signatures</NavLink>
          <NavLink to="/invoices" icon={<FileText size={20} />} onClick={onNavItemClick}>Invoices</NavLink>
          <NavLink to="/settings" icon={<Settings size={20} />} onClick={onNavItemClick}>Settings</NavLink>
        </nav>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-gray-200">
        <div className="bg-[#EBF1FF] p-5 rounded-xl mb-4">
          <h4 className="text-sm font-bold text-[#111928]">Upgrade to Pro</h4>
          <p className="text-[11px] text-[#5B636C] mt-2 leading-relaxed">
            Unlock advanced ledger analytics and custom branding.
          </p>
        </div>
        <div className="space-y-1">
          <NavLink to="/support" icon={<HelpCircle size={20} />} onClick={onNavItemClick}>Support</NavLink>
          <NavLink to="/logout" icon={<LogOut size={20} />} onClick={onNavItemClick}>Sign Out</NavLink>
        </div>
      </div>
    </div>
  );
};