export const Step1SelectPeriod = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-medium text-lg">Select Payroll Period</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-md bg-blue-50 border-blue-200">October 2025 (Monthly)</div>
      <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">November 2025 (Monthly)</div>
    </div>
  </div>
);

export const Step2SelectEmployees = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-medium text-lg">Select Employees</h3>
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3 border rounded-md">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <span className="text-sm">Employee Name 0{i}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Step3ReviewAttendance = () => (
  <div className="flex flex-col gap-4 text-center py-10 text-gray-500">
    <p>Attendance records have been synced and validated.</p>
  </div>
);

export const Step4CalculatePayroll = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-medium text-lg text-blue-600">Calculating...</h3>
    <div className="space-y-4">
      <div className="flex justify-between text-sm border-b pb-2">
        <span>Basic Salary Sum</span>
        <span className="font-bold">$42,000.00</span>
      </div>
      <div className="flex justify-between text-sm border-b pb-2">
        <span>Total Tax Deductions</span>
        <span className="font-bold text-red-500">-$4,200.00</span>
      </div>
    </div>
  </div>
);

export const Step5Finalize = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-10">
    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">✓</div>
    <h3 className="font-bold text-xl">Payroll Ready to Finalize</h3>
    <p className="text-gray-500">All calculations are verified and ready for payout.</p>
  </div>
);