import { AdminDashboardContent } from "@/components/admin/admin-dashboard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Admin Dashboard - GROEI",
  description: "Recruiter admin dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminDashboardContent />
      </main>
    </div>
  );
}
