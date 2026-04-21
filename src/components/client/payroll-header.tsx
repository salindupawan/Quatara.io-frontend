interface PayrollHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const PayrollHeader: React.FC<PayrollHeaderProps> = ({ currentStep }) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payroll Run Wizard</h1>
        <p className="text-sm text-gray-500">
          Process payroll in 5 simple steps with automatic calculations and validations
        </p>
      </div>
      <div className="pt-4">
        <h2 className="text-xl font-semibold text-gray-800">Step {currentStep}: Calculate Payroll</h2>
        <p className="text-sm text-gray-500">
          Review and finalize salary calculations for selected employees
        </p>
      </div>
    </div>
  );
};