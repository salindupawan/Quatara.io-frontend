import { Search, Menu, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";
import { useState } from "react";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 sticky top-0 z-20 h-[64px] md:h-[72px]">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#5B636C] hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px] border-none">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <SidebarContent onNavItemClick={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative hidden md:block w-[360px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#878D95]" />
          <Input 
            type="search" 
            placeholder="Search contracts, links, or clients..." 
            className="pl-11 pr-4 bg-[#F3F4F6] border-none placeholder:text-[#878D95] text-sm h-[40px] rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" className="hidden md:flex text-sm font-medium text-[#5B636C] h-[40px] px-5 hover:bg-gray-100">
          Export CSV
        </Button>
        <Button variant={"gradient"} className=" font-medium text-sm h-[40px] px-5 rounded-lg">
            <Sparkles className="mr-2" />
          New Magic Link
        </Button>
        
        <Avatar className="w-9 h-9 md:w-10 md:h-10 border border-gray-200">
          <AvatarImage src="/profile.jpg" alt="User" />
          <AvatarFallback className="bg-green-100 text-green-700 font-medium text-xs md:text-sm">SP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};