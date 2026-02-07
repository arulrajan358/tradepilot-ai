"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Activity, Percent } from "lucide-react";
import { Card } from "@/components/ui/Card";

const stats = [
    {
        title: "Total Profit",
        value: "$12,450",
        change: "+15.3%",
        isPositive: true,
        icon: DollarSign,
        color: "text-brand-blue",
    },
    {
        title: "Win Rate",
        value: "68%",
        change: "+2.1%",
        isPositive: true,
        icon: Percent,
        color: "text-status-profit",
    },
    {
        title: "Profit Factor",
        value: "2.4",
        change: "-0.5",
        isPositive: false,
        icon: Activity,
        color: "text-brand-purple",
    },
    {
        title: "Active Trades",
        value: "3",
        change: "Neutral",
        isPositive: true,
        icon: TrendingUp,
        color: "text-status-warning",
    },
];

export default function StatsCards({ stats }: { stats?: any }) {
    const displayStats = [
        {
            title: "Total Profit",
            value: stats?.totalProfit ? `$${stats.totalProfit.toLocaleString()}` : "$0",
            change: "+15.3%", // Static for now as per MVP
            isPositive: stats?.totalProfit >= 0,
            icon: DollarSign,
            color: "text-brand-blue",
        },
        {
            title: "Win Rate",
            value: stats?.winRate ? `${stats.winRate}%` : "0%",
            change: "+2.1%",
            isPositive: true,
            icon: Percent,
            color: "text-status-profit",
        },
        {
            title: "Total Trades",
            value: stats?.totalTrades || "0",
            change: "+5",
            isPositive: true,
            icon: Activity,
            color: "text-brand-purple",
        },
        {
            title: "Profit Factor", // Placeholder or calculate if possible
            value: "2.4",
            change: "Neutral",
            isPositive: true,
            icon: TrendingUp,
            color: "text-status-warning",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStats.map((stat, index) => (
                <Card key={index} hoverEffect className="relative overflow-hidden">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
