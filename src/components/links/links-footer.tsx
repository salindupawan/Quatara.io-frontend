import { ShieldCheck, Globe } from "lucide-react";

export const LinksFooter = () => {
  return (
    <div className="mt-auto pt-16 border-t border-gray-100 flex flex-wrap gap-x-12 gap-y-6">
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold text-[#878D95] uppercase tracking-widest">Encryption</p>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
          <ShieldCheck className="w-4 h-4 text-[#878D95]" />
          AES-256 Bit
        </div>
      </div>
      
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold text-[#878D95] uppercase tracking-widest">Network</p>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
          <Globe className="w-4 h-4 text-[#878D95]" />
          Sovereign Ledger
        </div>
      </div>
    </div>
  );
};