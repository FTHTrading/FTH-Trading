"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { MetricCard } from "@/components/MetricCard";

const heroStats = [
  { label: "Modules", value: "100+", sublabel: "Production-ready", color: "#3b82f6" },
  { label: "Chains", value: "13", sublabel: "Cross-chain support", color: "#10b981" },
  { label: "Tests", value: "345+", sublabel: "Zero failures", color: "#f59e0b" },
  { label: "Failure States", value: "0", sublabel: "Undefined", color: "#ef4444" },
];

const navigationCards = [
  {
    href: "/architecture",
    title: "Architecture",
    description: "Color-coded infrastructure layers. From deterministic ledger to regulatory compliance.",
    icon: "🟦",
    color: "#3b82f6",
  },
  {
    href: "/invariants",
    title: "Invariants",
    description: "Runtime constraints that cannot be violated. HALT, BLOCK, and WARN conditions.",
    icon: "🟥",
    color: "#ef4444",
  },
  {
    href: "/vaults",
    title: "Vaults",
    description: "12 canonical vault roles. Hot, warm, cold, and governance tier topology.",
    icon: "🟩",
    color: "#10b981",
  },
  {
    href: "/lifecycle",
    title: "Lifecycle",
    description: "Bond issuance, collateral management, and stablecoin flow state machines.",
    icon: "🟨",
    color: "#f59e0b",
  },
  {
    href: "/demo",
    title: "Live Demo",
    description: "Interactive walkthrough. $25M bond issuance scenario with failure simulation.",
    icon: "🟪",
    color: "#8b5cf6",
  },
  {
    href: "/financials",
    title: "Financials",
    description: "3-year projections with dynamic sliders. Revenue model breakdown.",
    icon: "📊",
    color: "#06b6d4",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-16"
      >
        {/* Gradient orbs */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        />
        <div
          className="absolute -top-10 right-40 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(59,130,246,0.15)",
                color: "#3b82f6",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            >
              Sovereign Institutional Runtime
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.15)",
                color: "#10b981",
                border: "1px solid rgba(16,185,129,0.3)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }}
              />
              All Systems Operational
            </span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-4">
            FTH OS{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)",
              }}
            >
              v1
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed mb-2">
            Deterministic Capital Infrastructure
          </p>
          <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
            Custody · Issuance · Settlement · Surveillance
            <br />
            Across 13 Chains · 3 Hard Modes · Zero Undefined Failure States
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <Link
            href="/architecture"
            className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
            }}
          >
            View Architecture
          </Link>
          <Link
            href="/demo"
            className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
            }}
          >
            Run Demo
          </Link>
          <Link
            href="/investor"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-300 transition-all hover:scale-105 glass-card"
          >
            Investor Overview
          </Link>
          <Link
            href="/financials"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-300 transition-all hover:scale-105 glass-card"
          >
            Financial Projections
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {heroStats.map((stat, i) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            sublabel={stat.sublabel}
            color={stat.color}
            delay={0.1 * i}
          />
        ))}
      </div>

      {/* Navigation Grid */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Command Center
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationCards.map((card, i) => (
            <Link key={card.href} href={card.href}>
              <GlassCard glowColor={card.color} delay={0.05 * i}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{card.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Runtime Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: "#10b981", boxShadow: "0 0 12px #10b981" }}
              />
              <span className="text-sm text-slate-300 font-medium">Runtime Active</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs text-slate-500">
              Hash Chain: Intact · Mode Guard: Enforcing · Custody: Online · Settlement: Ready
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
            <span className="text-blue-400">INFRA</span>
            <span className="text-white/20">·</span>
            <span className="text-amber-400">ISSUER</span>
            <span className="text-white/20">·</span>
            <span className="text-violet-400">VENUE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
