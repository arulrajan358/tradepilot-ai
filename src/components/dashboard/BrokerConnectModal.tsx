"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Loader2, Server, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrokerConnectModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "connecting" | "connected">("idle");

    const handleConnect = () => {
        setStatus("connecting");
        setTimeout(() => {
            setStatus("connected");
            setTimeout(() => {
                setIsOpen(false);
                setStatus("idle");
                alert("Broker connected successfully! Trade monitoring active.");
            }, 1500);
        }, 2000);
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
            >
                <Server size={18} /> Connect Broker
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Connect Brokerage Account</h2>

                                {status === "idle" && (
                                    <div className="space-y-4">
                                        <p className="text-slate-400 text-sm">
                                            Select your broker to begin syncing trades automatically.
                                            (Simulation Mode)
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Binance', 'MetaTrader 4', 'MetaTrader 5', 'Coinbase'].map(broker => (
                                                <button
                                                    key={broker}
                                                    onClick={handleConnect}
                                                    className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-brand-blue transition-all text-slate-300 hover:text-white font-medium text-sm text-center"
                                                >
                                                    {broker}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {status === "connecting" && (
                                    <div className="py-8 flex flex-col items-center justify-center">
                                        <Loader2 size={48} className="text-brand-blue animate-spin mb-4" />
                                        <p className="text-white font-medium">Connecting to secure gateway...</p>
                                        <p className="text-slate-500 text-sm mt-2">Please wait</p>
                                    </div>
                                )}

                                {status === "connected" && (
                                    <div className="py-8 flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle size={32} className="text-green-500" />
                                        </div>
                                        <p className="text-white font-bold text-lg">Connected Successfully</p>
                                        <p className="text-slate-500 text-sm mt-2">Redirecting...</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
