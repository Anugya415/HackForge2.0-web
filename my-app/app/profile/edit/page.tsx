import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProfileContent } from "@/components/dashboard/profile-manager";

export const metadata = {
  title: "Edit Profile - GROEI",
  description: "Edit your profile information",
};

export default function ProfileEditPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 bg-white dark:bg-slate-950">
        <ProfileContent />
      </main>
      <Footer />
    </div>
  );
}
