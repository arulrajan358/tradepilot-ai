"use client";

import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, Minus, Gauge } from "lucide-react";

export default function MarketSentiment() {
    const sentiments = [
        {
            pair: "EUR/USD",
            sentiment: "Bullish",
            value: 72,
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-500",
        },
        {
            pair: "XAU/USD",
            sentiment: "Neutral",
            value: 48,
            icon: Minus,
            color: "text-orange-500",
            bg: "bg-orange-500",
        },
        {
            pair: "BTC/USDT",
            sentiment: "Bearish",
            value: 26,
            icon: TrendingDown,
            color: "text-red-500",
            bg: "bg-red-500",
        }
    ];

    return (
        <Card className="bg-slate-900 border border-slate-800 p-5 h-full">
            <div className="flex items-center gap-2 mb-4">
                <Gauge className="text-brand-purple" size={18} />
                <h3 className="font-bold text-white text-md">Market Sentiment</h3>
            </div>

            <div className="space-y-4">
                {sentiments.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded bg-slate-800 ${item.color}`}>
                                <item.icon size={16} />
                            </div>
                            <span className="font-bold text-slate-200 text-sm">{item.pair}</span>
                        </div>

                        <div className="text-right">
                            <div className={`text-xs font-bold ${item.color} uppercase tracking-wider`}>
                                {item.sentiment}
                            </div>
                            <div className="w-16 h-1 bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${item.bg}`}
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 text-center">
                    Based on technical indicators & order flow
                </p>
            </div>
        </Card>
    );
}
