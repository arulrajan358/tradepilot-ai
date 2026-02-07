"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Zap } from "lucide-react";
import PaymentModal from "@/components/payment/PaymentModal";

export default function PricingPage() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Upgrade Your Trading</h2>
                <p className="text-slate-400">Unlock advanced AI insights and unlimited trade logging.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Current Plan */}
                {/* Free Starter */}
                <Card className="p-8 border-slate-700 bg-brand-slate opacity-75 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Starter</h3>
                            <div className="text-sm text-slate-400">Basic Access</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                        <li className="flex items-center gap-3"><Check size={16} className="text-slate-500" /> Log up to 100 trades</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-slate-500" /> Basic Stats</li>
                    </ul>
                    <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                </Card>

                {/* Pro Plan */}
                <Card className="p-8 border-brand-blue shadow-lg shadow-brand-blue/10 bg-brand-slate relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Pro Trader</h3>
                            <div className="text-sm text-brand-blue">Unlock AI Powers</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-6">$29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-white flex-1">
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Unlimited Trades</li>
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> AI Pattern Recognition</li>
                        <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Risk Analysis Engine</li>
                    </ul>
                    <Button variant="primary" className="w-full" onClick={() => setShowPaymentModal(true)}>Upgrade to Pro</Button>
                </Card>

                {/* Elite Plan */}
                <Card className="p-8 border-purple-500/30 bg-brand-slate relative overflow-hidden flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Elite</h3>
                            <div className="text-sm text-purple-400">Full Professional Suite</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-6">$99<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                        <li className="flex items-center gap-3"><Check size={16} className="text-purple-400" /> Everything in Pro</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-purple-400" /> 1-on-1 Strategy Calls</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-purple-400" /> Private Discord Access</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-purple-400" /> API Access</li>
                    </ul>
                    <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10" onClick={() => setShowPaymentModal(true)}>Get Elite</Button>
                </Card>

                {/* Lifetime Plan */}
                <Card className="p-8 border-amber-500/30 bg-brand-slate relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white">Lifetime</h3>
                            <div className="text-sm text-amber-400">One-time Payment</div>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-6">$499<span className="text-lg text-slate-500 font-normal">/once</span></div>
                    <ul className="space-y-4 mb-8 text-slate-300 flex-1">
                        <li className="flex items-center gap-3"><Check size={16} className="text-amber-400" /> Lifetime Access to Elite</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-amber-400" /> All Future Updates</li>
                        <li className="flex items-center gap-3"><Check size={16} className="text-amber-400" /> Priority Support</li>
                    </ul>
                    <Button variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 border-none text-white hover:opacity-90" onClick={() => setShowPaymentModal(true)}>Buy Lifetime</Button>
                </Card>
            </div>

            <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
        </div>
    );
}
