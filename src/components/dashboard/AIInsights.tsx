"use client";

import { Card } from "@/components/ui/Card";
import { Brain, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";


export default function AIInsights({ trades = [] }: { trades?: any[] }) {
    // Dynamic Insight Calculation
    const generateInsights = () => {
        if (trades.length === 0) return [{
            type: "info",
            icon: Brain,
            title: "Waiting for Data",
            message: "Log more trades to unlock AI insights.",
            color: "text-brand-blue",
            bg: "bg-brand-blue/10"
        }];

        const wins = trades.filter(t => Number(t.result) > 0);
        const losses = trades.filter(t => Number(t.result) <= 0);
        const winRate = (wins.length / trades.length) * 100;

        const insights = [];

        // Win Rate Insight
        if (winRate > 60) {
            insights.push({
                type: "success",
                icon: CheckCircle,
                title: "Strong Performance",
                message: `Your win rate is a solid ${winRate.toFixed(1)}%. Keep sticking to your strategy.`,
                color: "text-status-profit",
                bg: "bg-status-profit/10",
            });
        } else if (winRate < 40 && trades.length > 5) {
            insights.push({
                type: "warning",
                icon: AlertTriangle,
                title: "Strategy Adjustment Needed",
                message: `Current win rate is ${winRate.toFixed(1)}%. Consider reviewing your risk management.`,
                color: "text-status-warning",
                bg: "bg-status-warning/10",
            });
        }

        // Streak Insight
        if (trades.length >= 3) {
            const last3 = trades.slice(0, 3);
            const streak = last3.every(t => Number(t.result) > 0);
            if (streak) {
                insights.push({
                    type: "success",
                    icon: Brain,
                    title: "Winning Streak!",
                    message: "You've won your last 3 trades. Momentum is on your side.",
                    color: "text-brand-purple",
                    bg: "bg-brand-purple/10",
                });
            }
        }

        if (insights.length === 0) {
            insights.push({
                type: "info",
                icon: Brain,
                title: "Analyzing Patterns",
                message: "AI is analyzing your recent activity. Keep trading to see more patterns.",
                color: "text-brand-blue",
                bg: "bg-brand-blue/10"
            });
        }

        return insights;
    };

    const insights = generateInsights();

    return (
        <Card className="col-span-1 border-brand-purple/20 shadow-brand-purple/5">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Brain className="text-brand-purple" size={24} />
                    <h3 className="text-lg font-bold text-white">AI Coach Insights</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-brand-purple/10 text-brand-purple font-medium">Beta</span>
            </div>

            <div className="space-y-4">
                {insights.map((insight, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className={`mt-1 p-1.5 rounded-md ${insight.bg} ${insight.color}`}>
                                <insight.icon size={16} />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-1">{insight.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{insight.message}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-2">
                    <Button variant="outline" className="w-full text-xs h-8 border-dashed border-brand-purple/30 text-brand-purple hover:text-brand-purple hover:bg-brand-purple/5 hover:border-brand-purple/50">
                        Generate New Analysis
                    </Button>
                </div>
            </div>
        </Card>
    );
}
