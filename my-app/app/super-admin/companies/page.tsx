import { AdminCompaniesContent } from "@/components/admin/admin-companies";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "Companies - Super Admin",
  description: "Manage all companies",
};

export default function SuperAdminCompaniesPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminCompaniesContent />
      </main>
    </div>
  );
}

