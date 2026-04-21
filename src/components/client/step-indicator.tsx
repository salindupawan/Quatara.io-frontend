import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  status: "complete" | "current" | "upcoming";
}

interface StepIndicatorProps {
  steps: Step[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                step.status === "complete" && "bg-green-600 text-white",
                step.status === "current" && "bg-blue-600 text-white",
                step.status === "upcoming" && "bg-gray-200 text-gray-500"
              )}
            >
              {step.status === "complete" ? <Check className="h-4 w-4" /> : step.id}
            </div>
            <span
              className={cn(
                "whitespace-nowrap text-sm font-medium",
                step.status === "complete" && "text-green-600",
                step.status === "current" && "text-blue-600",
                step.status === "upcoming" && "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {index !== steps.length - 1 && (
            <div className="hidden h-[1px] w-full flex-1 bg-gray-200 md:block" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};