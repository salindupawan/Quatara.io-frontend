/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { StatusBadge } from "./status-badge";
import { HealthIndicator } from "./health-indicator";
import { QuickViewDrawer } from "./quick-view-drawer";
import { useState } from "react";

const data = [
  { client: "Acme Corp", project: "Q3 Brand Strategy", amount: "$2,500.00", status: "VIEWED" as const, lastActivity: "2 hours ago", health: "green" as const },
  { client: "Starlight Media", project: "Influencer Campaign Contract", amount: "$4,200.00", status: "SIGNED" as const, lastActivity: "Yesterday", health: "yellow" as const, highlight: true },
  { client: "Fintech Solutions", project: "NDA & Service Agreement", amount: "$0.00", status: "ID VERIFIED" as const, lastActivity: "3 days ago", health: "green" as const },
  { client: "Global Retail Inc.", project: "Retainer Agreement v2", amount: "$8,000.00", status: "SENT" as const, lastActivity: "5 days ago", health: "red" as const },
  ...Array(32).fill(null).map((_, i) => ({
    client: `Client ${i + 5}`,
    project: "Standard Agreement",
    amount: "$1,200.00",
    status: "SENT" as const,
    lastActivity: "1 week ago",
    health: "green" as const,
  })),
];

interface LinksTableProps {
  searchQuery: string;
  statusFilter: string;
}

export const LinksTable = ({ searchQuery, statusFilter }: LinksTableProps) => {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Filter the data first
  const filteredData = data.filter((item) => {
    const matchesSearch = 
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

 // Keep track of the "previous" filters to detect a change
  const [prevFilters, setPrevFilters] = useState({ searchQuery, statusFilter });

  // IF filters changed, reset page and update "previous" filter state immediately
  if (searchQuery !== prevFilters.searchQuery || statusFilter !== prevFilters.statusFilter) {
    setPrevFilters({ searchQuery, statusFilter });
    setCurrentPage(1);
  }

 
  // 3. Pagination Logic based on FILTERED data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <Sheet >
        <div className="flex-1 min-h-162.5 " >        
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              <TableHead className="py-4 pl-6">Client / Project</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-center">Health</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((row, index) => (
                <SheetTrigger asChild key={index}>
                  <TableRow
                    onClick={() => setSelectedRow(row)}
                    className="group cursor-pointer hover:bg-blue-50/30 border-b border-gray-50 transition-colors relative"
                  >
                    <TableCell className="py-4 pl-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{row.client}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {row.project}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell><span className="">{row.amount}</span></TableCell>
                    <TableCell><StatusBadge status={row.status} /></TableCell>
                    <TableCell className="text-sm">{row.lastActivity}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <HealthIndicator color={row.health} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#878D95] group-hover:text-[#001F3F]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </SheetTrigger>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-[#878D95]">
                  No results found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
        <QuickViewDrawer data={selectedRow} />
      </Sheet>

      {/* Pagination Bar - Only shows if filtered results > 10 */}
      {filteredData.length > itemsPerPage && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
          <p className="text-sm text-[#878D95] font-medium">
            Showing <span>{indexOfFirstItem + 1}</span>-
            <span>{Math.min(indexOfLastItem, filteredData.length)}</span> of{" "}
            <span>{filteredData.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-gray-200 text-[#5B636C] hover:bg-gray-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  className={`h-9 w-9 p-0 text-sm font-bold ${
                    currentPage === page
                      ? "bg-[#1D4ED8] hover:bg-[#1A47C1] text-white"
                      : "text-[#5B636C] hover:bg-gray-100"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-gray-200 text-[#5B636C] hover:bg-gray-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};