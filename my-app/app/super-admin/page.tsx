import { SuperAdminDashboardContent } from "@/components/admin/super-admin-dashboard";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "Super Admin Dashboard - GROEI",
  description: "Super admin platform management dashboard",
};

export default function SuperAdminDashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <SuperAdminDashboardContent />
      </main>
    </div>
  );
}

