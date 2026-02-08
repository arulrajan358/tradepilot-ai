"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Newspaper, Clock, Calendar, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState<"news" | "calendar">("news");

    // News State
    const [news, setNews] = useState<any[]>([]);
    const [loadingNews, setLoadingNews] = useState(true);

    // Calendar Data (Static for now, same as previous page)
    const calendarEvents = [
        { time: "08:30", currency: "USD", impact: "High", event: "CPI m/m", forecast: "0.3%", previous: "0.2%" },
        { time: "08:30", currency: "USD", impact: "High", event: "Core CPI m/m", forecast: "0.3%", previous: "0.3%" },
        { time: "14:00", currency: "EUR", impact: "Medium", event: "ECB President Lagarde Speaks", forecast: "", previous: "" },
        { time: "19:30", currency: "JPY", impact: "Low", event: "PPI y/y", forecast: "0.1%", previous: "0.0%" },
        { time: "10:00", currency: "GBP", impact: "High", event: "BOE Interest Rate Decision", forecast: "5.25%", previous: "5.25%" },
    ];

    useEffect(() => {
        if (activeTab === "news" && news.length === 0) {
            fetch("/api/news")
                .then((res) => res.json())
                .then((data) => {
                    setNews(data);
                    setLoadingNews(false);
                })
                .catch((err) => {
                    console.error("Failed to load news", err);
                    setLoadingNews(false);
                });
        }
    }, [activeTab, news.length]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Newspaper className="text-brand-blue" />
                    Market Insights
                </h1>

                {/* Tabs */}
                <div className="bg-slate-900 p-1 rounded-lg flex items-center border border-slate-800">
                    <button
                        onClick={() => setActiveTab("news")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "news" ? "bg-brand-blue text-white shadow-lg" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <Newspaper size={16} /> Market News
                    </button>
                    <button
                        onClick={() => setActiveTab("calendar")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === "calendar" ? "bg-brand-blue text-white shadow-lg" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <Calendar size={16} /> Economic Calendar
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {activeTab === "news" ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {loadingNews ? (
                        <div className="text-slate-500 text-center py-20">Loading global market news...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item, i) => (
                                <Card key={i} className="bg-slate-900 border-slate-800 p-6 hover:border-brand-blue/30 transition-colors group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded">
                                            {item.source}
                                        </span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(item.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                        {item.body || "Click to read the full story on the source website."}
                                    </p>

                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mt-auto pt-4 border-t border-slate-800"
                                    >
                                        Read more <ExternalLink size={14} />
                                    </a>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Calendar size={18} className="text-orange-500" />
                                Upcoming High Impact Events
                            </h3>
                            <span className="text-xs text-slate-500">Timezone: UTC</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800/50 border-b border-slate-800">
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Currency</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Impact</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Event</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Forecast</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Previous</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {calendarEvents.map((e, i) => (
                                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="p-4 text-sm text-slate-300 font-mono">{e.time}</td>
                                            <td className="p-4 text-sm font-bold text-white">{e.currency}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 ${e.impact === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                        e.impact === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                                            'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                    }`}>
                                                    {e.impact === 'High' && <AlertTriangle size={10} />}
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
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
