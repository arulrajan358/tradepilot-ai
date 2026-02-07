"use client";
import { useEffect, useState } from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import EquityChart from "@/components/dashboard/EquityChart";
import RecentTrades from "@/components/dashboard/RecentTrades";
import AIInsights from "@/components/dashboard/AIInsights";

export default function DashboardPage() {
    const [trades, setTrades] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);
    const [stats, setStats] = useState({
        winRate: 0,
        totalTrades: 0,
        totalProfit: 0,
    });

    useEffect(() => {
        // Fetch News
        fetch("/api/news/forex-factory")
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error("Failed to fetch news", err));

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
                {/* High Impact News Widget */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            High Impact News
                        </h3>
                        <span className="text-xs text-slate-500">Forex Factory</span>
                    </div>

                    <div className="space-y-4">
                        {news.length > 0 ? (
                            news.map((item, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-800 text-slate-200`}>
                                            {item.country}
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-medium line-clamp-1">{item.title}</div>
                                            <div className="text-xs text-slate-500">
                                                {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-mono text-slate-300">{item.forecast || "-"}</div>
                                        <div className="text-[10px] text-slate-500 uppercase">Fcst</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-slate-500 text-sm py-4">Loading news...</div>
                        )}
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
