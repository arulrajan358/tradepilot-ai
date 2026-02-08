"use client";

import { Card } from "@/components/ui/Card";
import { Brain, TrendingUp, XCircle, CheckCircle, Lightbulb } from "lucide-react";

export default function AICoachPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Brain className="text-brand-purple" />
                AI Trading Coach
            </h1>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-slate-900 border-slate-800 p-6">
                    <p className="text-slate-400 text-sm">Win Rate</p>
                    <h3 className="text-3xl font-bold text-green-500 mt-2">68%</h3>
                    <p className="text-xs text-slate-500 mt-1">Last 30 Days</p>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-6">
                    <p className="text-slate-400 text-sm">Avg Risk:Reward</p>
                    <h3 className="text-3xl font-bold text-white mt-2">1:2.4</h3>
                    <p className="text-xs text-slate-500 mt-1">Excellent</p>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-6">
                    <p className="text-slate-400 text-sm">Best Session</p>
                    <h3 className="text-3xl font-bold text-brand-blue mt-2">NY Open</h3>
                    <p className="text-xs text-slate-500 mt-1">8:00 AM - 11:00 AM EST</p>
                </Card>
                <Card className="bg-slate-900 border-slate-800 p-6">
                    <p className="text-slate-400 text-sm">Psychology Score</p>
                    <h3 className="text-3xl font-bold text-orange-500 mt-2">8/10</h3>
                    <p className="text-xs text-slate-500 mt-1">Based on hold times</p>
                </Card>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-slate-900 border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Lightbulb size={18} className="text-yellow-500" />
                            Weekly AI Report
                        </h3>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                This week, you showed strong discipline during the <strong>London Session</strong>. However, your performance dipped during high-impact news events (CPI).
                            </p>
                            <ul className="text-sm text-slate-300 space-y-2 mt-4">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span>Consistently stuck to 1% risk rule.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span>Improved exit timing on EUR/USD trends.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <XCircle size={16} className="text-red-500" />
                                    <span>Overloading positions after a loss (Thursday).</span>
                                </li>
                            </ul>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Mistake Analysis</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-red-400 text-sm">FOMO Entry</h4>
                                    <p className="text-xs text-red-200">Detected on 3 trades this week</p>
                                </div>
                                <span className="text-xs font-bold text-red-500">- $320</span>
                            </div>
                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-orange-400 text-sm">Early Exit</h4>
                                    <p className="text-xs text-orange-200">Left profit on the table</p>
                                </div>
                                <span className="text-xs font-bold text-orange-500">Missed +$150</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-brand-purple/5 border-brand-purple/20 p-6">
                        <h3 className="font-bold text-brand-purple mb-2">Focus Area</h3>
                        <p className="text-sm text-slate-300 mb-4">
                            Your winning trades usually last <strong>45 mins - 2 hours</strong>. Try to avoid scalping on the 1-minute timeframe as your win rate drops significantly there.
                        </p>
                        <button className="w-full py-2 bg-brand-purple text-white rounded-lg text-sm font-bold hover:bg-brand-purple/90 transition">
                            View Strategy Breakdown
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
