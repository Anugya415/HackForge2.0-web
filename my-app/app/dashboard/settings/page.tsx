import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SettingsContent } from "@/components/settings";

export const metadata = {
  title: "Settings - Dashboard | GROEI",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <SettingsContent />
      </main>
    </div>
  );
}

