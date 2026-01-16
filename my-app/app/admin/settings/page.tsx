import { AdminSettingsContent } from "@/components/admin/admin-settings";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Settings - Admin Dashboard",
  description: "Admin account settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminSettingsContent />
      </main>
    </div>
  );
}
