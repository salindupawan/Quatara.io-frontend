import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import { ShieldCheck, Lock, CreditCard, Settings, Send, Landmark } from "lucide-react";
import Footer from "@/components/home/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section className="py-24 px-8 bg-white text-center">
        <h2 className="text-4xl font-bold mb-2">How It Works</h2>
        <p className="text-slate-500 mb-16">Get from agreement to payment in three simple steps.</p>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          <Step 
            number="1" 
            title="Configure Deal" 
            desc="Set your terms, upload or select contracts, and define the required deposit amount."
            icon={<Settings className="text-[#014FF4]" />}
          />
          <Step 
            number="2" 
            title="Send Magic Link" 
            desc="Share a secure, single-use link with your client via email, SMS, or direct message."
            icon={<Send className="text-[#014FF4]" />}
          />
          <Step 
            number="3" 
            title="Get Paid Automatically" 
            desc="Clients sign, verify ID, and pay in one seamless flow. Funds land directly in your account."
            icon={<Landmark className="text-[#014FF4]" />}
          />
        </div>
      </section>

      {/* Bank Grade Promise */}
      <section className="py-20 px-8 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold mb-4">The Bank-Grade Promise</h2>
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

      <Pricing />
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function Step({ number, title, desc, icon }: { number: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center">
          {icon}
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-[#014FF4] shadow-sm">
          {number}
        </div>
      </div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-md text-slate-500 max-w-[250px] ">{desc}</p>
    </div>
  );
}