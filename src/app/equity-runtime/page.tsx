"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import {
  equityRuntimeModules,
  competitorTable,
  runtimeStats,
} from "@/lib/equityRuntimeData";

export default function EquityRuntimePage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Institutional Tokenized Equity Runtime"
        subtitle="Not tokenizing stocks. Building the operating system for tokenized equity markets."
        badge="EQUITY RUNTIME"
        badgeColor="#8b5cf6"
      />

      {/* ═══════ KEY STATS BAR ═══════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {[
          { label: "Runtime Modules", value: runtimeStats.modules, color: "#8b5cf6" },
          { label: "Tests Passing", value: `${runtimeStats.testsPassing}/${runtimeStats.tests}`, color: "#10b981" },
          { label: "Supported Chains", value: runtimeStats.chains, color: "#3b82f6" },
          { label: "Compliance Checks", value: runtimeStats.complianceChecks, color: "#ef4444" },
        ].map((stat, i) => (
          <GlassCard key={stat.label} delay={i * 0.08}>
            <div className="text-center py-3">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* ═══════ RUNTIME ARCHITECTURE DIAGRAM ═══════ */}
      <div className="mb-16">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Runtime Architecture — 8 Modules, 7 Layers
        </h2>
        <div className="glass-card p-8 relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-12 top-10 bottom-10 w-px"
            style={{
              background:
                "linear-gradient(180deg, #14b8a6, #ec4899, #06b6d4, #8b5cf6, #ef4444, #f59e0b, #10b981, #3b82f6)",
            }}
          />
          {[...equityRuntimeModules].reverse().map((mod, i) => (
            <motion.div
              key={mod.layer}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-6 relative cursor-pointer group"
              style={{ marginBottom: i < 7 ? "12px" : "0" }}
              onClick={() =>
                setExpandedModule(
                  expandedModule === mod.layer ? null : mod.layer
                )
              }
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm z-10 flex-shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: `${mod.color}15`,
                  color: mod.color,
                  border: `1px solid ${mod.color}40`,
                  boxShadow: `0 0 20px ${mod.color}15`,
                }}
              >
                {mod.layer}
              </div>
              <div className="flex-1 py-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    {mod.name}
                  </h3>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      background: `${mod.color}15`,
                      color: mod.color,
                      border: `1px solid ${mod.color}30`,
                    }}
                  >
                    {mod.mode}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {mod.description}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[10px] text-slate-500">
                  {mod.tests} tests
                </span>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 glass-card p-4 flex items-center justify-center gap-3">
          <span className="text-xs text-slate-400">
            Click any layer to expand. Every module declares its SystemMode
            binding and supports 6 chains. Lower layers cannot be bypassed.
          </span>
        </div>
      </div>

      {/* ═══════ EXPANDED MODULE DETAIL ═══════ */}
      <AnimatePresence>
        {expandedModule && (
          <motion.div
            key={expandedModule}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-16 overflow-hidden"
          >
            {equityRuntimeModules
              .filter((m) => m.layer === expandedModule)
              .map((mod) => (
                <div key={mod.layer} className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{mod.icon}</span>
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: mod.color }}
                      >
                        {mod.layer} — {mod.name}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Key Capabilities */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                        Key Capabilities
                      </h4>
                      <ul className="space-y-2">
                        {mod.keyCapabilities.map((cap, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ background: mod.color }}
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Invariants */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                        Invariants
                      </h4>
                      <ul className="space-y-2">
                        {mod.invariants.map((inv, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <span className="text-red-400 flex-shrink-0 mt-0.5 text-xs">
                              ●
                            </span>
                            {inv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Module metadata */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-6">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Module:{" "}
                      <span className="text-slate-400">{mod.module}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Mode:{" "}
                      <span style={{ color: mod.color }}>{mod.mode}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Chains:{" "}
                      <span className="text-slate-400">{mod.chains}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Tests:{" "}
                      <span className="text-emerald-400">{mod.tests} ✓</span>
                    </span>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ MODULE DETAIL CARDS ═══════ */}
      <div className="mb-16">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Module Detail
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equityRuntimeModules.map((mod, i) => (
            <GlassCard key={mod.layer} delay={i * 0.06} glowColor={mod.color}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mod.icon}</span>
                    <div>
                      <h3
                        className="font-bold text-sm"
                        style={{ color: mod.color }}
                      >
                        {mod.layer} — {mod.name}
                      </h3>
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest"
                        style={{ color: mod.color }}
                      >
                        {mod.mode}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#10b981",
                        boxShadow: "0 0 6px #10b981",
                      }}
                    />
                    <span className="text-[10px] text-emerald-400">
                      {mod.tests} tests
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {mod.description}
                </p>

                {/* Invariants as compact tags */}
                <div className="flex flex-wrap gap-1.5">
                  {mod.invariants.map((inv, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-2 py-1 rounded-md"
                      style={{
                        background: "rgba(239,68,68,0.08)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,0.15)",
                      }}
                    >
                      {inv.length > 55 ? inv.slice(0, 55) + "…" : inv}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* ═══════ THESIS: WHY THIS IS DIFFERENT ═══════ */}
      <div className="mb-16">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Why This Is Different
        </h2>
        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-lg">🔌</span> Zoniqx (DyCIST)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrates existing infrastructure. Wraps tokens, connects KYC
                providers, pipes data between systems. Solves the{" "}
                <span className="text-slate-300">plumbing</span> problem.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-lg">💳</span> StockFi
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Builds a lending product on tokenized equity. One use case, one
                protocol. Solves the{" "}
                <span className="text-slate-300">product</span> problem.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-lg">🏗️</span> FTH OS
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Builds the runtime — the execution layer that every product
                needs. Not an integration layer. Not a single product. The{" "}
                <span className="text-white font-semibold">
                  operating system
                </span>{" "}
                for tokenized equity markets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ COMPETITIVE COMPARISON TABLE ═══════ */}
      <div className="mb-16">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Competitive Comparison
        </h2>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Capability
                  </th>
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Zoniqx
                  </th>
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    StockFi
                  </th>
                  <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-purple-400">
                    FTH OS
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitorTable.map((row, i) => (
                  <tr
                    key={row.capability}
                    className={`border-b border-white/3 ${
                      i % 2 === 0 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="p-4 text-slate-300 font-medium text-xs">
                      {row.capability}
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {row.zoniqx}
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {row.stockfi}
                    </td>
                    <td className="p-4 text-xs font-medium text-purple-300">
                      {row.fthOS}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ═══════ TEST COVERAGE ═══════ */}
      <div className="mb-16">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Test Coverage
        </h2>
        <div className="glass-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#10b981",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow: "0 0 30px rgba(16,185,129,0.15)",
              }}
            >
              ✓
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">
                39/39 PASS
              </div>
              <div className="text-sm text-slate-400">
                8 test suites · 0 failures · 0 skipped
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {equityRuntimeModules.map((mod) => (
              <div
                key={mod.layer}
                className="rounded-lg p-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {mod.layer}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    {mod.tests}✓
                  </span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "100%",
                      background: `linear-gradient(90deg, ${mod.color}, #10b981)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ BOTTOM THESIS ═══════ */}
      <div className="glass-card p-8 text-center">
        <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
          Other platforms integrate products.{" "}
          <span className="text-white font-semibold">
            FTH OS defines how tokenized equity operates.
          </span>
        </p>
        <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-4">
          8 modules · 39 assertions · 6 chains · 3 modes · Deterministic
          execution
        </p>
      </div>
    </div>
  );
}
