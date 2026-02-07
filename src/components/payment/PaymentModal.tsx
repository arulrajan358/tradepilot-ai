import { Button } from "@/components/ui/Button";
import { CreditCard } from "lucide-react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
                <p className="text-slate-400 text-sm mb-6">Select a payment method to streamline your trading.</p>

                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-brand-blue transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <CreditCard size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-white font-medium">Credit / Debit Card</div>
                                <div className="text-xs text-slate-400">Visa, Mastercard, Amex</div>
                            </div>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-brand-blue"></div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-brand-blue transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <span className="font-bold">₿</span>
                            </div>
                            <div className="text-left">
                                <div className="text-white font-medium">Crypto Payment</div>
                                <div className="text-xs text-slate-400">USDT, BTC, ETH, SOL</div>
                            </div>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-brand-blue"></div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-brand-blue transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <span className="font-bold text-xs">UPI</span>
                            </div>
                            <div className="text-left">
                                <div className="text-white font-medium">UPI / NetBanking</div>
                                <div className="text-xs text-slate-400">Instant transfer</div>
                            </div>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-brand-blue"></div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-brand-blue transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                                <span className="text-xs">...</span>
                            </div>
                            <div className="text-left">
                                <div className="text-white font-medium">Other Methods</div>
                                <div className="text-xs text-slate-400">Wallets, Bank Transfer</div>
                            </div>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-brand-blue"></div>
                    </button>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button variant="ghost" onClick={onClose} className="mr-2 text-slate-400 hover:text-white">Cancel</Button>
                    <Button variant="primary">Proceed to Payment</Button>
                </div>
            </div>
        </div>
    );
}
