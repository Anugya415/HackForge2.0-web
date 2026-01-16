import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ProfileContent } from "@/components/dashboard/profile-manager";

export const metadata = {
  title: "Profile - Dashboard | GROEI",
  description: "Manage your profile",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <ProfileContent />
      </main>
    </div>
  );
}

