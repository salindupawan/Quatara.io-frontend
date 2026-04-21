import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const OverviewEmptyState = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-4 lg:pt-12">
      {/* Icon Header */}
      <div className="mb-8 lg:mb-10">
        <div className="w-12 h-12 lg:w-20 lg:h-20 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
          <FileText className="w-5 h-5 lg:w-10 lg:h-10 text-[#1D4ED8]" />
        </div>
      </div>

      {/* Hero Text - Responsive Font Sizes */}
      <div className="max-w-[650px] mb-10 lg:mb-12">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[56px] font-bold leading-[1.1] text-[#001F3F] tracking-tight mb-6">
          Your next $1,000 starts with a link.
        </h1>
        <p className="text-base lg:text-lg text-[#5B636C] leading-relaxed">
          SwiftSign turns complex digital agreements into a single, secure magic link. 
          Collect signatures and payments in one fluid motion.
        </p>
      </div>

      {/* CTA Buttons - Stack on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 lg:mb-24">
        <Link to="/create-link" className="w-full sm:w-auto">
          <Button variant={"gradient"} className="w-full sm:w-auto h-[52px] lg:h-[56px] px-8 rounded-lg gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
            <Sparkles className="w-4 h-4" />
            <span >Create Magic Link</span>
          </Button>
        </Link>
        <button className="flex items-center  gap-2 text-sm hover:text-blue-600 transition-colors group">
          View Template Library 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      

      {/* Features Grid - 1 col on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-16">
        <div className="space-y-3 lg:space-y-4">
          <p className="text-sm">COMPLIANCE</p>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            Bank-grade SHA-256 encryption on every ledger entry.
          </p>
        </div>
        <div className="space-y-3 lg:space-y-4">
          <p className="text-sm">SPEED</p>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            Average time to signature reduced by 84% globally.
          </p>
        </div>
        <div className="space-y-3 lg:space-y-4">
          <p className="text-sm">IDENTITY</p>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            Biometric verification integrated for high-value links.
          </p>
        </div>
      </div>

      {/* <div className="h-[1px] bg-gray-100 w-full mb-12" /> */}

      {/* Footer Info - Stack on mobile, row on desktop */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pt-10 border-t border-gray-250">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
            <p className="text-sm text-muted-foreground">
                System Status: <span className="text-green-500">Optimal</span>
            </p>
            <p className="text-sm text-muted-foreground">
                Version 2.4.0-Sovereign
            </p>
        </div>
        <div className="flex flex-wrap gap-6 sm:gap-8 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
          <Link to="/legal" className="hover:text-blue-600 transition-colors">Legal</Link>
          <Link to="/support" className="hover:text-blue-600 transition-colors">Support</Link>
        </div>
      </div>
    </div>
  );
};