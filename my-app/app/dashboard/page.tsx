import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DashboardContent } from "@/components/dashboard";

export const metadata = {
  title: "Dashboard - GROEI",
  description: "Your personal dashboard",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <DashboardContent />
      </main>
      <Footer />
    </div>
  );
}
