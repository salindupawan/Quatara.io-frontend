import { Sparkles, Plus, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-start max-w-2xl pt-10">
      <div className="relative mb-10">
        <div className="w-32 h-32 bg-[#EEF2FF] rounded-2xl flex items-center justify-center">
          <Sparkles className="w-14 h-14 text-[#A5B4FC]" />
        </div>
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#E5E7EB] border-4 border-[#F9FAFB] rounded-lg flex items-center justify-center">
          <Link2 className="w-5 h-5 text-[#9CA3AF]" />
        </div>
      </div>

      <h2 className="text-[40px] font-bold text-[#001F3F] leading-tight tracking-tight mb-4">
        No Magic Links yet.
      </h2>
      
      <p className="text-[#5B636C] text-lg leading-relaxed mb-8 max-w-lg">
        Start your first deal to see the magic happen. Create a secure, trackable link and get your documents signed in seconds.
      </p>

      <div className="flex items-center gap-8">
        <Button variant={"gradient"} className="px-8 h-14 text-base font-semibold rounded-lg shadow-lg shadow-blue-200/50 flex items-center gap-2">
          <Plus className="w-5 h-5 fill-current" strokeWidth={3} />
          Create Link
        </Button>
        <button className="text-[#1D4ED8] font-semibold text-base hover:underline transition-all">
          Learn how it works
        </button>
      </div>
    </div>
  );
};