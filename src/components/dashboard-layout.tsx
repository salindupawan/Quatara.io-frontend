import { Outlet } from "react-router-dom";
import { SidebarContent } from "./sidebar-content";
import { Header } from "./header";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[280px] border-r border-gray-200 flex-col h-screen sticky top-0 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};