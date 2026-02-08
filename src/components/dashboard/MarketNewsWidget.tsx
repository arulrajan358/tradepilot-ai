"use client";

import { useEffect, useState } from "react";
import { Newspaper, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function MarketNewsWidget() {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        // Fetch News (using existing API)
        fetch("/api/news")
            .then(res => res.json())
            .then(data => setNews(data.slice(0, 3))) // Show 3 items horizontally
            .catch(err => console.error("Failed to fetch news", err));
    }, []);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Newspaper size={18} className="text-brand-blue" />
                    Market News
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {news.length > 0 ? (
                    news.map((item, i) => (
                        <Card key={i} className="bg-slate-900 border-slate-800 p-4 hover:border-slate-700 transition-colors group cursor-pointer relative overflow-hidden">
                            {/* Impact Indicator Strip */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${i === 0 ? 'bg-red-500' : (i === 1 ? 'bg-orange-500' : 'bg-blue-500')}`}></div>

                            <div className="pl-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${i === 0 ? 'bg-red-500/10 text-red-500' : (i === 1 ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500')}`}>
                                        {i === 0 ? 'High Impact' : (i === 1 ? 'Medium' : 'Low')}
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                <h4 className="text-sm font-medium text-white line-clamp-2 mb-2 group-hover:text-brand-blue transition-colors">
                                    {item.title}
                                </h4>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-slate-500">{item.source}</span>
                                    <ArrowRight size={14} className="text-slate-600 group-hover:text-brand-blue -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-slate-500 text-sm py-8 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
                        Loading latest market news...
                    </div>
                )}
            </div>
        </div>
    );
}
