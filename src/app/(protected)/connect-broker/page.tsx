"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ConnectBrokerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        broker: "Exness",
        account_id: "",
        investor_password: "",
        server_name: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("You must be logged in.");
                return;
            }

            const { error } = await supabase.from("accounts").insert({
                user_id: user.id,
                broker: formData.broker,
                account_number: formData.account_id,
                server: formData.server_name,
                // In a real app, encrypt this or use a secure vault!
                // investor_password: formData.investor_password 
            });

            if (error) throw error;

            alert("Broker account connected successfully!");
            router.push("/dashboard");
        } catch (error: any) {
            alert("Error connecting broker: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6 pt-10">
            <Link href="/dashboard" className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
            </Link>

            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand-blue/10 rounded-lg text-brand-blue">
                        <Server size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Connect Your Broker</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Secure read-only access via Investor Password</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Broker</label>
                        <select
                            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                            value={formData.broker}
                            onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
                        >
                            <option value="Exness">Exness</option>
                            <option value="IC Markets">IC Markets</option>
                            <option value="FTMO">FTMO</option>
                            <option value="MyForexFunds">MyForexFunds</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <Input
                        label="Account ID / Login"
                        placeholder="e.g. 12345678"
                        value={formData.account_id}
                        onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                        required
                    />

                    <Input
                        label="Investor Password (Read-Only)"
                        type="password"
                        placeholder="••••••••"
                        value={formData.investor_password}
                        onChange={(e) => setFormData({ ...formData, investor_password: e.target.value })}
                        required
                    />

                    <Input
                        label="Server Name"
                        placeholder="e.g. Exness-MT5Real"
                        value={formData.server_name}
                        onChange={(e) => setFormData({ ...formData, server_name: e.target.value })}
                        required
                    />

                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300">
                        <ShieldCheck size={16} />
                        <span>We calculate analytics only. No trading access.</span>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full bg-brand-blue hover:bg-brand-blue/90"
                        isLoading={loading}
                    >
                        Connect Account
                    </Button>
                </form>
            </Card>
        </div>
    );
}
