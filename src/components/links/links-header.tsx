/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, ListFilter, Download, Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LinksHeaderProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (status: string) => void;
  currentFilter: string;
}

export const LinksHeader = ({ onSearchChange, onFilterChange, currentFilter }: LinksHeaderProps) => {
  const filterOptions = ["ALL", "VIEWED", "SIGNED", "ID VERIFIED", "SENT"];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 md:mb-12">
      {/* Search Input */}
      <div className="relative w-full lg:w-[400px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#878D95]" />
        <Input
          type="search"
          placeholder="Search clients, or projects..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 pr-4 bg-[#F3F4F6] border-none placeholder:text-[#878D95] text-sm h-[44px] rounded-lg w-full focus-visible:ring-1 focus-visible:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 sm:flex-none items-center gap-2">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className={cn(
                  "flex-1 sm:flex-none bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#374151] h-[44px] px-4 gap-2 border-none transition-colors",
                  currentFilter !== "ALL" && "bg-blue-50 text-[#1D4ED8] hover:bg-blue-100"
                )}
              >
                <ListFilter className="w-4 h-4" />
                <span className="text-sm">
                  {currentFilter === "ALL" ? "Filter" : currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1).toLowerCase()}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
              <DropdownMenuLabel className="text-sm text-muted-foreground px-2 py-1.5">
                Filter by Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onFilterChange(status)}
                  className="flex items-center justify-between rounded-md cursor-pointer font-medium text-sm text-[#001F3F] focus:bg-blue-50 focus:text-[#1D4ED8]"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                  {currentFilter === status && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="secondary"
            className="flex-1 sm:flex-none bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#374151] h-[44px] px-4 gap-2 border-none transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </Button>
        </div>

        <Link to={"/create-link"} className="flex-1">
          <Button
            variant={"gradient"} // Ensure this variant is defined in your button.tsx
            className="w-full sm:w-auto h-[44px] px-5 gap-2 rounded-lg shadow-sm transition-all active:scale-95 "
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Magic Link</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};