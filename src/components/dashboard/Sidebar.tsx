"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, Brain, CreditCard, Settings, LogOut, Menu, Newspaper, PlusCircle, Link as LinkIcon, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analysis", href: "/analysis", icon: TrendingUp },
    { name: "Trades", href: "/trades", icon: BookOpen },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Connect Broker", href: "/connect-broker", icon: LinkIcon },
    { name: "AI Insights", href: "/ai-insights", icon: Brain },
    { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
            if (window.innerWidth < 1024) setIsOpen(false);
            else setIsOpen(true);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-slate rounded-md text-white border border-slate-700"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 bg-brand-navy border-r border-slate-800 flex flex-col transition-all duration-300",
                    isOpen ? "w-64" : "w-20 -translate-x-full lg:translate-x-0 lg:w-20"
                )}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    {isOpen ? (
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <Image src="/logo-icon.svg" alt="Logo" width={24} height={24} />
                            <span className="font-bold text-lg text-white">TradePilot</span>
                        </Link>
                    ) : (
                        <Image src="/logo-icon.svg" alt="Logo" width={24} height={24} />
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                                    isActive ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute left-0 w-1 h-full bg-brand-blue rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}
                                <item.icon size={20} />
                                {isOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="font-medium"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* User / Logout */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => {
                            localStorage.removeItem("user");
                            // Force a hard redirect to ensure state is cleared if using context, 
                            // but for now router push is fine or window.location.href
                            window.location.href = "/login";
                        }}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors",
                            !isOpen && "justify-center"
                        )}>
                        <LogOut size={20} />
                        {isOpen && <span>Logout</span>}
                    </button>
                </div>

            </aside>

            {/* Overlay for Mobile */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
