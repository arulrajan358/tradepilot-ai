"use client";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Lock, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Navigation for Settings */}
                <div className="md:col-span-1 space-y-1">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === "profile" ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === "security" ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
                    >
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab("billing")}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === "billing" ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
                    >
                        Billing
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === "notifications" ? "bg-brand-blue/10 text-brand-blue" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
                    >
                        Notifications
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 space-y-6">

                    {/* Profile Section */}
                    {activeTab === "profile" && (
                        <Card>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-brand-blue flex items-center justify-center text-2xl font-bold text-white">
                                    {user ? user.name.charAt(0).toUpperCase() : "TP"}
                                </div>
                                <div>
                                    <Button variant="outline" size="sm">Change Avatar</Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" defaultValue={user?.name || ""} />
                                <Input label="Email Address" type="email" defaultValue={user?.email || ""} readOnly disabled />
                                <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </Card>
                    )}

                    {/* Password Section */}
                    {activeTab === "security" && (
                        <Card>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lock size={18} className="text-slate-400" /> Change Password</h3>
                            <div className="space-y-4 max-w-md">
                                <Input label="Current Password" type="password" />
                                <Input label="New Password" type="password" />
                                <Input label="Confirm New Password" type="password" />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button variant="outline">Update Password</Button>
                            </div>
                        </Card>
                    )}

                    {/* Subscription Section */}
                    {activeTab === "billing" && (
                        <Card>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><CreditCard size={18} className="text-slate-400" /> Subscription</h3>
                            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 flex justify-between items-center mb-6">
                                <div>
                                    <div className="text-white font-medium">Free Starter Plan</div>
                                    <div className="text-xs text-slate-400">Next billing date: N/A</div>
                                </div>
                                <Button variant="primary" size="sm" onClick={() => setShowPaymentModal(true)}>Upgrade Plan</Button>
                            </div>

                            {/* Payment History Mockup */}
                            <h4 className="text-sm font-medium text-slate-400 mb-2">Payment History</h4>
                            <div className="text-sm text-slate-500 italic">No previous payments found.</div>
                        </Card>
                    )}

                    {/* Notifications Section */}
                    {activeTab === "notifications" && (
                        <Card>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Bell size={18} className="text-slate-400" /> Notification Preferences</h3>
                            <div className="p-4 text-slate-400 text-sm">
                                Notification settings are currently managed by the system administrator.
                            </div>
                        </Card>
                    )}

                </div>
            </div>

            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowPaymentModal(false)}
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
                            <Button variant="ghost" onClick={() => setShowPaymentModal(false)} className="mr-2 text-slate-400 hover:text-white">Cancel</Button>
                            <Button variant="primary">Proceed to Payment</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
