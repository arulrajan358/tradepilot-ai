"use client";

import { Card } from "@/components/ui/Card";
import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AIPremiumPage() {
    return (
        <div className="max-w-7xl mx-auto pb-10 min-h-[80vh] flex items-center justify-center">
            <div className="text-center max-w-2xl">
                <div className="inline-flex items-center justify-center p-4 bg-brand-purple/10 rounded-full mb-6">
                    <Sparkles size={48} className="text-brand-purple" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">AI Premium Features</h1>
                <p className="text-slate-400 text-lg mb-8">
                    Gain an unfair advantage with real-time predictive models, institutional bias indicators, and volatility alerts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
                    <Card className="bg-slate-900 border-slate-800 p-6 opacity-75 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
                            <Lock className="text-slate-500" size={32} />
                        </div>
                        <h3 className="font-bold text-white mb-2">Price Prediction</h3>
                        <p className="text-sm text-slate-500">Next hour candle projection with 84% accuracy.</p>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 p-6 opacity-75 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
                            <Lock className="text-slate-500" size={32} />
                        </div>
                        <h3 className="font-bold text-white mb-2">Institutional Bias</h3>
                        <p className="text-sm text-slate-500">Real-time COT data analysis.</p>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Link href="/pricing">
                        <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-3 text-lg h-auto">
                            Upgrade to Elite
                        </Button>
                    </Link>
                    <p className="text-sm text-slate-600">Start your 7-day free trial today.</p>
                </div>
            </div>
        </div>
    );
}
