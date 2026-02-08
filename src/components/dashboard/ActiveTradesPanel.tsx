"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

export default function ActiveTradesPanel() {
    const [trades, setTrades] = useState<any[]>([]);

    useEffect(() => {
        const fetchTrades = () => {
            const userStr = localStorage.getItem("user");
            if (!userStr) return;
            const user = JSON.parse(userStr);

            fetch(`/api/trades/monitor?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        // Filter for active trades only (if status logic existed, otherwise show all recent)
                        setTrades(data.slice(0, 5));
                    }
                })
                .catch(err => console.error(err));
        };

        fetchTrades();
        const interval = setInterval(fetchTrades, 5000); // Update every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl h-full flex flex-col">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <TrendingUp size={18} className="text-brand-blue" />
                    Active Trades
                </h3>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {trades.length > 0 ? (
                    trades.map((trade, i) => (
                        <div key={i} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-brand-blue/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-white text-sm">{trade.pair}</span>
                                <span className={`text-xs font-bold ${parseFloat(trade.profit_percent) >= 0 ? "text-green-400" : "text-red-400"}`}>
                                    {parseFloat(trade.profit_percent) > 0 ? "+" : ""}{trade.profit_percent}%
                                </span>
                            </div>

                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Entry</span>
                                <span className="text-slate-200">{trade.entry_price}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Current</span>
                                <span className="text-slate-200">{trade.current_price?.toFixed(2)}</span>
                            </div>

                            <div className="mt-2 text-[10px] uppercase font-bold tracking-wider text-right">
                                {parseFloat(trade.profit_percent) >= 0 ? (
                                    <span className="text-green-500">In Profit</span>
                                ) : (
                                    <span className="text-red-500">In Loss</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-500 text-sm">
                        No active trades
                    </div>
                )}
            </div>
        </div>
    );
}
