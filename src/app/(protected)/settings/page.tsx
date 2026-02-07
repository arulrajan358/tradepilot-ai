"use client";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Lock, CreditCard, Bell } from "lucide-react";
import PaymentModal from "@/components/payment/PaymentModal";

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
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300">Experience Level</label>
                                    <select className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-brand-blue">
                                        <option>Beginner (0-1 years)</option>
                                        <option>Intermediate (1-3 years)</option>
                                        <option>Advanced (3+ years)</option>
                                        <option>Pro Trader</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300">Preferred Asset Class</label>
                                    <select className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-brand-blue">
                                        <option>Forex</option>
                                        <option>Crypto</option>
                                        <option>Stocks</option>
                                        <option>Commodities</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 space-y-1">
                                <label className="text-sm font-medium text-slate-300">Bio</label>
                                <textarea
                                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white min-h-[100px] focus:outline-none focus:border-brand-blue"
                                    placeholder="Tell us about your trading journey..."
                                ></textarea>
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
            <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
        </div>
    );
}
