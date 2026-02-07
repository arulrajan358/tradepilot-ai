"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/Button";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-navy/80 backdrop-blur-md border-b border-slate-800" : "bg-transparent border-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo-icon.svg" alt="TradePilot Logo" width={32} height={32} />
                    <span className="font-bold text-xl tracking-tight text-white">TradePilot <span className="text-brand-blue">AI</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {["Features", "AI Preview", "Pricing"].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-slate-300 hover:text-white font-medium text-sm hidden sm:block">
                        Log In
                    </Link>
                    <Link href="/register">
                        <Button variant="primary" size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
