/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  PaymentElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// ForwardRef allows the parent to access the internal handleSubmit
const SecurePayment = forwardRef((props, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Expose the submit function to the parent
  useImperativeHandle(ref, () => ({
    async handlePayment() {
      if (!stripe || !elements) return;

      setLoading(true);
      setErrorMessage(null);

      // 1. Trigger form validation
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message ?? "Validation failed");
        setLoading(false);
        return { success: false };
      }

      // 2. Confirm Payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        setErrorMessage(error.message ?? 'An unexpected error occurred.');
        setLoading(false);
        return { success: false };
      }
      
      return { success: true };
    }
  }));

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US', currency: 'usd',
        total: { label: 'Service Agreement Fee', amount: 4900 },
        requestPayerName: true, requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) setPaymentRequest(pr);
      });

      pr.on('paymentmethod', async (ev) => {
        ev.complete('success');
      });
    }
  }, [stripe]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl border shadow-sm w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
        </div>
        <h2 className="text-2xl font-bold">Secure Payment</h2>
        <p className="text-slate-500 text-sm">Please provide your payment details to finalize</p>
      </div>

      {paymentRequest && (
        <div className="mb-8">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-medium">Or pay with card</span></div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 border rounded-xl bg-slate-50/50">
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>

        {/* Removed internal button from here */}

        {errorMessage && <div className="text-red-500 text-sm mt-2 text-center font-semibold">{errorMessage}</div>}
        {loading && <div className="text-blue-600 text-sm mt-2 text-center animate-pulse">Processing secure payment...</div>}

        <div className="flex items-center justify-center gap-2 px-2 mt-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
            Encrypted with 256-bit SSL Security
          </p>
        </div>
      </div>
    </div>
  );
});

SecurePayment.displayName = "SecurePayment";
export default SecurePayment;