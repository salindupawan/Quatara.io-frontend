import { SignIn } from "@clerk/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Optional: Branding or Welcome text */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-slate-600">Please enter your details to sign in.</p>
        </div>

        
      </div>
      <SignIn 
      forceRedirectUrl={"/overview"}
          appearance={{
    variables: {
      colorPrimary: "#003EC2", // Tailwind indigo-600
      borderRadius: "0.3rem",
    }
  }}
        />
    </div>
  );
}