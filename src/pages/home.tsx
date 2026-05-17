import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import BankGradeSection from "@/components/home/BankGradeSection";
import ProcessSection from "@/components/home/ProcessSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <ProcessSection />

      {/* Bank Grade Promise */}
      <BankGradeSection />

      {/* Pricing section */}
      <Pricing />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
