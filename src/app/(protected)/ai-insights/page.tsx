"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, Activity, AlertCircle, CheckCircle } from "lucide-react";
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
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            setError("Please login to see insights.");
            setLoading(false);
            return;
        }
        const user = JSON.parse(userStr);

        fetch(`/api/trades/list?userId=${user.id}`)
            .then((res) => res.json())
            .then((trades) => {
                if (!Array.isArray(trades) || trades.length === 0) {
                    setError("Add trades to generate AI insights.");
                    setLoading(false);
                    return;
                }
                processData(trades);
                setLoading(false);
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
        trades.forEach((t, index) => {
            const result = Number(t.result);
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
            netPnl: netPnl.toFixed(2),
            totalTrades,
        });

        setPnlData(chartData);

        setWinLossData([
            { name: "Wins", value: totalWins },
            { name: "Losses", value: totalLosses },
        ]);

        generateRecommendations(winRate, profitFactor, totalTrades);
    };

    const generateRecommendations = (winRate: number, pf: number, count: number) => {
        const ideas = [];
        if (count < 5) {
            ideas.push("Not enough data. Log more trades to get accurate AI insights.");
        }
        if (winRate < 40 && pf < 1) {
            ideas.push("Your win rate is low. Review your entry strategy and wait for higher quality setups.");
        }
        if (winRate > 60 && pf < 1) {
            ideas.push("You are winning often but your losses are too large. Tighten your stop losses.");
        }
        if (pf > 1.5) {
            ideas.push("Great performance! Your strategy is profitable. Consider scaling up slowly.");
        }
        if (winRate < 50 && pf > 1.2) {
            ideas.push("Low win rate but high reward-to-risk. Stick to your strategy, it's working.");
        }
        setRecommendations(ideas);
    };

    if (loading) return <div className="text-white">Analyzing trading data...</div>;
    if (error) return <div className="text-red-400 p-4 border border-red-500/20 rounded bg-red-500/10">{error}</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white mb-4">AI Trading Insights</h1>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900 border-slate-800 p-4">
                    <div className="text-slate-400 text-sm mb-1">Net P&L</div>
                    <div className={`text-2xl font-bold ${Number(stats?.netPnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${stats?.netPnl}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PnL Chart */}
                <Card className="md:col-span-2 bg-slate-900 border-slate-800 p-4 h-[300px]">
                    <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-brand-blue" /> Cumulative P&L
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
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

                {/* Win/Loss Pie */}
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

            {/* AI Recommendations */}
            <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🤖</span> AI Recommendations
                </h3>
                <div className="space-y-3">
                    {recommendations.length > 0 ? (
                        recommendations.map((rec, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={18} />
                                <p className="text-slate-200 text-sm leading-relaxed">{rec}</p>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center gap-3 text-slate-400">
                            <AlertCircle size={18} />
                            No recommendations yet.
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
