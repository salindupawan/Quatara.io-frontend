import { useState } from "react";
import { Check, Copy, Mail, MessageSquare, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface SuccessDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    client: string;
    project: string;
    amount: string;
    kycRequired: boolean;
    magicLink: string;
  };
}

export const SuccessDialog = ({
  isOpen,
  onOpenChange,
  data,
}: SuccessDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.magicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          // 1. MOBILE RESPONSIVENESS:
          // "w-[calc(100%-32px)]" ensures 16px padding from screen edges on mobile.
          // "max-h-[90vh]" prevents the dialog from hitting the very top/bottom of the screen.
          // "sm:max-w-[600px]" increases the width on larger screens.
          "w-[calc(100%-32px)] sm:w-full sm:max-w-[600px] max-h-[90vh] p-0 pt-10 pe-0.5 overflow-hidden border-none rounded-xl gap-0 flex flex-col",
        )}
      >
        {/* 2. SCROLLABLE CONTAINER: 
            We wrap the content in an overflow-y-auto div so the "Done" button stays fixed at the bottom. */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <DialogHeader className="pt-5 pb-6 flex flex-col items-center px-6">
            <div className="w-16 h-16 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-[#22C55E]" strokeWidth={3} />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center font-medium tracking-tight px-4">
              Success! Your Magic Link is Ready.
            </DialogTitle>
            <p className="text-sm text-center mt-2 max-w-[380px] leading-relaxed">
              Share this link with your client to start the onboarding and
              payment process.
            </p>
          </DialogHeader>

          <div className="px-6 sm:px-12 pb-10 space-y-4">
            {/* Magic Link Section */}
            <div className="space-y-3 mt-4">
              <p className="text-sm">Magic Link</p>
              <div className="flex flex-col sm:flex-row gap-2">
                
                <Input
                    
                    type="text"
                    readOnly
                    value={`${data.magicLink}dofjodgjdojdogijdo`}
                    className="bg-[#F3F4F6] flex-1 border-none text-sm !h-[48px] min-h-[48px] rounded-lg truncate  placeholder:text-[#9CA3AF]"
                  />
                <Button
                variant={"gradient"}
                  onClick={handleCopy}
                  className=" h-[48px] px-8 rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-100 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </Button>
              </div>

              <div className="h-6 flex items-center">
                {copied && (
                  <div className="flex items-center bg-[#F0FDF4] border border-[#DCFCE7] px-5 py-1.5 rounded-2xl animate-in fade-in slide-in-from-top-1 duration-300 mt-1">
                    <Check className="w-3.5 h-3.5 text-[#22C55E] mr-2" />
                    <span className="text-sm text-[#22C55E] ">
                      Link copied to clipboard!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details Card */}
            <div className="bg-[#F9FAFB] rounded-2xl p-6 sm:p-8 border border-gray-100">
              <p className="text-sm mb-6">Project Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-8">
                <div>
                  <p className="text-sm  mb-1">Client</p>
                  <p className="text-sm font-bold">{data.client}</p>
                </div>
                <div>
                  <p className="text-sm  mb-1">Project</p>
                  <p className="text-sm font-bold">{data.project}</p>
                </div>
                <div>
                  <p className="text-sm  mb-1">Deposit</p>
                  <p className="text-sm font-bold">{data.amount}</p>
                </div>
                <div>
                  <p className="text-sm  mb-1">KYC</p>
                  <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-sm font-bold">{data.kycRequired ? "Required" : "Not Required"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Actions: Stack on mobile, grid on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="h-12 border-gray-100 bg-[#F3F4F6]/50 text-[#5B636C] cursor-pointer text-xs gap-2 rounded-xl"
              >
                <Mail className="w-4 h-4" /> Email Link
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-100 bg-[#F3F4F6]/50 text-[#5B636C] cursor-pointer text-xs gap-2 rounded-xl"
              >
                <MessageSquare className="w-4 h-4" /> Send via SMS
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-100 bg-[#F3F4F6]/50 text-[#5B636C] cursor-pointer text-xs gap-2 rounded-xl"
              >
                <ExternalLink className="w-4 h-4" /> Open in Portal
              </Button>
            </div>
          </div>
        </div>

        {/* 3. FIXED FOOTER: The "Done" button stays visible while content scrolls. */}
        <div className="border-t border-gray-50 p-6 flex justify-center bg-[#f8f8f8] shrink-0">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-sm cursor-pointer px-20 py-3 text-[#001F3F]] hover:bg-transparent hover:text-blue-600 transition-colors"
            >
              Done
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
