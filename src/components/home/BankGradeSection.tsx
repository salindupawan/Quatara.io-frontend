import { CreditCard, Lock, ShieldCheck } from "lucide-react";

export default function BankGradeSection() {
  return (
    <section id="features" className="py-20 px-8 bg-slate-50 text-center">
            <h2 className="text-3xl font-bold mb-4">The Bank-Grade Security</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-10">
              We handle the sensitive data so you don't have to. Your business and your clients are protected by enterprise-grade security.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center space-x-2 text-slate-600 font-medium">
                <ShieldCheck size={20} /> <span>PCI Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 font-medium">
                <Lock size={20} /> <span>256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 font-medium">
                <CreditCard size={20} /> <span>Secured by Stripe</span>
              </div>
            </div>
    
            <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl border border-slate-200 text-sm text-slate-600 leading-relaxed shadow-sm">
              <p>
                When clients verify their identity through Quatara, their sensitive documents never touch your servers or devices. We securely process and vault KYC data, providing you with verified status and compliance without the liability of storing personal data.
              </p>
            </div>
          </section>
  )
}
