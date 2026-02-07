"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as any;
        const name = form[0].value;
        const email = form[1].value;
        const password = form[2].value;
        const confirmPassword = form[3].value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful! Please login.");
                router.push("/login");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            alert("An error occurred during registration");
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
                    Create Account
                </motion.h2>
                <p className="text-slate-400">Start your AI-powered trading journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                />

                <Input
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    required
                />

                <Input
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    required
                />

                <Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    required
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full relative overflow-hidden group"
                        isLoading={isLoading}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-blue font-medium hover:text-blue-400 hover:underline">
                    Sign in
                </Link>
            </div>
        </Card>
    );
}
