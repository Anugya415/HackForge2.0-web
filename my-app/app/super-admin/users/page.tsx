import { AdminUsersContent } from "@/components/admin/admin-users";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "All Users - Super Admin",
  description: "Manage all platform users",
};

export default function SuperAdminUsersPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminUsersContent />
      </main>
    </div>
  );
}

