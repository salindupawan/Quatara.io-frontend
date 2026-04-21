export default function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-slate-100 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg mb-4">Quatara.io</h3>
          <p className="text-slate-500 text-sm">
            Architectural SaaS Intelligence for modern professionals.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">
            Product
          </h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Features
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Pricing
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Security
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">
            Company
          </h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Careers
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Contact
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">
            Legal
          </h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Privacy Policy
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">
              Cookie Policy
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
        <p>© 2026 Quatara.io. All rights reserved.</p>

        <div className="flex items-center space-x-5">
          <a
            href="#"
            className="hover:text-[#003EC2] transition-colors"
            aria-label="X (Twitter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.762 1.75-1.762 1.75.788 1.75 1.762-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.336-.027-3.056-1.862-3.056-1.864 0-2.149 1.455-2.149 2.958v5.702h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.839-1.563 3.037 0 3.6 2.001 3.6 4.604v5.592z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:text-[#003EC2] transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2h3.356l-7.33 8.382 8.63 11.618h-6.756l-5.289-6.923-6.045 6.923h-3.356l7.839-8.987-8.324-11.013h6.918l4.844 6.367z" />
            </svg>
          </a>
          
        </div>
      </div>
    </footer>
  );
}
