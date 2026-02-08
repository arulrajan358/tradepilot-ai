"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Newspaper, Clock } from "lucide-react";

export default function NewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load news", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-white">Loading market news...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-blue/10 rounded-lg text-brand-blue">
                    <Newspaper size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Market News</h1>
                    <p className="text-slate-400 text-sm">Real-time updates from the crypto world</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((item, i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800 p-6 hover:border-brand-blue/30 transition-colors group">
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

                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mt-auto"
                        >
                            Read more <ExternalLink size={14} />
                        </a>
                    </Card>
                ))}
            </div>
        </div>
    );
}
