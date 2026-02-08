"use client";

import { Card } from "@/components/ui/Card";
import { Calendar, Globe } from "lucide-react";

export default function CalendarPage() {
    const events = [
        { time: "08:30", currency: "USD", impact: "High", event: "CPI m/m", forecast: "0.3%", previous: "0.2%" },
        { time: "08:30", currency: "USD", impact: "High", event: "Core CPI m/m", forecast: "0.3%", previous: "0.3%" },
        { time: "14:00", currency: "EUR", impact: "Medium", event: "ECB President Lagarde Speaks", forecast: "", previous: "" },
        { time: "19:30", currency: "JPY", impact: "Low", event: "PPI y/y", forecast: "0.1%", previous: "0.0%" },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="text-brand-blue" />
                Economic Calendar
            </h1>

            <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50 border-b border-slate-800">
                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Cur</th>
                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Impact</th>
                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Event</th>
                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Forecast</th>
                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Previous</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {events.map((e, i) => (
                            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-4 text-sm text-slate-300 font-mono">{e.time}</td>
                                <td className="p-4 text-sm font-bold text-white">{e.currency}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${e.impact === 'High' ? 'bg-red-500/20 text-red-500' :
                                            e.impact === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                                                'bg-blue-500/20 text-blue-500'
                                        }`}>
                                        {e.impact}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-white font-medium">{e.event}</td>
                                <td className="p-4 text-sm text-slate-400">{e.forecast}</td>
                                <td className="p-4 text-sm text-slate-400">{e.previous}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
