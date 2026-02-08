import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header({ title = "Dashboard" }: { title?: string }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-brand-navy border-b border-slate-800 sticky top-0 z-20">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-white hidden md:block">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block w-64">
                    {/* Simple Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="relative text-slate-400 hover:text-white">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-brand-navy"></span>
                    </Button>
                </div>

                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-slate-800 focus:outline-none group"
                    >
                        <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm ring-2 ring-transparent group-hover:ring-brand-blue/50 transition-all">
                            {user ? user.name.charAt(0).toUpperCase() : "TP"}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-white group-hover:text-brand-blue transition-colors">
                                {user ? user.name : "Guest"}
                            </p>
                            <p className="text-xs text-slate-500">Pro Plan</p>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50 overflow-hidden"
                            >
                                <div className="p-2 space-y-1">
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User size={16} /> Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <Settings size={16} /> Settings
                                    </Link>
                                    <div className="h-px bg-slate-800 my-1"></div>
                                    <button
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors text-left"
                                        onClick={() => {
                                            alert("Logging out...");
                                            setIsProfileOpen(false);
                                        }}
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
