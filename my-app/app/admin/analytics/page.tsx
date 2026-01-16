import { AdminAnalyticsContent } from "@/components/admin/admin-analytics";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Analytics - Admin Dashboard",
  description: "Platform analytics and insights",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <AdminAnalyticsContent />
      </main>
    </div>
  );
}
