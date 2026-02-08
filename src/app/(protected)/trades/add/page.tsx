"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddTradePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        pair: "BTC/USDT",
        entry_price: "",
        lot_size: "0.01"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("You must be logged in to add trades.");
                return;
            }

            const { error } = await supabase.from("trades").insert({
                user_id: user.id,
                pair: formData.pair.toUpperCase(),
                entry_price: parseFloat(formData.entry_price),
                lot_size: parseFloat(formData.lot_size),
                status: "neutral" // Initial status
            });

            if (error) throw error;

            router.push("/dashboard");
            router.refresh(); // Refresh to show new trade
        } catch (error: any) {
            alert("Error adding trade: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/dashboard" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
            </Link>

            <Card className="bg-slate-900 border-slate-800 p-8">
                <h1 className="text-2xl font-bold text-white mb-6">Log New Trade</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Trading Pair"
                        placeholder="e.g. BTC/USDT"
                        value={formData.pair}
                        onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Entry Price ($)"
                            type="number"
                            step="any"
                            placeholder="0.00"
                            value={formData.entry_price}
                            onChange={(e) => setFormData({ ...formData, entry_price: e.target.value })}
                            required
                        />

                        <Input
                            label="Lot Size"
                            type="number"
                            step="any"
                            placeholder="0.01"
                            value={formData.lot_size}
                            onChange={(e) => setFormData({ ...formData, lot_size: e.target.value })}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={loading}
                    >
                        <Save size={18} className="mr-2" /> Save Trade
                    </Button>
                </form>
            </Card>
        </div>
    );
}
