"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Download } from "lucide-react";

export default function TradeTable({ trades = [] }: { trades?: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTrades = trades.filter(trade =>
        trade.pair.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="border-slate-800">
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search pairs..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-blue"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter size={16} /> Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download size={16} /> Export
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-sm">
                        <tr>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Pair</th>
                            <th className="px-4 py-3 font-medium">Type</th>
                            <th className="px-4 py-3 font-medium text-right">Entry</th>
                            <th className="px-4 py-3 font-medium text-right">Exit</th>
                            <th className="px-4 py-3 font-medium text-right">Lot Size</th>
                            <th className="px-4 py-3 font-medium text-right">P/L ($)</th>
                            <th className="px-4 py-3 font-medium text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {filteredTrades.length === 0 ? (
                            <tr><td colSpan={8} className="text-center py-4 text-slate-500">No trades found</td></tr>
                        ) : (
                            filteredTrades.map((trade) => (
                                <tr key={trade.id} className="hover:bg-brand-slate/50 transition-colors">
                                    <td className="px-4 py-3 text-sm text-slate-300">{new Date(trade.createdAt || Date.now()).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-white">{trade.pair}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${trade.type === 'long'
                                                ? 'bg-green-500/10 text-green-500'
                                                : trade.type === 'short'
                                                    ? 'bg-red-500/10 text-red-500'
                                                    : 'bg-slate-800 text-slate-400'
                                            }`}>
                                            {trade.type ? trade.type.toUpperCase() : (trade.notes?.split('|')[0] || 'TRADE')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-right text-slate-300">
                                        {trade.entry ? trade.entry : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-right text-slate-300">
                                        {trade.exit ? trade.exit : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-right text-slate-300">-</td>
                                    <td className={`px-4 py-3 text-sm text-right font-medium ${trade.result >= 0 ? 'text-status-profit' : 'text-status-loss'}`}>
                                        {trade.result >= 0 ? '+' : ''}{trade.result}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-block w-2 h-2 rounded-full ${trade.result >= 0 ? 'bg-status-profit' : 'bg-status-loss'}`}></span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination is static for MVP */}
            <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                <span>Showing {filteredTrades.length} entries</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
                    <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800">Next</button>
                </div>
            </div>
        </Card>
    );
}
