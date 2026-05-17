import {Settings, Send, Landmark } from "lucide-react";

export default function ProcessSection() {
  return (
    <section id="integrations" className="py-24 px-8 bg-white text-center">
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
  )
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
