"use client";

import { Card } from "@/components/ui/Card";
import { ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";

export default function PropFirmPage() {
    // Mock Data for "Prop Firm" Analysis (Reused/Migrated from old Analysis page)
    const analytics = {
        avgRiskPerTrade: "1.2%",
        maxDrawdown: "-3.5%",
        profitFactor: "2.1",
        daysTraded: 12,
        passedAccounts: 1,
        failedAccounts: 0,
        equityCurve: [10000, 10100, 10050, 10200, 10350, 10300, 10500],
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-brand-purple" />
                Prop Firm Dashboard
            </h1>

            {/* Account Health Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900 border-slate-800 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">Account Status</p>
                        <h3 className="text-xl font-bold text-green-500 flex items-center gap-2">
                            <ShieldCheck size={20} /> Active
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-xs">Days Left</p>
                        <p className="text-white font-bold">Unlimited</p>
                    </div>
                </Card>

                <Card className="bg-slate-900 border-slate-800 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">Max Drawdown</p>
                        <h3 className="text-xl font-bold text-white">{analytics.maxDrawdown}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-xs">Limit</p>
                        <p className="text-red-500 font-bold">-10%</p>
                    </div>
                </Card>

                <Card className="bg-slate-900 border-slate-800 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">Profit Target</p>
                        <h3 className="text-xl font-bold text-brand-blue">+5.2%</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-xs">Goal</p>
                        <p className="text-brand-blue font-bold">+10%</p>
                    </div>
                </Card>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-brand-purple" />
                        Performance Metrics
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Average Risk Per Trade</span>
                            <span className="text-white font-mono">{analytics.avgRiskPerTrade}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Profit Factor</span>
                            <span className="text-white font-mono">{analytics.profitFactor}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Days Traded</span>
                            <span className="text-white font-mono">{analytics.daysTraded}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-slate-400">Win Rate</span>
                            <span className="text-green-500 font-bold">64%</span>
                        </div>
                    </div>
                </Card>

                <Card className="bg-slate-900 border-slate-800 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-orange-500" />
                        Risk Management
                    </h3>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg mb-4">
                        <p className="text-sm text-orange-200">
                            Your average risk per trade is <strong>{analytics.avgRiskPerTrade}</strong>. This is within the recommended range of 1-2%.
                        </p>
                    </div>
                    <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-lg">
                        <p className="text-sm text-brand-blue-100">
                            <strong>Tip:</strong> You are 4.8% away from your profit target. Maintain your current risk sizing to hit the goal safely.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Probability Score - AI Feature */}
            <Card className="bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 border-brand-purple/30 p-8 text-center">
                <p className="text-slate-300 mb-2">AI Pass Probability</p>
                <h2 className="text-5xl font-bold text-white mb-2">92%</h2>
                <p className="text-sm text-brand-blue-100">You are on track to pass this challenge.</p>
            </Card>
        </div>
    );
}
