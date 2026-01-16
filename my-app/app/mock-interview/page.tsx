import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MockInterviewContent } from "@/components/mock-interview";

export const metadata = {
  title: "Mock Interview - GROEI",
  description: "Practice with AI-powered mock interviews",
};

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <MockInterviewContent />
      </main>
      <Footer />
    </div>
  );
}
