"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAdminMe } from "@/lib/admin-api";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      if (pathname === "/login") {
        setLoading(false);
        return;
      }

      try {
        await getAdminMe();
        if (isMounted) {
          setAuthenticated(true);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          router.push("/login?callback=" + encodeURIComponent(pathname));
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (loading && pathname !== "/login") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
