"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DebugPage() {
    const [jsRunning, setJsRunning] = useState("No (if you see this, React hasn't hydrated)");
    const [supabaseStatus, setSupabaseStatus] = useState("Checking...");
    const [envStatus, setEnvStatus] = useState("Checking...");

    useEffect(() => {
        setJsRunning("Yes");

        // Check Env
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (url && key) {
            setEnvStatus(`Present. URL starts with: ${url.substring(0, 8)}...`);
        } else {
            setEnvStatus("Missing one or both keys!");
        }

        // Check Supabase
        const checkSupabase = async () => {
            try {
                const { data, error } = await supabase.from("users").select("count").limit(1); // 'users' or whatever table exists
                if (error) {
                    // Try auth check if table fails, just to ping the server
                    const { error: authError } = await supabase.auth.getSession();
                    if (authError) {
                        setSupabaseStatus(`Error connecting: ${authError.message}`);
                    } else {
                        setSupabaseStatus("Connected (Auth service reachable)");
                    }
                } else {
                    setSupabaseStatus("Connected (Data service reachable)");
                }
            } catch (e: any) {
                setSupabaseStatus(`Exception: ${e.message}`);
            }
        };

        checkSupabase();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-mono">
            <h1 className="text-2xl font-bold mb-6 text-blue-400">Debug Diagnostics</h1>

            <div className="space-y-4">
                <div className="p-4 border border-slate-700 rounded bg-slate-800">
                    <h2 className="text-lg font-semibold mb-2">Client-Side JavaScript</h2>
                    <p>Running: <span className={jsRunning === "Yes" ? "text-green-400" : "text-red-400"}>{jsRunning}</span></p>
                </div>

                <div className="p-4 border border-slate-700 rounded bg-slate-800">
                    <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
                    <p>Status: <span className={envStatus.includes("Present") ? "text-green-400" : "text-red-400"}>{envStatus}</span></p>
                </div>

                <div className="p-4 border border-slate-700 rounded bg-slate-800">
                    <h2 className="text-lg font-semibold mb-2">Supabase Connection</h2>
                    <p>Status: <span className={supabaseStatus.includes("Connected") ? "text-green-400" : "text-yellow-400"}>{supabaseStatus}</span></p>
                </div>
            </div>
        </div>
    );
}
