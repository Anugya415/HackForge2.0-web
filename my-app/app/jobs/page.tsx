"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FindJobsContent } from "@/components/find-jobs";

export default function JobsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-[#9ca3af]">Loading...</div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex bg-[#0a0a0f]">
        <DashboardSidebar />
        <main className="flex-1 lg:ml-64">
          <div className="pt-16 lg:pt-8">
            <FindJobsContent />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <FindJobsContent />
      </main>
      <Footer />
    </div>
  );
}


