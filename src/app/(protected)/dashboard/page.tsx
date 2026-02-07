"use client";
import { useEffect, useState } from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import EquityChart from "@/components/dashboard/EquityChart";
import RecentTrades from "@/components/dashboard/RecentTrades";
import AIInsights from "@/components/dashboard/AIInsights";

export default function DashboardPage() {
    const [trades, setTrades] = useState<any[]>([]);
    const [stats, setStats] = useState({
        winRate: 0,
        totalTrades: 0,
        totalProfit: 0,
    });

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;

        const user = JSON.parse(userStr);

        fetch(`/api/trades/list?userId=${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setTrades(data.reverse()); // Show newest first
                    calculateStats(data);
                }
            })
            .catch(err => console.error("Failed to fetch trades", err));
    }, []);

    const calculateStats = (trades: any[]) => {
        const totalTrades = trades.length;
        const wins = trades.filter((t) => t.result > 0).length;
        const totalProfit = trades.reduce(
            (sum, t) => sum + Number(t.result),
            0
        );

        const winRate =
            totalTrades > 0
                ? ((wins / totalTrades) * 100).toFixed(1)
                : 0;

        setStats({
            winRate: Number(winRate),
            totalTrades,
            totalProfit,
        });
    };

    return (
        <div className="space-y-6">
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <EquityChart />
                <AIInsights trades={trades} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Market Sentiment Widget */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Market Sentiment</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">EUR/USD</span>
                        <span className="text-green-500 font-bold">Bullish (65%)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">BTC/USD</span>
                        <span className="text-red-500 font-bold">Bearish (40%)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-3 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 rounded-lg text-brand-blue font-medium text-sm transition-colors text-center">
                            + Log Trade
                        </button>
                        <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 font-medium text-sm transition-colors text-center">
                            New Journal
                        </button>
                        <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 font-medium text-sm transition-colors text-center">
                            Set Alert
                        </button>
                        <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 font-medium text-sm transition-colors text-center">
                            Calculator
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <RecentTrades trades={trades} />
                </div>
            </div>
        </div>
    );
}
