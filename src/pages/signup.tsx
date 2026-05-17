import { SignUp } from "@clerk/react";

const SignUpPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] px-4 py-12">      

      <div className="z-10 w-full max-w-md">
        {/* Logo/Header Area */}
        <div className="text-center mb-8">
          
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-2">Start your journey with Quatara.io</p>
        </div>

        
      </div>
{/* Clerk Sign Up Component */}
        <SignUp
      forceRedirectUrl={"/overview"}
          appearance={{
            layout: {
              socialButtonsVariant: "blockButton",
              shimmer: true,
            },
            variables: {
              colorPrimary: "#003EC2", // Indigo-600
              colorTextSecondary: "#64748b", // Slate-500
              borderRadius: "0.3rem",
            },
            elements: {
              card: "shadow-2xl border border-slate-100 bg-white",
              headerTitle: "hidden", // We already have a custom header above
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 transition-all",
              formButtonPrimary: "shadow-md hover:shadow-indigo-200 transition-all",
              footerActionLink: "text-indigo-600 hover:text-indigo-700 font-medium",
            },
          }}
          signInUrl="/signin" // Ensure this matches your login route
        />
      {/* Simple Footer */}
      <p className="mt-8 text-sm text-slate-400 z-10">
        &copy; 2026 Quatara.io. All rights reserved.
      </p>
    </div>
  );
};

export default SignUpPage;