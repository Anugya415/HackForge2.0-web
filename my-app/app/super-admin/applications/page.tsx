import { AdminApplicationsContent } from "@/components/admin/admin-applications";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "Applications - Super Admin",
  description: "Manage all applications",
};

export default function SuperAdminApplicationsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminApplicationsContent />
      </main>
    </div>
  );
}

