"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: (e.target as any)[0].value,
                    password: (e.target as any)[1].value
                }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            alert("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-brand-slate/50 backdrop-blur-sm border-slate-700">
            <div className="text-center mb-8">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-2"
                >
                    Welcome Back
                </motion.h2>
                <p className="text-slate-400">Sign in to continue your trading journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        required
                        icon={<Mail className="text-slate-400" size={18} />}
                    />
                </div>

                <div>
                    <Input
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        required
                        icon={<Lock className="text-slate-400" size={18} />}
                    />
                    <div className="flex justify-end mt-1">
                        <Link href="/forgot-password" className="text-xs text-brand-blue hover:text-blue-400">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full relative overflow-hidden group"
                    isLoading={isLoading}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-brand-blue font-medium hover:text-blue-400 hover:underline">
                    Sign up
                </Link>
            </div>
        </Card>
    );
}
