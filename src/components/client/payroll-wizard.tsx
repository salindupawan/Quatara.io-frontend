import React, { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Import step views
import {  
  Step2SelectEmployees, 
  Step3ReviewAttendance, 
  Step4CalculatePayroll, 
  Step5Finalize 
} from "./step-components";
import SimplePdfViewer from "@/pages/simple-pdf";

const STEPS = [
  { id: 1, label: "Select Period" },
  { id: 2, label: "Select Employees" },
  { id: 3, label: "Review Attendance" },
  { id: 4, label: "Calculate Payroll" },
  { id: 5, label: "Finalize Payroll" },
];

export default function PayrollWizard() {
  const [currentStep, setCurrentStep] = useState(4);
  


  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <SimplePdfViewer fileUrl="/2.pdf"  />;
      case 2: return <Step2SelectEmployees />;
      case 3: return <Step3ReviewAttendance />;
      case 4: return <Step4CalculatePayroll />;
      case 5: return <Step5Finalize />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 p-4 md:p-8">
      <Card className="mx-auto flex h-full min-h-[700px] w-full max-w-6xl flex-col bg-white p-6 shadow-sm border-none">
        
        {/* 1. PROGRESS STEPPER */}
        <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap mb-12">
          {STEPS.map((step, index) => {
            const isComplete = currentStep > step.id;
            const isActive = currentStep === step.id;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                    isComplete ? "bg-green-500 text-white" : isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  )}>
                    {isComplete ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span className={cn(
                    "whitespace-nowrap text-sm font-medium",
                    isComplete ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-400"
                  )}>
                    {step.label}
                  </span>
                </div>
                {index !== STEPS.length - 1 && (
                  <div className={cn("hidden h-[1px] w-full flex-1 md:block", isComplete ? "bg-green-500" : "bg-gray-200")} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 2. HEADER TEXT */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payroll Run Wizard</h1>
          <p className="text-sm text-gray-500 italic">Step {currentStep}: {STEPS[currentStep - 1].label}</p>
        </div>

        {/* 3. DYNAMIC CONTENT AREA */}
        <div className="flex-1 bg-white rounded-lg">
          {renderStepContent()}
        </div>

        {/* 4. FOOTER NAVIGATION */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <Button variant="outline" className="bg-slate-50 text-blue-900 border-none hover:bg-slate-100">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            
            <Button 
              onClick={handleNext} 
              disabled={currentStep === STEPS.length}
              className="bg-blue-600 px-8 hover:bg-blue-700 transition-all"
            >
              {currentStep === STEPS.length ? "Finish" : "Next Step"} 
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}