"use client";
import { useState, useEffect } from "react";

import TradeForm from "@/components/trades/TradeForm";
import TradeTable from "@/components/trades/TradeTable";

export default function TradesPage() {
    const [trades, setTrades] = useState<any[]>([]);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);

        fetch(`/api/trades/list?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setTrades(data.reverse());
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-1">
                <TradeForm />
            </div>
            <div className="lg:col-span-2">
                <TradeTable trades={trades} />
            </div>
        </div>
    );
}
