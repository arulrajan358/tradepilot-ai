"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { BookOpen, Filter, Search } from "lucide-react";

export default function JournalPage() {
    const [trades] = useState([
        { id: 1, pair: "EURUSD", type: "Buy", entry: 1.0850, exit: 1.0890, result: 400, status: "Win", date: "2024-02-15" },
        { id: 2, pair: "GBPUSD", type: "Sell", entry: 1.2640, exit: 1.2660, result: -200, status: "Loss", date: "2024-02-14" },
        { id: 3, pair: "XAUUSD", type: "Buy", entry: 2020.50, exit: 2025.00, result: 450, status: "Win", date: "2024-02-14" },
        { id: 4, pair: "USUJPY", type: "Sell", entry: 149.80, exit: 150.10, result: -300, status: "Loss", date: "2024-02-13" },
    ]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="text-brand-blue" />
                    Trade Journal
                </h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search pair..."
                            className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                        />
                    </div>
                    <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">
                        <Filter size={20} />
                    </button>
                    <button className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-bold hover:bg-brand-blue/90">
                        + Manual Entry
                    </button>
                </div>
            </div>

            <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-800">
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Pair</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Entry</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Exit</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Result</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Review</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {trades.map((trade) => (
                                <tr key={trade.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-sm text-slate-300">{trade.date}</td>
                                    <td className="p-4 text-sm font-bold text-white">{trade.pair}</td>
                                    <td className="p-4 text-sm">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${trade.type === 'Buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {trade.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-300 font-mono">{trade.entry}</td>
                                    <td className="p-4 text-sm text-slate-300 font-mono">{trade.exit}</td>
                                    <td className={`p-4 text-sm font-bold font-mono ${trade.result >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {trade.result >= 0 ? '+' : ''}${Math.abs(trade.result)}
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trade.status === 'Win' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-xs text-brand-blue hover:underline">Analyze</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
