"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Format title from pathname
    const getTitle = () => {
        const segments = (pathname || '').split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        if (!lastSegment) return "Dashboard";
        return lastSegment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="flex bg-brand-navy min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
                <Header title={getTitle()} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
