import  { useState } from "react";
import WizardHeader from "./wizard-header";
import WizardFooter from "./wizard-footer";
import SimplePdfViewer from "@/pages/simple-pdf";
import {
  Step2SelectEmployees,
  Step4CalculatePayroll,
  Step5Finalize,
} from "../client/step-components";
import SecurePayment from "./secure-payment";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const STEPS = [
  {
    id: 1,
    title: "Review & Sign",
    component: <SimplePdfViewer fileUrl="/sp.pdf" />,
  },
  {
    id: 2,
    title: "Verify Identity",
    component: <SimplePdfViewer fileUrl="/sp.pdf" />,
  },
  { id: 3, title: "Secure Payment", component: <SecurePayment /> },
];

export default function SignWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const stripePromise = loadStripe('pk_test_51Ml92zElEebY77JjuppWqvD8lOJGk4dbhV5Fj2d4uWSBzpbxemKmGHIsRBZ6lT1SguMuE2XwdKAXF2GpOrFM7p6o00SCy1pnBL');

  // const options = {
  //   // OPTION A: Use a Client Secret from your backend (Recommended)
  //   // clientSecret: 'pi_3P..._secret_...', 
    
  //   // OPTION B: For initial frontend testing only
  //   mode: 'payment',
  //   amount: 4900, // $49.00
  //   currency: 'usd',
  //   // appearance: stripeAppearance, // the variable we created earlier
  // };
  

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SimplePdfViewer fileUrl="/2.pdf" />;
      case 2:
        return <Step2SelectEmployees />;
      case 3:
        return (
          <Elements
            stripe={stripePromise}
            options={{mode: 'payment', amount: 4900, currency: 'usd'}}
          >
            <SecurePayment />
          </Elements>
        // <p>o</p>
        );
      case 4:
        return <Step4CalculatePayroll />;
      case 5:
        return <Step5Finalize />;
      default:
        return null;
    }
  };

  //   const activeStepData = STEPS.find(s => s.id === currentStep);
  //   const ActiveComponent = activeStepData?.component || <SimplePdfViewer fileUrl="/sp.pdf" />;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  if (isCompleted) return <p>Signatures completed successfully!</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Brand Header */}
      <nav className="bg-white  px-6 py-4 flex justify-between items-center">
        <span className="font-black text-xl text-blue-600">SwiftSign</span>
        <span className="text-[10px] font-bold text-slate-400 border px-2 py-1 rounded">
          SECURE SESSION
        </span>
      </nav>

      {/* Reusable Progress Stepper */}
      <WizardHeader steps={STEPS} activeStep={currentStep} />

      {/* Dynamic Content Area */}
      <main className="flex-1 overflow-y-auto py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-6xl transition-all duration-500 ease-in-out">
          {/* <ActiveComponent /> */}
          {renderStepContent()}
        </div>
      </main>

      {/* Functional Footer */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onNext={handleNext}
        onBack={handleBack}
        nextLabel={
          currentStep === STEPS.length
            ? "Finish & Pay"
            : `Continue to ${STEPS.find((s) => s.id === currentStep + 1)?.title || ""}`
        }
      />
    </div>
  );

  
}
