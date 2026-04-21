import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="text-xl font-bold text-gray-900">Quatara.io</div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <a href="#features" className="hover:text-gray-900">Features</a>
        <a href="#pricing" className="hover:text-gray-900">Pricing</a>
        <a href="#integrations" className="hover:text-gray-900">Integrations</a>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="hidden md:flex text-sm font-medium text-[#5B636C] h-[40px] px-5 hover:bg-gray-100">
          Sign In
        </Button>
        <Button variant={"gradient"} className=" font-medium text-sm h-[40px] px-5 rounded-lg">
          Get Started
        </Button>
      </div>
    </nav>
  )
}