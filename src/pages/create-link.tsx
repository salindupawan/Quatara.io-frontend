import { ArrowRight, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TemplateSelection } from "@/components/links/template-selection";
import { SuccessDialog } from "@/components/links/success-dialog";

export const CreateLinkPage = () => {
  const navigate = useNavigate();
  const [kycChecked, setKycChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData] = useState({
    client: "Acme Corp",
    project: "Q3 Brand Strategy",
    amount: "$2,500.00",
    kycRequired: true,
    magicLink: "https://swiftsign.io/l/acme-q3-strategy-8j2k"
  });

  const handleGenerate = () => {
    // 1. Your logic to save the data to the backend
    // 2. On success, show the modal:
    setShowSuccess(true);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#F9FAFB] pt-12 pb-24 px-4 md:px-0">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 w-full md:max-w-[760px] overflow-hidden">
        {/* Header Section */}
        <div className="px-4 py-8 md:p-10 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-[#001F3F] leading-tight tracking-tight">
            Create a New Magic Link
          </h1>
          <p className="text-sm text-[#5B636C] mt-2">
            Onboard your client in three simple steps.
          </p>
        </div>

        {/* Form Body - Using CSS Grid for precise alignment */}
        <div className="p-4 md:p-12 space-y-10">
          {/* Section 1: THE BASICS */}
          <div className="grid md:grid-cols-[160px,1fr] gap-x-12 gap-y-8">
            <div className="pt-1.5">
              <h2 className="text-sm">1. THE BASICS</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="clientName"
                  className="text-sm font-medium text-[#374151]"
                >
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  placeholder="John Doe"
                  className="bg-[#F3F4F6] border-none text-sm h-[48px] rounded-lg px-4 placeholder:text-[#9CA3AF]"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="clientemail"
                  className="text-sm font-medium text-[#374151]"
                >
                  Client Email
                  <span className="text-xs text-[#878D95] ">(Optional)</span>
                </Label>
                <Input
                  id="clientemail"
                  placeholder="john.doe@example.com"
                  className="bg-[#F3F4F6] border-none text-sm h-[48px] rounded-lg px-4 placeholder:text-[#9CA3AF]"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="projectName"
                  className="text-sm font-medium text-[#374151]"
                >
                  Project/Service Name
                </Label>

                <Input
                  id="projectName"
                  placeholder="Q3 Marketing Strategy"
                  className="bg-[#F3F4F6] border-none text-sm h-[48px] rounded-lg px-4 placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: THE AGREEMENT */}
          <div className="grid md:grid-cols-[160px,1fr] gap-y-8">
            {/* Left Label */}
            <div className="pt-1.5">
              <h2 className="text-sm">2. THE AGREEMENT</h2>
            </div>

            {/* Right Content Area */}
            <div className="flex flex-col gap-6">
              <Tabs defaultValue="upload" className=" flex flex-col w-full">
                {/* 1. Toggle Buttons Area (Forced to Top) */}
                <TabsList className="bg-[#E5E7EB] rounded-lg p-1 w-full flex h-auto">
                  <TabsTrigger
                    value="upload"
                    className="px-6 py-2 text-sm  data-[state=active]:bg-white data-[state=active]:text-[#001F3F] data-[state=active]:shadow-sm rounded-md transition-all"
                  >
                    Upload PDF
                  </TabsTrigger>
                  <TabsTrigger
                    value="template"
                    className="px-6 py-2 text-sm  data-[state=active]:bg-white data-[state=active]:text-[#001F3F] data-[state=active]:shadow-sm rounded-md transition-all"
                  >
                    Use a Template
                  </TabsTrigger>
                </TabsList>

                {/* 2. Content Area (Below the Buttons) */}
                <div className="mt-6">
                  <TabsContent
                    value="upload"
                    className="m-0 focus-visible:outline-none"
                  >
                    <div className="border-2 border-dashed border-[#A5B4FC]/60 bg-[#F9FAFB] rounded-2xl p-10 flex flex-col items-center justify-center text-center w-full md:w-full hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                      <div className="w-16 h-16 bg-[#EEF2FF] rounded-2xl flex items-center justify-center mb-6">
                        <FileUp
                          className="w-8 h-8 text-[#A5B4FC]"
                          strokeWidth={2.5}
                        />
                      </div>
                      <p className="text-sm  text-[#374151]">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[10px] font-medium text-[#878D95] mt-1.5 uppercase tracking-widest">
                        PDF (max. 25MB)
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="template"
                    className="m-0 focus-visible:outline-none"
                  >
                    <TemplateSelection />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Section 3: THE DEPOSIT */}
          <div className="grid md:grid-cols-[160px,1fr] gap-x-12 gap-y-8">
            <div className="pt-1.5">
              <h2 className="text-sm">3. THE DEPOSIT</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label
                  htmlFor="depositAmount"
                  className="text-sm font-medium text-[#374151]"
                >
                  Requested Deposit Amount ($)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF]">
                    $
                  </span>
                  <Input
                    id="depositAmount"
                    type="number"
                    placeholder="0.00"
                    className="bg-[#F3F4F6] border-none text-sm h-[48px] rounded-lg pl-9 pr-4 placeholder:text-[#9CA3AF]"
                  />
                </div>
                <p className="text-xs text-[#878D95]">
                  Leave blank for no deposit.
                </p>
              </div>

              {/* KYC Checkbox */}
              <div
                className={cn(
                  "flex items-start gap-3.5 p-6 rounded-2xl border transition-all",
                )}
              >
                <Checkbox
                  id="kyc"
                  checked={kycChecked}
                  onCheckedChange={(checked) =>
                    setKycChecked(checked as boolean)
                  }
                  className="w-5 h-5 rounded border-gray-300 data-[state=checked]:bg-[#1D4ED8] data-[state=checked]:border-[#1D4ED8] text-white "
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="kyc"
                    className="text-sm  text-[#001F3F] leading-snug cursor-pointer"
                  >
                    Require Identity Verification (KYC) before signing?
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - Stick to bottom */}
        <div className="bg-[#F9FAFB] px-4 py-6 md:p-12 border-t border-gray-100 flex flex-col-reverse md:flex-row items-center justify-center md:justify-end gap-4 md:gap-6">
          {/* Cancel Button - Moves to bottom on mobile */}
          <Button
            variant="ghost"
            className="w-full md:w-auto text-sm font-semibold text-[#374151] hover:bg-gray-100 h-[52px] px-8 transition-all"
            onClick={() => navigate("/all-links")}
          >
            Cancel
          </Button>

          {/* Primary Action Button - Stays on top on mobile and goes full width */}
          <Button
          onClick={handleGenerate}
            variant={"gradient"}
            className="w-full md:w-auto h-[52px] px-8 gap-2 rounded-lg text-sm shadow-lg shadow-blue-200/50 flex items-center justify-center group transition-all"
          >
            Generate Magic Link
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        
      </div>
      <SuccessDialog 
        isOpen={showSuccess} 
        onOpenChange={setShowSuccess} 
        data={formData} 
      />
    </div>
  );
};
