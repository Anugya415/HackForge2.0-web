import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CompaniesContent } from "@/components/companies";

export const metadata = {
  title: "Companies - GROEI",
  description: "Explore top companies hiring on GROEI",
};

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <CompaniesContent />
      </main>
      <Footer />
    </div>
  );
}

