"use client";
import { useEffect, useState } from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import AIInsights from "@/components/dashboard/AIInsights";
import LiveBitcoinPrice from "@/components/dashboard/LiveBitcoinPrice";
import BrokerConnectModal from "@/components/dashboard/BrokerConnectModal";
import TradingChart from "@/components/dashboard/TradingChart";
import ActiveTradesPanel from "@/components/dashboard/ActiveTradesPanel";
import MarketNewsWidget from "@/components/dashboard/MarketNewsWidget";

export default function DashboardPage() {
    const [trades, setTrades] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);
    const [stats, setStats] = useState({
        winRate: 0,
        totalTrades: 0,
        totalProfit: 0,
    });
    const [activeSymbol, setActiveSymbol] = useState("BINANCE:BTCUSDT");

    const pairs = [
        { name: "BTC/USDT", symbol: "BINANCE:BTCUSDT" },
        { name: "ETH/USDT", symbol: "BINANCE:ETHUSDT" },
        { name: "EUR/USD", symbol: "FX:EURUSD" },
        { name: "XAU/USD", symbol: "OANDA:XAUUSD" },
        { name: "GBP/USD", symbol: "FX:GBPUSD" },
        { name: "NDAQ100", symbol: "OANDA:NAS100USD" }
    ];

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
        <div className="space-y-6 pb-8">
            {/* Section 1: Account Overview */}
            <StatsCards stats={stats} />

            {/* Section 2: Main Trading Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[500px]">
                {/* Left: Chart (75%) */}
                <div className="lg:col-span-3 h-full flex flex-col">
                    {/* Chart Controls */}
                    <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 custom-scrollbar">
                        {pairs.map((pair) => (
                            <button
                                key={pair.symbol}
                                onClick={() => setActiveSymbol(pair.symbol)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeSymbol === pair.symbol
                                    ? "bg-brand-blue text-white"
                                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                                    }`}
                            >
                                {pair.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 min-h-0">
                        <TradingChart symbol={activeSymbol} />
                    </div>
                </div>
                {/* Right: Active Trades (25%) */}
                <div className="lg:col-span-1 h-full">
                    <ActiveTradesPanel />
                </div>
            </div>

            {/* Section 3: Insights & News */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Insights */}
                <div className="h-full">
                    <AIInsights trades={trades} />
                </div>

                {/* Market News */}
                <div className="h-full">
                    <MarketNewsWidget />
                </div>
            </div>

            {/* Quick Actions & Live Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <LiveBitcoinPrice />
                </div>
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                        <BrokerConnectModal />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
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
        </div>
    );
}
