"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Bitcoin, TrendingUp, TrendingDown, Wifi } from "lucide-react";

export default function LiveBitcoinPrice() {
    const [price, setPrice] = useState<string>("0.00");
    const [prevPrice, setPrevPrice] = useState<number>(0);
    const [color, setColor] = useState<string>("text-slate-200");
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Connect to Binance WebSocket for BTC/USDT trades
        const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
        wsRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const currentPrice = parseFloat(data.p);

            setPrice(currentPrice.toFixed(2));

            setPrevPrice((prev) => {
                if (currentPrice > prev) {
                    setColor("text-green-500");
                } else if (currentPrice < prev) {
                    setColor("text-red-500");
                }
                return currentPrice;
            });
        };

        ws.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            if (ws.readyState === 1) { // OPEN
                ws.close();
            }
        };
    }, []);

    return (
        <Card className="bg-slate-900 border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bitcoin size={64} />
            </div>

            <div className="flex justify-between items-start z-10">
                <div>
                    <h3 className="text-slate-400 font-medium text-sm flex items-center gap-2">
                        BTC/USDT
                        <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                    </h3>
                    <div className={`text-3xl font-bold mt-2 font-mono transition-colors duration-300 ${color}`}>
                        ${price}
                    </div>
                </div>
                <div className={`p-2 rounded-lg bg-slate-800 ${color}`}>
                    <Wifi size={20} />
                </div>
            </div>
        </Card>
    );
}
