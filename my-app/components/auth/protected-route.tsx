"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, getUserRole, requiresAuth, requiresAdmin, getRedirectPath } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin: needAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // If route requires authentication
      if (requiresAuth(pathname)) {
        if (!isAuthenticated()) {
          // Redirect to login with return URL
          const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
          return;
        }

        // Check if admin role is required
        if (needAdmin || requiresAdmin(pathname)) {
          const role = getUserRole();
          if (role !== 'admin') {
            // Redirect to dashboard if not admin
            router.push('/dashboard');
            return;
          }
        }
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname, needAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9ca3af]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

