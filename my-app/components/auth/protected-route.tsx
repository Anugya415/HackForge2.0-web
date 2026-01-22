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
      try {
        // If route requires authentication
        if (requiresAuth(pathname)) {
          if (!isAuthenticated()) {
            // Prevent redirect loop - don't redirect if we're already on /login
            if (pathname !== '/login') {
              const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
              console.log(`[AUTH] Unauthorized access to ${pathname}, redirecting to login`);
              router.push(loginUrl);
            }
            return;
          }

          // Check if admin role is required
          if (needAdmin || requiresAdmin(pathname)) {
            const role = getUserRole();
            if (role !== 'admin') {
              console.log(`[AUTH] Non-admin access to ${pathname}, redirecting to dashboard`);
              router.push('/dashboard');
              return;
            }
          }
        }

        setIsAuthorized(true);
      } catch (err) {
        console.error("[AUTH] Error in ProtectedRoute:", err);
      } finally {
        setIsLoading(false);
      }
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


