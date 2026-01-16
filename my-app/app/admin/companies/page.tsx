import { AdminCompaniesContent } from "@/components/admin/admin-companies";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Company Management - Admin Dashboard",
  description: "Manage all companies",
};

export default function AdminCompaniesPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminCompaniesContent />
      </main>
    </div>
  );
}
