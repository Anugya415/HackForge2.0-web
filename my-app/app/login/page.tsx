"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoginContent } from "@/components/auth/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <LoginContent />
      </main>
      <Footer />
    </div>
  );
}

