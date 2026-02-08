"use client";

import { useEffect, useRef, memo } from "react";

interface TradingChartProps {
    symbol?: string;
}

function TradingChart({ symbol = "BINANCE:BTCUSDT" }: TradingChartProps) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;

        // Clear previous widget
        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(15, 23, 42, 1)", 
        "gridColor": "rgba(30, 41, 59, 0.5)",
        "hide_top_toolbar": false,
        "hide_legend": true,
        "save_image": false,
        "calendar": false,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      }`;
        container.current.appendChild(script);
    }, [symbol]); // Re-run when symbol changes

    return (
        <div className="w-full h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative transition-colors duration-300">
            <div className="tradingview-widget-container h-full w-full" ref={container}>
                <div className="tradingview-widget-container__widget h-full w-full"></div>
            </div>
        </div>
    );
}

export default memo(TradingChart);
