import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SuggestionsContent } from "@/components/dashboard/suggestions";

export const metadata = {
  title: "Suggestions - Dashboard | GROEI",
  description: "Personalized job suggestions based on your profile",
};

export default function SuggestionsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <SuggestionsContent />
      </main>
    </div>
  );
}

