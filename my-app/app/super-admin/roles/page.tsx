import { SuperAdminRolesContent } from "@/components/admin/super-admin-roles";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "Roles & Permissions - Super Admin",
  description: "Manage user roles and permissions",
};

export default function SuperAdminRolesPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <SuperAdminRolesContent />
      </main>
    </div>
  );
}

