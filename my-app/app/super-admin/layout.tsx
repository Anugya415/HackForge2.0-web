import { ProtectedRoute } from "@/components/auth/protected-route";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute requireAdmin>{children}</ProtectedRoute>;
}


