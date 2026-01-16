import { SuperAdminActivityContent } from "@/components/admin/super-admin-activity";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "Activity Logs - Super Admin",
  description: "View platform activity logs",
};

export default function SuperAdminActivityPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <SuperAdminActivityContent />
      </main>
    </div>
  );
}

