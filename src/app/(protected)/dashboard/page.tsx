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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <RecentTrades trades={trades} />
                </div>
            </div>
        </div>
    );
}
