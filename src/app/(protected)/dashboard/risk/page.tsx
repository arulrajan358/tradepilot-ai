"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, ShieldCheck, Calculator, Save } from "lucide-react";

export default function RiskManagerPage() {
    const [accountBalance, setAccountBalance] = useState(10000);
    const [riskPercent, setRiskPercent] = useState(1);
    const [stopLossPips, setStopLossPips] = useState(20);
    const [pair, setPair] = useState("EURUSD");

    const calculateLotSize = () => {
        // Simplified calculation: (Balance * Risk%) / (SL * PipValue)
        // Assuming Standard Lot Pip Value ~ $10 for EURUSD
        const riskAmount = (accountBalance * riskPercent) / 100;
        const lotSize = riskAmount / (stopLossPips * 10);
        return lotSize.toFixed(2);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-brand-blue" />
                Smart Risk Manager
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Calculator */}
                <Card className="bg-slate-900 border-slate-800 p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator size={20} className="text-brand-purple" />
                        Position Size Calculator
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Account Balance ($)</label>
                            <input
                                type="number"
                                value={accountBalance}
                                onChange={(e) => setAccountBalance(Number(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-brand-blue"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Risk (%)</label>
                                <input
                                    type="number"
                                    value={riskPercent}
                                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-brand-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Stop Loss (Pips)</label>
                                <input
                                    type="number"
                                    value={stopLossPips}
                                    onChange={(e) => setStopLossPips(Number(e.target.value))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-brand-blue"
                                />
                            </div>
                        </div>

                        <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-lg p-4 mt-6 text-center">
                            <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Recommended Lot Size</p>
                            <h3 className="text-4xl font-bold text-brand-blue">{calculateLotSize()} <span className="text-lg text-slate-500">Lots</span></h3>
                            <p className="text-slate-500 text-xs mt-2">Risk Amount: <span className="text-white">${((accountBalance * riskPercent) / 100).toFixed(2)}</span></p>
                        </div>
                    </div>
                </Card>

                {/* Risk Settings / Profile */}
                <div className="space-y-6">
                    <Card className="bg-slate-900 border-slate-800 p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Risk Profile Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Max Daily Loss Limit ($)</label>
                                <input type="number" placeholder="500" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Max Risk Per Trade (%)</label>
                                <input type="number" placeholder="2" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" />
                            </div>
                            <Button className="w-full gap-2">
                                <Save size={16} /> Save Rules
                            </Button>
                        </div>
                    </Card>

                    <Card className="bg-red-500/10 border-red-500/20 p-6">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="text-red-500 shrink-0" size={24} />
                            <div>
                                <h3 className="text-red-500 font-bold mb-1">Risk Warning</h3>
                                <p className="text-sm text-red-200/80 leading-relaxed">
                                    Your current risk per trade settings allow for significant drawdown. Consider reducing max risk to 1.5% to preserve capital for prop firm challenges.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
