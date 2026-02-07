"use client";

import { Card } from "@/components/ui/Card";
import { BadgeCheck, XCircle } from "lucide-react";

const trades = [
    { id: 1, pair: "EUR/USD", type: "Long", entry: 1.0850, exit: 1.0920, profit: 700, status: "Win", date: "Today" },
    { id: 2, pair: "GBP/JPY", type: "Short", entry: 182.50, exit: 182.10, profit: 400, status: "Win", date: "Yesterday" },
    { id: 3, pair: "XAU/USD", type: "Long", entry: 1950.00, exit: 1945.00, profit: -500, status: "Loss", date: "Yesterday" },
    { id: 4, pair: "BTC/USD", type: "Long", entry: 35000, exit: 35500, profit: 500, status: "Win", date: "Oct 24" },
];

export default function RecentTrades({ trades }: { trades?: any[] }) {
    // Use passed trades or empty array
    const displayTrades = trades || [];

    return (
        <Card className="col-span-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Recent Trades</h3>
                <button className="text-sm text-brand-blue hover:text-blue-400">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-sm">
                            <th className="pb-3 font-medium">Pair</th>
                            <th className="pb-3 font-medium">Notes</th>
                            <th className="pb-3 font-medium text-right">Result</th>
                            <th className="pb-3 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {displayTrades.length === 0 ? (
                            <tr><td colSpan={4} className="py-4 text-center text-slate-500">No trades yet</td></tr>
                        ) : (
                            displayTrades.map((trade) => (
                                <tr key={trade.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-3 text-sm font-medium text-white">{trade.pair}</td>
                                    <td className="py-3 text-sm text-slate-400 truncate max-w-[200px]">{trade.notes}</td>
                                    <td className={`py-3 text-sm font-medium text-right ${trade.result >= 0 ? 'text-status-profit' : 'text-status-loss'}`}>
                                        {trade.result >= 0 ? '+' : ''}{trade.result}
                                    </td>
                                    <td className="py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {trade.result >= 0 ? (
                                                <BadgeCheck size={16} className="text-status-profit" />
                                            ) : (
                                                <XCircle size={16} className="text-status-loss" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
