import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "1 active magic link",
      "Standard templates",
      "Basic Stripe integration",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    features: [
      "Unlimited magic links",
      "Custom branding",
      "Custom domains",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Team collaboration",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 px-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
      <p className="text-slate-500 mb-12">
        Simple tiers built for freelancers and growing agencies.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card
              className={`relative h-full transition-all duration-300 ${tier.highlighted ? "border-[#003EC2] ring-4 ring-indigo-50 shadow-xl bg-[#003EC2] text-white scale-105" : "bg-white"}`}
            >
              <CardHeader className="text-left">
                <CardTitle className="text-sm font-semibold opacity-80">
                  {tier.name}
                </CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Free" && tier.price !== "Custom" && (
                    <span className="text-sm ml-1 opacity-70">/mo</span>
                  )}
                </div>
                {tier.highlighted && (
                  <p className="text-xs mt-2 opacity-80">
                    For serious independent professionals.
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div className="text-left space-y-4 mb-6">
                  {tier.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <Check
                        size={16}
                        className={
                          tier.highlighted ? "text-white" : "text-[#014FF4]"
                        }
                      />
                      <span className="opacity-95">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full py-6 font-semibold text-slate-900 ${tier.highlighted ? "bg-white  hover:bg-slate-100" : "bg-slate-100  hover:bg-slate-200"}`}
                >
                  {tier.highlighted
                    ? "Start 14-Day Trial"
                    : tier.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
