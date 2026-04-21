import { CheckCircle2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PDFGhostPreview } from "./pdf-ghost-preview";

export const TemplateSelection = () => {
  // Mock data to match the reference image
  const defaultTemplate = "standard-us-consulting-sow";

  return (
    <div className="w-full flex justify-center md:justify-start">
        <div className="w-full space-y-6">
        
        {/* Label and Verified Badge */}
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#374151]">
            Select a Template from Library
            </label>
            <Badge variant="outline" className="border-[#22C55E]/30 bg-[#22C55E]/10 text-[#166534] gap-1.5 px-3 py-1 text-xs font-semibold rounded-full">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            VERIFIED
            </Badge>
        </div>

        {/* The Dropdown Select Menu */}
        {/* The Dropdown Select Menu */}
<Select defaultValue={defaultTemplate}>
  <SelectTrigger 
    className="w-full bg-[#F3F4F6] border-none text-sm !h-[48px] rounded-lg px-4 transition-all focus:ring-1 focus:ring-blue-300 outline-none shadow-none"
  >
    <SelectValue placeholder="Select a template..." />
  </SelectTrigger>
  
  <SelectContent className="bg-white border-gray-100 shadow-xl rounded-lg">
    <SelectItem value="standard-us-consulting-sow" className="font-medium py-2 pl-3 text-[#001F3F] cursor-pointer">
      Standard US Consulting SOW
    </SelectItem>
    <SelectItem value="uk-master-service-agreement" className="font-medium py-2 pl-3 text-[#001F3F] cursor-pointer">
      UK Master Service Agreement
    </SelectItem>
    <SelectItem value="non-disclosure-agreement" className="font-medium py-2 pl-3 text-[#001F3F] cursor-pointer">
      Non-Disclosure Agreement
    </SelectItem>
  </SelectContent>
</Select>

        {/* The PDF Mockup Preview */}
        <PDFGhostPreview />
        </div>
    </div>
  );
};