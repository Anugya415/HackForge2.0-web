import { AdminApplicationsContent } from "@/components/admin/admin-applications";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Application Management - Admin Dashboard",
  description: "Manage all job applications",
};

export default function AdminApplicationsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminApplicationsContent />
      </main>
    </div>
  );
}
