interface Step { id: number; title: string; }

export default function WizardHeader({ steps, activeStep }: { steps: Step[], activeStep: number }) {
  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-2xl mx-auto flex">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const isPast = activeStep > step.id;

          return (
            <div key={step.id} className="flex-1 relative py-6">
              <div className={`text-center text-sm transition-colors
                ${isActive ? 'text-blue-600' : isPast ? 'text-blue-600' : 'text-slate-300'}`}>
                {step.id}. {step.title}
              </div>
              {/* Animated underline */}
              <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500
                ${isActive ? 'w-full bg-blue-600' : isPast ? 'w-full bg-blue-600' : 'w-0 bg-transparent'}`} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}