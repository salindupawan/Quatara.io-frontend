import { LinksHeader } from "@/components/links/links-header";
// import { EmptyState } from "@/components/links/empty-state";
import { LinksFooter } from "@/components/links/links-footer";
import { LinksTable } from "@/components/links/links-table";
import { useState } from "react";

export const AllLinksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  return (
    <div className="h-full flex flex-col min-h-[calc(100vh-140px)]">
      <LinksHeader
        onSearchChange={setSearchQuery}
        onFilterChange={setStatusFilter}
        currentFilter={statusFilter}
      />
      <div className="flex-1 flex flex-col justify-center pb-20">
        {/* <EmptyState /> */}
        <LinksTable
        searchQuery={searchQuery} 
        statusFilter={statusFilter}
        />
      </div>
      <LinksFooter />
    </div>
  );
};
