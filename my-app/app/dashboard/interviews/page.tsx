import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { InterviewsContent } from "@/components/interviews";

export const metadata = {
  title: "Interviews - Dashboard | GROEI",
  description: "Manage your interview schedule",
};

export default function InterviewsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <InterviewsContent />
      </main>
    </div>
  );
}

