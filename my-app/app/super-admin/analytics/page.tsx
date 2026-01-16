import { AdminAnalyticsContent } from "@/components/admin/admin-analytics";
import { SuperAdminSidebar } from "@/components/admin/super-admin-sidebar";

export const metadata = {
  title: "Analytics - Super Admin",
  description: "Platform-wide analytics",
};

export default function SuperAdminAnalyticsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <SuperAdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminAnalyticsContent />
      </main>
    </div>
  );
}

