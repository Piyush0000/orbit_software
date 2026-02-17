"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [expired, setExpired] = useState<string | null>(null);
  const [callback, setCallback] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setExpired(searchParams.get("expired"));
    setCallback(searchParams.get("callback"));
  }, []);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      // await loginAdmin(email, password);
      router.push(callback || "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          {expired && (
            <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
              Your session has expired. Please log in again.
            </p>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button onClick={submit} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
