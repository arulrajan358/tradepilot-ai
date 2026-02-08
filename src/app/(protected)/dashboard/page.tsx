"use client";
import { useEffect, useState } from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import AIInsights from "@/components/dashboard/AIInsights";
import LiveBitcoinPrice from "@/components/dashboard/LiveBitcoinPrice";
import BrokerConnectModal from "@/components/dashboard/BrokerConnectModal";
import TradingChart from "@/components/dashboard/TradingChart";
import ActiveTradesPanel from "@/components/dashboard/ActiveTradesPanel";
import MarketNewsWidget from "@/components/dashboard/MarketNewsWidget";
import MarketSentiment from "@/components/dashboard/MarketSentiment";

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
            {/* Top Stats */}
            <StatsCards stats={stats} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Column (Chart + AI) - 75% width on large screens */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    {/* Trading Chart */}
                    <div className="h-[500px] flex flex-col">
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

                    {/* AI Insights (Below Chart) */}
                    <div>
                        <AIInsights trades={trades} />
                    </div>
                </div>

                {/* Right Column (Widgets) - 25% width */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Live Price */}
                    <div className="h-[140px]">
                        <LiveBitcoinPrice />
                    </div>

                    {/* Active Trades */}
                    <div className="h-[300px]">
                        <ActiveTradesPanel />
                    </div>

                    {/* Market Sentiment (New) */}
                    <div className="flex-1 min-h-[200px]">
                        <MarketSentiment />
                    </div>
                </div>
            </div>

            {/* Bottom Full Width - Market News */}
            <div className="pt-4 border-t border-slate-800/50">
                <MarketNewsWidget />
            </div>

            {/* Quick Actions (Optional / Bottom) */}
            <div className="flex justify-end">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 inline-flex items-center gap-4">
                    <span className="text-sm text-slate-400 font-medium">Quick Actions:</span>
                    <BrokerConnectModal />
                    <button className="px-4 py-2 bg-brand-blue/10 hover:bg-brand-blue/20 rounded-lg text-brand-blue text-sm font-medium transition-colors">
                        + Log Trade
                    </button>
                </div>
            </div>
        </div>
    );
}
