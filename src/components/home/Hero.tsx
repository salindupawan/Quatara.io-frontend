import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="px-8 py-20 bg-slate-50 flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-6xl font-extrabold  text-slate-900 mb-6">
          Stop Chasing Clients. <br />
          <span className="bg-linear-to-r from-[#003EC2] to-[#014FF4] bg-clip-text text-transparent">
  Start Your Projects.
</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Automate your entire client onboarding workflow. Send one magic link
          to handle contracts, secure ID verification, and collect initial
          deposits instantly.
        </p>
        <Link to={"/create-link"}>
          <Button
            size="lg"
            variant={"gradient"}
            className=" text-lg px-8 py-5 rounded-xl h-auto cursor-pointer "
          >
            <Sparkles className="mr-2" />
            Create Your First Magic Link
          </Button>
        </Link>
        <p className="mt-4 text-sm text-slate-400">
          • No credit card required • Cancel anytime
        </p>
      </div>

      {/* Floating Card Mockup */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#014FF4]">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className=" text-md">New Client Onboarding</h4>
            <p className="text-sm text-slate-500">Auto Form ERP Project</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-sm font-medium">Service Agreement</span>
            <CheckCircle2 className="text-[#014FF4]" size={16} />
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100">
            <span className="text-sm font-medium">ID Verification</span>
            <Badge
              variant="secondary"
              className="text-xs bg-blue-50 text-[#014FF4]"
            >
              Pending
            </Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100">
            <span className="text-sm font-medium">
              Deposit Invoice ($2,500)
            </span>
            <Badge
              variant="secondary"
              className="text-xs bg-blue-50 text-[#014FF4]"
            >
              Pending
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
