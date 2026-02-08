"use client";

import { useEffect, useState } from "react";
import { Newspaper, ExternalLink } from "lucide-react";

export default function MarketNewsWidget() {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        // Fetch News (using existing API)
        fetch("/api/news")
            .then(res => res.json())
            .then(data => setNews(data.slice(0, 4)))
            .catch(err => console.error("Failed to fetch news", err));
    }, []);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Newspaper size={18} className="text-orange-500" />
                    Market News
                </h3>
            </div>

            <div className="space-y-4">
                {news.length > 0 ? (
                    news.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-800/50 last:border-0 last:pb-0">
                            {/* Impact Tag Placeholder - random for demo if not in API */}
                            <div className={`w-1 h-full min-h-[40px] rounded-full ${i === 0 ? 'bg-red-500' : 'bg-orange-500'}`}></div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-medium text-white line-clamp-1 hover:text-brand-blue transition-colors cursor-pointer" title={item.title}>
                                        {item.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2">
                                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-slate-500">{item.source}</span>
                                    {/* Placeholder for impact text */}
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${i === 0 ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                        {i === 0 ? 'HIGH' : 'MED'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-slate-500 text-sm py-4">Loading news...</div>
                )}
            </div>
        </div>
    );
}
