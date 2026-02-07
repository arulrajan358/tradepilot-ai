"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/Card";



export default function EquityChart({ trades }: { trades?: any[] }) {
    // Process trades to generate equity curve
    const startBalance = 10000;
    let currentEquity = startBalance;

    // Default data if no trades
    let chartData = [
        { name: "Start", equity: startBalance }
    ];

    if (trades && trades.length > 0) {
        // Ensure trades are sorted by date (oldest first)
        const sortedTrades = [...trades].sort((a, b) => a.id - b.id);

        // Calculate cumulative equity
        const tradePoints = sortedTrades.map((trade, index) => {
            currentEquity += Number(trade.result);
            return {
                name: `Trade ${index + 1}`,
                equity: currentEquity
            };
        });

        chartData = [{ name: "Start", equity: startBalance }, ...tradePoints];
    }

    return (
        <Card className="col-span-1 lg:col-span-2 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Equity Curve</h3>
                <div className="text-sm text-slate-400">
                    Base Balance: <span className="text-white font-mono">$10,000</span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }}
                            itemStyle={{ color: '#3B82F6' }}
                            formatter={(value: number | undefined) => [
                                value !== undefined ? `$${value.toLocaleString()}` : "$0",
                                "Equity"
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="equity"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorEquity)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
