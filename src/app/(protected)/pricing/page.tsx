"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Zap } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Upgrade Your Trading</h2>
                <p className="text-slate-400">Unlock advanced AI insights and unlimited trade logging.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current Plan */}
                <Card className="p-8 border-slate-700 bg-brand-slate opacity-75">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Free Starter</h3>
                            <div className="text-sm text-slate-400">Current Plan</div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-medium">Active</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-slate-300">
                        <li className="flex items-center gap-3"><Check size={16} className="text-slate-500" /> Log up to 100 trades</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-slate-500" /> Basic Stats</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-slate-500" /> Community Support</li>
                    </ul>
                    <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                </Card>

                {/* Pro Plan */}
                <Card className="p-8 border-brand-blue shadow-lg shadow-brand-blue/10 bg-brand-slate relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Pro Trader</h3>
                            <div className="text-sm text-brand-blue">Unlock AI Powers</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-6">$29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-white">
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Unlimited Trades</li>
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Advanced AI Pattern Recognition</li>
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Risk Analysis Engine</li>
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Priority Support</li>
                    </ul>
                    <Button variant="primary" className="w-full text-lg h-12">Upgrade to Pro</Button>
                    <p className="text-center text-xs text-slate-500 mt-4">7-day money-back guarantee. Cancel anytime.</p>
                </Card>
            </div>
        </div>
    );
}
