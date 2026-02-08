"use client";

import { Check, Star, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            price: "$0",
            period: "/month",
            description: "Essential tools for beginner traders.",
            features: [
                "Basic Dashboard",
                "Trade Journal (Manual)",
                "Market News",
                "Limited Analysis"
            ],
            icon: Shield,
            color: "text-slate-400",
            btnVariant: "outline"
        },
        {
            name: "Pro",
            price: "$29",
            period: "/month",
            description: "Advanced analytics for serious traders.",
            features: [
                "AI Trade Coach",
                "Smart Risk Manager",
                "Prop Firm Dashboard",
                "Auto Trade Sync",
                "Advanced Journal"
            ],
            icon: Zap,
            color: "text-brand-blue",
            recommended: true,
            btnVariant: "primary"
        },
        {
            name: "Elite",
            price: "$49",
            period: "/month",
            description: "Full AI power for max profitability.",
            features: [
                "Everything in Pro",
                "AI Trade Predictions",
                "Liquidity Heatmaps",
                "Real-time Volatility Alerts",
                "Priority Support"
            ],
            icon: Star,
            color: "text-brand-purple",
            btnVariant: "outline"
        }
    ];

    return (
        <div className="py-12 bg-brand-navy min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Upload Your Trading Game</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Choose the plan that fits your trading journey. Unlock AI insights and professional risk management tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <Card key={i} className={`relative p-8 bg-slate-900 border ${plan.recommended ? 'border-brand-blue shadow-lg shadow-brand-blue/10 scale-105 z-10' : 'border-slate-800'}`}>
                            {plan.recommended && (
                                <div className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg bg-slate-800 ${plan.color}`}>
                                    <plan.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-slate-500">{plan.period}</span>
                            </div>

                            <p className="text-slate-400 text-sm mb-8 min-h-[40px]">{plan.description}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full ${plan.btnVariant === 'primary' ? 'bg-brand-blue hover:bg-brand-blue/90 text-white' : 'bg-transparent border border-slate-700 hover:border-slate-500 text-white'}`}
                            >
                                Get Started
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
