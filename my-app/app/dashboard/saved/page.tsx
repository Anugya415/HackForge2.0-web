import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SavedJobsContent } from "@/components/dashboard/saved-jobs";

export const metadata = {
  title: "Saved Jobs - Dashboard | GROEI",
  description: "View your saved job listings",
};

export default function SavedJobsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <SavedJobsContent />
      </main>
    </div>
  );
}

