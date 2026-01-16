import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ResumeContent } from "@/components/dashboard/resume-manager";

export const metadata = {
  title: "My Resume - Dashboard | GROEI",
  description: "Manage your resume",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <ResumeContent />
      </main>
    </div>
  );
}

