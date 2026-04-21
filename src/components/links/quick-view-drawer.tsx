/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface QuickViewProps {
  data: any; // In a real app, pass the specific row data
}

export const QuickViewDrawer = ({ data }: QuickViewProps) => {
  return (
    <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col h-full border-none shadow-2xl">
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-6">
        <SheetHeader className="p-0 items-start">
          <p className="text-[10px] font-bold text-[#878D95] uppercase tracking-[0.2em] mb-2">
            {data?.project || "Acme Corp"}
          </p>
          <SheetTitle className="text-3xl font-bold text-[#001F3F]">{data?.client || "Acme Corp"}</SheetTitle>
          
          <div className="flex items-center gap-2 mt-4 bg-[#F3F4F6] px-3 py-2 rounded-lg w-fit">
            <span className="text-sm text-[#5B636C] font-medium">swiftsign.io/l/acme-q3-24</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#878D95] hover:bg-white">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-10">
          <p className="text-[10px] font-bold text-[#878D95] uppercase tracking-widest mb-4">
            Document Preview
          </p>
          <div className="aspect-[4/5] bg-[#6B7280] rounded-xl flex items-center justify-center p-12 relative overflow-hidden">
             {/* Mock Document */}
             <div className="bg-white w-full h-full shadow-2xl rounded-sm flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-1 border-t-2 border-gray-100 mb-4" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contract</p>
                <div className="bg-[#F9FAFB] border border-gray-100 px-4 py-2 rounded text-[10px] font-bold text-[#001F3F]">
                   AREN REEIEU
                </div>
             </div>
          </div>
        </div>

        <div className="mt-10 mb-10">
          <p className="text-[10px] font-bold text-[#878D95] uppercase tracking-widest mb-6">
            Activity Timeline
          </p>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[7px] before:w-[2px] before:bg-gray-100">
            {/* Timeline Item 1 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-[#1D4ED8] rounded-full border-2 border-white ring-1 ring-[#1D4ED8]" />
              <p className="text-sm font-bold text-[#001F3F]">Signature Applied</p>
              <p className="text-xs text-[#878D95] mt-1">Aug 24, 2024 • 2:14 PM</p>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-[#1D4ED8] rounded-full border-2 border-white ring-1 ring-[#1D4ED8]" />
              <p className="text-sm font-bold text-[#001F3F]">PDF Viewed (3 mins)</p>
              <p className="text-xs text-[#878D95] mt-1">Aug 24, 2024 • 2:11 PM</p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-[#878D95] rounded-full border-2 border-white ring-1 ring-gray-200" />
              <p className="text-sm font-bold text-[#001F3F]">Email Opened</p>
              <p className="text-xs text-[#878D95] mt-1">Aug 24, 2024 • 11:45 AM</p>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-[#878D95] rounded-full border-2 border-white ring-1 ring-gray-200" />
              <p className="text-sm font-bold text-[#001F3F]">Link Created</p>
              <p className="text-xs text-[#878D95] mt-1">Aug 23, 2024 • 04:30 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#F9FAFB] border-t border-gray-100">
        <Button className="w-full bg-[#1D4ED8] hover:bg-[#1A47C1] text-white h-14 font-bold text-base rounded-xl">
          Send Reminder
        </Button>
      </div>
    </SheetContent>
  );
};