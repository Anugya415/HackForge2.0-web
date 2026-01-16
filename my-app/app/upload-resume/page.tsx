import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { UploadResumeContent } from "@/components/features/upload-resume";

export const metadata = {
  title: "Upload Resume - GROEI",
  description: "Upload your resume and let AI parse your skills and experience",
};

export default function UploadResumePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <UploadResumeContent />
      </main>
      <Footer />
    </div>
  );
}
