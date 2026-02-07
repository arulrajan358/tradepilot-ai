"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function TradeForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const userStr = localStorage.getItem("user");
        if (!userStr) {
            alert("Please login first");
            setLoading(false);
            return;
        }
        const user = JSON.parse(userStr);

        const formData = new FormData(e.target as HTMLFormElement);
        const pair = formData.get("pair");
        const type = formData.get("type");
        const entry = formData.get("entry");
        const exit = formData.get("exit");
        const result = formData.get("result");
        const notes = formData.get("notes");

        try {
            const res = await fetch("/api/trades/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    pair,
                    type,
                    entry,
                    exit,
                    result: Number(result),
                    notes
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Trade added successfully!");
                window.location.reload();
            } else {
                alert(data.message || "Failed to add trade");
            }
        } catch (error) {
            alert("Error adding trade");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full border-slate-800 bg-slate-900/50">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Log New Trade
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Pair (e.g. EUR/USD)" placeholder="EUR/USD" required name="pair" />

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400">Type</label>
                        <select
                            name="type"
                            className="flex h-10 w-full rounded-lg border border-slate-800 bg-brand-navy px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent"
                        >
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Entry Price" placeholder="0.00" type="number" step="any" required name="entry" />
                    <Input label="Exit Price" placeholder="0.00" type="number" step="any" required name="exit" />
                </div>

                <Input label="Result ($)" placeholder="50" type="number" step="any" required name="result" />

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-400">Notes / Analysis</label>
                    <textarea
                        name="notes"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-blue resize-none h-32"
                        placeholder="Why did you take this trade?"
                    ></textarea>
                </div>

                <Button className="w-full mt-2" disabled={loading}>
                    {loading ? "Saving..." : "Log Trade"}
                </Button>
            </form>
        </Card>
    );
}
