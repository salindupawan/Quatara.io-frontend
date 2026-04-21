import { Grid3X3, Link2, Signature, FileText, Settings, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "./ui/nav-link";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";

export const Sidebar = ({isOpen}: {isOpen: boolean}) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1F44] text-white shadow-2xl 
      transform transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="w-[280px] bg-[#F9FAFB] border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-extrabold text-[#111928]">QUATARA.IO</h1>
        <p className="text-[11px] font-medium text-[#878D95] tracking-wider uppercase mt-1.5">
          The Sovereign Ledger2
        </p>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <NavLink icon={<Grid3X3 />}>Overview</NavLink>
          <NavLink icon={<Link2 />} isActive={true}>All Links</NavLink>
          <NavLink icon={<Signature />}>Signatures</NavLink>
          <NavLink icon={<FileText />}>Invoices</NavLink>
          <NavLink icon={<Settings />}>Settings</NavLink>
        </nav>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-gray-200 bg-[#F9FAFB]">
        <div className="bg-[#EBF1FF] p-5 rounded-xl mb-4 text-center">
          <h4 className="text-sm font-semibold text-[#111928]">Upgrade to Pro</h4>
          <p className="text-xs text-[#5B636C] mt-1.5 leading-relaxed">
            Unlock advanced ledger analytics and custom branding.
          </p>
        </div>
        
        <div className="space-y-1">
          <NavLink icon={<HelpCircle />}>Support</NavLink>
          <NavLink icon={<LogOut />}>Sign Out</NavLink>
        </div>
      </div>
    </div>
    </div>
  );
};