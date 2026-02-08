"use client";

import { Card } from "@/components/ui/Card";
import { Layers, ArrowUp, ArrowDown } from "lucide-react";

export default function LiquidityPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="text-brand-blue" />
                Liquidity Heatmap
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Visual Mock of Order Book / Liquidity */}
                <Card className="col-span-1 lg:col-span-2 bg-slate-900 border-slate-800 p-6 min-h-[500px] flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4">EUR/USD Liquidity Zones</h3>

                    <div className="flex-1 bg-slate-950 rounded-lg p-4 relative overflow-hidden border border-slate-800">
                        {/* Mocking heatmap zones */}
                        <div className="absolute top-[20%] left-0 right-0 h-10 bg-red-500/20 border-y border-red-500/30 flex items-center justify-center">
                            <span className="text-xs text-red-500 font-bold bg-slate-900/80 px-2 rounded">Major Sell Zone (1.0950)</span>
                        </div>

                        <div className="absolute top-[40%] left-[20%] right-[30%] h-24 bg-red-500/5 group">
                            {/* Candles placeholder */}
                        </div>

                        <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-slate-600 w-full flex items-center pl-2">
                            <span className="text-[10px] text-slate-500 bg-slate-950 px-1">Current Price: 1.0820</span>
                        </div>

                        <div className="absolute bottom-[20%] left-0 right-0 h-16 bg-green-500/20 border-y border-green-500/30 flex items-center justify-center">
                            <span className="text-xs text-green-500 font-bold bg-slate-900/80 px-2 rounded">Institutional Buy Zone (1.0750)</span>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-4 text-xs text-slate-400 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/50 rounded"></div> High Sell Pressure
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500/50 rounded"></div> High Buy Pressure
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-slate-900 border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Key Levels</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Resistance 1</span>
                                <span className="text-red-400 font-mono text-sm">1.0920</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Pivot Point</span>
                                <span className="text-white font-mono text-sm">1.0850</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Support 1</span>
                                <span className="text-green-400 font-mono text-sm">1.0780</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Volume Profile</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <ArrowUp size={16} className="text-green-500" />
                                <span className="text-sm text-slate-300">Buy Volume: 52%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[52%]"></div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <ArrowDown size={16} className="text-red-500" />
                                <span className="text-sm text-slate-300">Sell Volume: 48%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-[48%]"></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
