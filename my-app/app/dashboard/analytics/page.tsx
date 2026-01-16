import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { AnalyticsContent } from "@/components/analytics";

export const metadata = {
  title: "Analytics - Dashboard | GROEI",
  description: "View your job search analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <AnalyticsContent />
      </main>
    </div>
  );
}

