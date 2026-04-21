// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Specific style for the blue highlighted variables
const VariableTag = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-[#EEF2FF] text-[#1D4ED8] font-semibold text-[13px] px-1.5 py-0.5 rounded mx-0.5">
    {children}
  </span>
);

export const PDFGhostPreview = () => {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl border border-gray-100 p-8 space-y-6 select-none shadow-inner w-full">
      
      {/* Header with hidden title for accessibility */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h4 className="text-[10px] font-bold text-[#878D95] uppercase tracking-widest">
          TEMPLATE PREVIEW
        </h4>
        <p className="text-[10px] font-medium text-gray-400">Page 1 of 4</p>
      </div>

      {/* Ghost text blocks with variable tags */}
      <div className="space-y-4">
        {/* Short ghost block */}
        <div className="w-1/3 h-4 bg-[#E5E7EB] rounded" />

        {/* First paragraph block */}
        <p className="text-[13px] leading-relaxed text-[#5B636C] font-medium">
          This Statement of Work (SOW) is entered into between
          <VariableTag>{"{{Client_Name}}"}</VariableTag>
          and the Consultant...
        </p>

        {/* Second paragraph block */}
        <p className="text-[13px] leading-relaxed text-[#5B636C] font-medium">
          The total project fee shall be 
          <VariableTag>{"{{Project_Fee}}"}</VariableTag>
          payable upon completion of the milestones defined in Section 4...
        </p>
      </div>

      {/* Separator lines at bottom */}
      <div className="pt-8 flex gap-6">
          <div className="h-0.5 w-full bg-gray-100/70" />
          <div className="h-0.5 w-full bg-gray-100/70" />
      </div>
    </div>
  );
};