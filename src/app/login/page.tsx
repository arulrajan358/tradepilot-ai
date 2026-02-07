import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md mb-8 flex justify-between items-center relative z-10">
                <Link href="/" className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </Link>
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo-icon.svg" alt="TradePilot Logo" width={32} height={32} />
                    <span className="font-bold text-xl text-white">TradePilot <span className="text-brand-blue">AI</span></span>
                </Link>
            </div>

            <div className="w-full relative z-10">
                <LoginForm />
            </div>
        </div>
    );
}
