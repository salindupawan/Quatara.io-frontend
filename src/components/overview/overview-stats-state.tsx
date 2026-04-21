import { TrendingUp, Hourglass, ShieldCheck, Bell, Mail, CheckCircle2, MoreHorizontal } from "lucide-react";
import { StatCard } from "./stat-card";
import { NotificationItem } from "./notification-item";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const OverviewStatsPage = () => {
  return (
    <div className=" mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#001F3F] tracking-tight">Welcome back, Alex!</h1>
        <p className="text-[#878D95] mt-1 font-medium">Your business pulse for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Collected (Monthly)" value="$12,450.00" trend="+12% trend" icon={TrendingUp} iconColor="text-blue-600" />
        <StatCard title="Pending Deposits" value="$8,200.00" subtitle="4 transfers in transit" icon={Hourglass} iconColor="text-[#B87333]" />
        <StatCard title="Identity Verifications" value="14/15" subtitle="Complete" icon={ShieldCheck} iconColor="text-blue-600" progress={93} />
        <StatCard title="Pending Deposits" value="$8,200.00" subtitle="4 transfers in transit" icon={Hourglass} iconColor="text-[#B87333]" />
      </div>

      {/* Main Content: Table + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Activity Table */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-lg  text-[#001F3F]">Recent Activity</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-[#F9FAFB]">
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead className="py-4 pl-6 text-sm">Client</TableHead>
                  <TableHead className="text-sm">Activity</TableHead>
                  <TableHead className="text-sm">Timestamp</TableHead>
                  <TableHead className="text-right pr-6 text-sm">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { client: 'Julian Marques', activity: 'Invoice Paid ($4,200.00)', time: '2 mins ago', dot: 'bg-green-500' },
                  { client: 'Elena Kovic', activity: 'Magic Link Opened', time: '1 hour ago', dot: 'bg-amber-600' },
                  { client: 'Design Studio Ltd.', activity: 'Contract Signed', time: '4 hours ago', dot: 'bg-blue-600' },
                  { client: 'Tech Radar', activity: 'New KYC Verification Started', time: 'Yesterday', dot: 'bg-gray-300' },
                ].map((row, i) => (
                  <TableRow key={i} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                    <TableCell className="py-5 pl-6 font-medium text-sm">{row.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", row.dot)} />
                        <span className="text-sm font-medium text-muted-foreground">{row.activity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.time}</TableCell>
                    <TableCell className="text-right pr-6">
                      <button className="text-muted-foreground hover:text-[#001F3F] transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Notification Sidebar */}
        <div className="lg:col-span-4 space-y-4 pt-12">
          <NotificationItem 
            type="warning" 
            icon={Bell} 
            message="John Doe (Acme Corp) viewed your link 2 hours ago but hasn't signed." 
            actionText="Send Nudge" 
          />
          <NotificationItem 
            type="error" 
            icon={Mail} 
            message="Payment failed for Sarah Chen (Design Project) - 2nd attempt." 
            actionText="Contact Client" 
          />
          <NotificationItem 
            type="success" 
            icon={CheckCircle2} 
            message="Mike Ross signed! Link is now ready for deposit." 
            actionText="Go to Deal" 
          />
        </div>
      </div>
    </div>
  );
};