"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Brain, TrendingUp, XCircle, CheckCircle, Lightbulb, Lock, Sparkles, LayoutDashboard, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AICoachPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "insights" | "premium">("overview");

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Brain className="text-brand-purple" />
                    AI Trading Coach
                </h1>

                {/* Tabs */}
                <div className="bg-slate-900 p-1 rounded-lg flex items-center border border-slate-800">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "overview" ? "bg-brand-purple text-white shadow-lg" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <LayoutDashboard size={16} /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("insights")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "insights" ? "bg-brand-purple text-white shadow-lg" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <LineChart size={16} /> Insights
                    </button>
                    <button
                        onClick={() => setActiveTab("premium")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "premium" ? "bg-brand-purple text-white shadow-lg" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <Sparkles size={16} /> Premium
                    </button>
                </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
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
            )}

            {/* Insights Tab */}
            {activeTab === "insights" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            )}

            {/* Premium Tab */}
            {activeTab === "premium" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <div className="inline-flex items-center justify-center p-4 bg-brand-purple/10 rounded-full mb-6">
                            <Sparkles size={48} className="text-brand-purple" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Unlock Institutional Edge</h2>
                        <p className="text-slate-400">
                            Gain access to real-time predictive models, institutional bias indicators, and volatility alerts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
                        <Card className="bg-slate-900 border-slate-800 p-6 opacity-80 relative overflow-hidden group hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
                                <Lock className="text-slate-500 group-hover:text-brand-purple transition-colors" size={32} />
                            </div>
                            <h3 className="font-bold text-white mb-2">Price Prediction Engine</h3>
                            <p className="text-sm text-slate-500">Next hour candle projection with 84% accuracy. Uses LSTM neural networks trained on 5 years of data.</p>
                        </Card>
                        <Card className="bg-slate-900 border-slate-800 p-6 opacity-80 relative overflow-hidden group hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
                                <Lock className="text-slate-500 group-hover:text-brand-purple transition-colors" size={32} />
                            </div>
                            <h3 className="font-bold text-white mb-2">Institutional Bias</h3>
                            <p className="text-sm text-slate-500">Real-time COT data analysis and banking level liquidity flow indicators.</p>
                        </Card>
                        <Card className="bg-slate-900 border-slate-800 p-6 opacity-80 relative overflow-hidden group hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
                                <Lock className="text-slate-500 group-hover:text-brand-purple transition-colors" size={32} />
                            </div>
                            <h3 className="font-bold text-white mb-2">Volatility Alerts</h3>
                            <p className="text-sm text-slate-500">Get notified before big moves happen. Volatility squeezer detection.</p>
                        </Card>
                        <div className="flex flex-col justify-center items-center p-6 bg-brand-purple/10 rounded-xl border border-brand-purple/20">
                            <h4 className="font-bold text-white mb-2">Ready to upgrade?</h4>
                            <Link href="/pricing" className="w-full">
                                <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                                    Upgrade to Pro
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
