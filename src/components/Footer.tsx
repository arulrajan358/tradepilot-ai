import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-brand-navy border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image src="/logo-icon.svg" alt="TradePilot Logo" width={24} height={24} />
                            <span className="font-bold text-lg text-white">TradePilot <span className="text-brand-blue">AI</span></span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your personal AI trading coach. Analyze markets, track performance, and grow your portfolio with intelligent insights.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#features" className="hover:text-brand-blue transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-brand-blue transition-colors">Pricing</Link></li>
                            <li><Link href="/dashboard" className="hover:text-brand-blue transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-brand-blue transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-blue transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} TradePilot AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
