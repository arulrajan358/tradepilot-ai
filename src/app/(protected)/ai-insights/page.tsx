"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, Activity, AlertCircle, CheckCircle, Smartphone } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function AIInsightsPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [pnlData, setPnlData] = useState<any[]>([]);
    const [winLossData, setWinLossData] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [monitoredTrades, setMonitoredTrades] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
        // Poll every 10 seconds for live updates
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = () => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            setError("Please login to see insights.");
            setLoading(false);
            return;
        }
        const user = JSON.parse(userStr);

        // Fetch from new MONITOR API
        fetch(`/api/trades/monitor?userId=${user.id}`)
            .then((res) => res.json())
            .then((trades) => {
                if (!Array.isArray(trades)) {
                    // If error or empty
                    setLoading(false);
                    return;
                }

                if (trades.length === 0) {
                    setError("Add trades to generate AI insights.");
                    setLoading(false);
                    return;
                }

                setMonitoredTrades(trades);
                processData(trades);
                setLoading(false);
                setError("");
            })
            .catch(() => {
                setError("Failed to load insights.");
                setLoading(false);
            });
    };

    const processData = (trades: any[]) => {
        let totalWins = 0;
        let totalLosses = 0;
        let grossProfit = 0;
        let grossLoss = 0;
        let runningPnl = 0;
        const chartData: { name: string; pnl: number; result: number }[] = [];

        // Sort trades by date if available, or just index
        // Trades come ordered by created_at desc from API, reverse for chart
        const sortedForChart = [...trades].reverse();

        sortedForChart.forEach((t, index) => {
            // For PnL calculation, we might want 'realized' pnl, but for now we use the computed profit_percent approx
            // Assuming 1000 margin for simplicity to show $ values, or just use % sums
            // Better: If we have PnL stored, use it. If not, calc virtual PnL.
            // MVP: Use profit_percent as "points"

            const result = parseFloat(t.profit_percent);
            runningPnl += result;

            if (result > 0) {
                totalWins++;
                grossProfit += result;
            } else {
                totalLosses++;
                grossLoss += Math.abs(result);
            }

            chartData.push({
                name: `Trade ${index + 1}`,
                pnl: runningPnl,
                result: result
            });
        });

        const totalTrades = trades.length;
        const winRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0;
        const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit;
        const netPnl = grossProfit - grossLoss;

        setStats({
            winRate: winRate.toFixed(1),
            profitFactor: profitFactor.toFixed(2),
            netPnl: netPnl.toFixed(2) + "%", // Showing as % for now
            totalTrades,
        });

        setPnlData(chartData);

        setWinLossData([
            { name: "Wins", value: totalWins },
            { name: "Losses", value: totalLosses },
        ]);

        generateRecommendations(winRate, profitFactor, totalTrades, trades);
    };

    const generateRecommendations = (winRate: number, pf: number, count: number, trades: any[]) => {
        const ideas = [];

        // General advice
        if (count < 5) ideas.push("Not enough data. Log more trades to get accurate AI insights.");
        else if (winRate < 40 && pf < 1) ideas.push("Your win rate is low. Review your entry strategy and wait for higher quality setups.");

        // Trade specific insights
        trades.forEach(t => {
            const p = parseFloat(t.profit_percent);
            if (p >= 25) ideas.push(`Trade ${t.pair}: Strong profit zone (+${p}%). Consider moving Stop Loss to Break Even.`);
            else if (p >= 50) ideas.push(`Trade ${t.pair}: Excellent run (+${p}%). Consider partial profit booking.`);
            else if (p <= -20) ideas.push(`Trade ${t.pair}: Approaching risk zone (${p}%). Check your invalidation level.`);
        });

        setRecommendations(ideas);
    };

    if (loading) return <div className="text-white p-6">Analyzing trading data...</div>;

    return (
        <div className="space-y-6 pb-10">
            <h1 className="text-2xl font-bold text-white mb-4">AI Trading Insights</h1>

            {error ? (
                <div className="text-red-400 p-4 border border-red-500/20 rounded bg-red-500/10">{error}</div>
            ) : (
                <>
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="bg-slate-900 border-slate-800 p-4">
                            <div className="text-slate-400 text-sm mb-1">Net P&L (Est.)</div>
                            <div className={`text-2xl font-bold ${parseFloat(stats?.netPnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stats?.netPnl}
                            </div>
                        </Card>
                        <Card className="bg-slate-900 border-slate-800 p-4">
                            <div className="text-slate-400 text-sm mb-1">Win Rate</div>
                            <div className="text-2xl font-bold text-white">{stats?.winRate}%</div>
                        </Card>
                        <Card className="bg-slate-900 border-slate-800 p-4">
                            <div className="text-slate-400 text-sm mb-1">Profit Factor</div>
                            <div className="text-2xl font-bold text-white">{stats?.profitFactor}</div>
                        </Card>
                        <Card className="bg-slate-900 border-slate-800 p-4">
                            <div className="text-slate-400 text-sm mb-1">Total Trades</div>
                            <div className="text-2xl font-bold text-white">{stats?.totalTrades}</div>
                        </Card>
                    </div>

                    {/* AI Recommendations */}
                    <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30 p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">🤖</span> AI Recommendations
                        </h3>
                        <div className="space-y-3">
                            {recommendations.length > 0 ? (
                                recommendations.slice(0, 5).map((rec, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                        <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={18} />
                                        <p className="text-slate-200 text-sm leading-relaxed">{rec}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center gap-3 text-slate-400">
                                    <AlertCircle size={18} />
                                    No active recommendations.
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Live Trade Monitor */}
                    <h2 className="text-xl font-bold text-white mt-8 mb-4">Live Trade Monitor</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {monitoredTrades.map((trade, i) => (
                            <Card key={i} className="bg-slate-900 border-slate-800 p-5 hover:border-brand-blue/30 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{trade.pair}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${parseFloat(trade.profit_percent) >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {parseFloat(trade.profit_percent) >= 0 ? 'PROFIT' : 'LOSS'}
                                        </span>
                                    </div>
                                    <div className={`text-xl font-bold ${parseFloat(trade.profit_percent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {trade.profit_percent}%
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm text-slate-400 mb-2">
                                    <span>Entry</span>
                                    <span className="text-white">${trade.entry_price}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Current</span>
                                    <span className="text-white font-mono">${trade.current_price?.toFixed(2)}</span>
                                </div>

                                {/* Status Bar */}
                                <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${parseFloat(trade.profit_percent) >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                        style={{ width: `${Math.min(Math.abs(parseFloat(trade.profit_percent)), 100)}%` }}
                                    ></div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Charts */}
                        <Card className="bg-slate-900 border-slate-800 p-4 h-[300px]">
                            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                                <Activity size={18} className="text-brand-blue" /> Cumulative P&L (%)
                            </h3>
                            <ResponsiveContainer width="100%" height="80%">
                                <LineChart data={pnlData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="name" hide />
                                    <YAxis stroke="#475569" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="pnl" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800 p-4 h-[300px]">
                            <h3 className="text-white font-medium mb-4">Win / Loss Ratio</h3>
                            <ResponsiveContainer width="100%" height="80%">
                                <PieChart>
                                    <Pie
                                        data={winLossData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell key="cell-0" fill="#22c55e" />
                                        <Cell key="cell-1" fill="#ef4444" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
