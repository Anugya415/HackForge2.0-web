import { SuperAdminSettingsContent } from "@/components/admin/super-admin-settings";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "System Settings - Super Admin",
  description: "Configure system settings",
};

export default function SuperAdminSettingsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <SuperAdminSettingsContent />
      </main>
    </div>
  );
}

