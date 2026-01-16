import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ApplicationsContent } from "@/components/applications";

export const metadata = {
  title: "Applications - Dashboard | GROEI",
  description: "View and manage your job applications",
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <ApplicationsContent />
      </main>
    </div>
  );
}

