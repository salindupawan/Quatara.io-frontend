import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export const PayrollFooter = () => {
  return (
    <div className="mt-auto flex flex-col items-center justify-between gap-4 border-t bg-white p-4 md:flex-row">
      <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
        <Button variant="outline" className="bg-slate-50 text-blue-900 border-none hover:bg-slate-100">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
        <Button className="bg-blue-600 px-8 hover:bg-blue-700">
          Next Step <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};