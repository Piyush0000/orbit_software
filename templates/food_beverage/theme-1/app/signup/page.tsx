"use client"

import Link from "next/link"
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50/50 px-4 py-20">
            <Card className="w-full max-w-md border-zinc-200 shadow-2xl overflow-hidden bg-white">
                <CardHeader className="space-y-2 pb-10 text-center bg-zinc-900 text-white p-10">
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter">Join Us</CardTitle>
                    <CardDescription className="text-zinc-400 font-medium">
                        Create your Provision & Co. account today
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 pt-10 px-10 pb-10">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    type="text"
                                    className="pl-10 h-14 bg-zinc-50 border-zinc-200 focus:ring-primary text-base"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    className="pl-10 h-14 bg-zinc-50 border-zinc-200 focus:ring-primary text-base"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-zinc-500">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-14 bg-zinc-50 border-zinc-200 focus:ring-primary text-base"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-2 pt-2">
                            <Checkbox id="terms" className="mt-1" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-tight text-zinc-600"
                            >
                                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                            </label>
                        </div>
                    </div>

                    <Button className="w-full h-14 text-base font-black uppercase tracking-widest group rounded-none">
                        Create Account
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">Or sign up with</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full h-14 border-zinc-200 hover:bg-zinc-50 transition-colors text-base font-bold">
                        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-6 pb-12 px-10 text-center pt-8 border-t border-zinc-100">
                    <div className="flex items-center justify-center gap-2 text-zinc-400 bg-zinc-50 py-2 px-4 rounded-full w-fit mx-auto">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Security</span>
                    </div>
                    <p className="text-sm font-bold text-zinc-900 border-t border-zinc-100 pt-6 w-full">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline underline-offset-4 ml-1">
                            Log in instead
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
