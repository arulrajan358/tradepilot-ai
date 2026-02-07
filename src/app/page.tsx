"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Brain, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-brand-blue text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Now with AI Trade Analysis
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Trade Smarter <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                With AI
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Unlock your trading potential with TradePilot AI. Get real-time insights, performance analytics, and personalized coaching to maximize your profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get Started Free <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Features
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract UI representation */}
            <div className="relative bg-brand-slate border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-500 text-xs font-mono">tradepilot-ai-dashboard.exe</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-xs mb-1">Total Profit</div>
                  <div className="text-2xl font-bold text-brand-blue">+$12,450</div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-xs mb-1">Win Rate</div>
                  <div className="text-2xl font-bold text-status-profit">68%</div>
                </div>
              </div>

              <div className="h-40 bg-slate-900/50 rounded-lg border border-slate-800 flex items-end justify-between p-4 px-6 gap-2">
                {[40, 60, 45, 70, 65, 80, 50, 75, 90, 85].map((h, i) => (
                  <div key={i} className="w-full bg-brand-blue/20 rounded-t-sm relative group">
                    <div
                      className="absolute bottom-0 w-full bg-brand-blue rounded-t-sm transition-all duration-1000"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-brand-slate/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose TradePilot?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We combine advanced data analytics with machine learning to provide you with actionable insights that actually improve your trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Insights",
                desc: "Our AI analyzes your trading history to identify patterns, strengths, and weaknesses you didn't know you had.",
                icon: Brain,
                color: "text-brand-purple"
              },
              {
                title: "Real-time Analytics",
                desc: "Track your performance in real-time with comprehensive dashboards and equity curves.",
                icon: BarChart2,
                color: "text-brand-blue"
              },
              {
                title: "Risk Management",
                desc: "Get alerts on risky behavior and suggestions to optimize your position sizing and stop losses.",
                icon: ShieldCheck,
                color: "text-status-profit"
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-brand-navy border-slate-800 group hover:border-brand-blue/30 transition-colors">
                <div className={`w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Start for free, upgrade when you're ready to scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 border-slate-700 bg-brand-slate hover:border-slate-600">
              <h3 className="text-2xl font-bold text-white mb-2">Free Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Log up to 100 trades</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Basic Performance Stats</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Standard Support</li>
              </ul>
              <Button variant="outline" className="w-full">Get Started</Button>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 border-brand-blue shadow-lg shadow-brand-blue/10 bg-brand-slate relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Trader</h3>
              <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Unlimited Trades</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Advanced AI Insights</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Risk Analysis Engine</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-blue" /> Priority Support</li>
              </ul>
              <Button variant="primary" className="w-full">Upgrade to Pro</Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
