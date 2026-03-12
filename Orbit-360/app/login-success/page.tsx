"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { IconLoader } from "@tabler/icons-react";

export default function LoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        
        // Save to localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        
        if (user.stores && user.stores.length > 0) {
          localStorage.setItem("active_store_id", user.stores[0].id);
        }

        toast.success(`Welcome back, ${user.fullName}!`);
        
        // Trigger a custom event or reload to update AuthContext if needed
        // But router.push("/") should be enough as AuthContext will re-init on mount
        window.location.href = "/";
      } catch (err) {
        console.error("Failed to parse user data from OAuth callback", err);
        toast.error("Login failed. Please try again.");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="flex flex-col items-center gap-4">
        <IconLoader className="size-10 animate-spin text-primary" />
        <p className="text-lg font-medium animate-pulse">Completing login...</p>
      </div>
    </div>
  );
}
