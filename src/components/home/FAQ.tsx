import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="py-24 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="bg-slate-50 px-6 rounded-lg border-none">
          <AccordionTrigger className="text-lg font-medium">Is the e-signature legally binding?</AccordionTrigger>
          <AccordionContent className="text-slate-600 ">
            Yes, our signatures comply with global standards like the ESIGN Act and eIDAS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-slate-50 px-6 rounded-lg border-none">
          <AccordionTrigger className="text-lg font-medium">How long do payouts take?</AccordionTrigger>
          <AccordionContent className="text-slate-600">
            Standard payouts occur within 2-3 business days through Stripe.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="bg-slate-50 px-6 rounded-lg border-none">
          <AccordionTrigger className="text-lg font-medium">Can I use my own contracts?</AccordionTrigger>
          <AccordionContent className="text-slate-600">
            Absolutely. You can upload any PDF and place signature fields as needed.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}