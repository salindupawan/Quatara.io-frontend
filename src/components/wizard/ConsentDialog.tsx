import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ConsentDialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({ onClose, onConfirm }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#1e3a5f]">Electronic Signature Disclosure</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto text-gray-600 leading-relaxed text-[15px]">
          <p className="mb-6">
            Please read this Electronic Signature Disclosure and Consent Disclosure carefully. 
            By checking the box below, you consent to use electronic signatures and receive 
            documents electronically from Quatara and its affiliates.
          </p>

          <div className="space-y-6">
            <section>
              <h3 className="font-bold text-gray-800 text-xs uppercase mb-2">1. Scope of Communications</h3>
              <p>Your consent applies to all documents, records, and disclosures related to the financial services provided by Quatara...</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-800 text-xs uppercase mb-2">2. Hardware and Software Requirements</h3>
              <p>To access and retain electronic records, you must have a valid email address and a device with internet access...</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-800 text-xs uppercase mb-2">3. Withdrawal of Consent</h3>
              <p>You may withdraw your consent to receive electronic communications at any time by contacting our support team...</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-800 text-xs uppercase mb-2">4. Legally Binding Effect</h3>
              <p>By signing electronically, you agree that your electronic signature is the legal equivalent of your manual/handwritten signature on this and all other documents...</p>
            </section>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-white">
          <label className="flex items-start gap-3 cursor-pointer group mb-6">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
            />
            <span className="text-[14px] text-gray-700 font-medium leading-tight">
              I agree that this electronic signature is as legally binding as a handwritten signature 
              and I have read the terms of the document.
            </span>
          </label>

          

          <div className="flex justify-end items-center gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <Button
              disabled={!agreed}
              onClick={onConfirm}
              variant={'gradient'}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-blue-200 h-12
                ${agreed 
                  ? "cursor-pointer" 
                  : "cursor-not-allowed"}`}
            >
              Continue to Sign
              
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentDialog;