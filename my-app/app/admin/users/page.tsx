import { AdminUsersContent } from "@/components/admin/admin-users";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "User Management - Admin Dashboard",
  description: "Manage all users and applicants",
};

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminUsersContent />
      </main>
    </div>
  );
}
