
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold tracking-tight">Welcome Back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to your account
                    </p>
                </div>

                <div className="space-y-6 bg-card p-8 rounded-xl border shadow-sm">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                        <Input id="email" placeholder="m@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                        <Input id="password" type="password" />
                    </div>

                    <Button className="w-full py-6 text-lg">Sign In</Button>

                    <div className="text-center text-sm">
                        <Link href="#" className="underline underline-offset-4 hover:text-primary">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
