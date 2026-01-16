import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FreelancersContent } from "@/components/freelancers";

export const metadata = {
  title: "Find Freelancers - GROEI",
  description: "Discover talented freelancers for your projects",
};

export default function FreelancersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <FreelancersContent />
      </main>
      <Footer />
    </div>
  );
}
