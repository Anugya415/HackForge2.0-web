import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FindJobsContent } from "@/components/find-jobs";

export const metadata = {
  title: "Find Jobs - GROEI",
  description: "Discover thousands of job opportunities matched to your skills and preferences",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <FindJobsContent />
      </main>
      <Footer />
    </div>
  );
}

