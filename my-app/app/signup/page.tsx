import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SignupContent } from "@/components/auth/signup";

export const metadata = {
  title: "Sign Up - GROEI",
  description: "Create your GROEI account and start your career journey",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <SignupContent />
      </main>
      <Footer />
    </div>
  );
}

