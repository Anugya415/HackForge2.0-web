"use client";

import { DashboardContent } from "@/components/dashboard/dashboard";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">
        <DashboardContent />
      </main>
    </div>
  );
}
