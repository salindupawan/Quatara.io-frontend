/* eslint-disable @typescript-eslint/no-explicit-any */
export default function WizardFooter({ currentStep, totalSteps, onNext, onBack, nextLabel }: any) {
  return (
    <footer className="bg-white border-t p-6 md:p-8 flex flex-col items-center shadow-[0_-10px_20px_rgba(0,0,0,0,02)]">
      
      <div className="w-full max-w-xl flex flex-col gap-4">
        <button 
          onClick={onNext}
          className="w-full py-4 bg-[#0a192f] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          {nextLabel}
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        {currentStep > 1 && (
          <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
            Go Back to Previous Step
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
          STEP {currentStep} OF {totalSteps} COMPLETE
        </p>
      </div>
    </footer>
  );
}