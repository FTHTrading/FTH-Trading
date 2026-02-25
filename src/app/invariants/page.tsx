"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { invariants, failureMatrix } from "@/lib/invariantsData";
import { MetricCard } from "@/components/MetricCard";

export default function InvariantsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  const categories = ["all", "custody", "runtime", "issuance", "settlement", "governance"];

  const filtered =
    selectedCategory === "all"
      ? invariants
      : invariants.filter((inv) => inv.category === selectedCategory);

  const severityColors = {
    HALT: "#ef4444",
    BLOCK: "#f59e0b",
    WARN: "#3b82f6",
  };

  function simulateInvariant(id: string) {
    setSimulatingId(id);
    setTimeout(() => setSimulatingId(null), 3000);
  }

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Runtime Invariants"
        subtitle="Hard constraints that cannot be violated. The system halts, blocks, or warns — it never degrades into unsafe mode."
        badge="GUARDRAILS"
        badgeColor="#ef4444"
      />

      {/* Failure Matrix Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <MetricCard
          label="Total States"
          value={failureMatrix.totalStates.toString()}
          color="#3b82f6"
        />
        <MetricCard
          label="Covered"
          value={failureMatrix.coveredStates.toString()}
          sublabel="100% coverage"
          color="#10b981"
        />
        <MetricCard
          label="Undefined"
          value={failureMatrix.undefinedStates.toString()}
          sublabel="Zero gaps"
          color="#ef4444"
        />
        <MetricCard
          label="HALT Conditions"
          value={failureMatrix.haltConditions.toString()}
          color="#ef4444"
          delay={0.1}
        />
        <MetricCard
          label="BLOCK Conditions"
          value={failureMatrix.blockConditions.toString()}
          color="#f59e0b"
          delay={0.2}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? "text-white"
                : "text-slate-400 hover:text-white"
            }`}
            style={
              selectedCategory === cat
                ? {
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))",
                    border: "1px solid rgba(59,130,246,0.3)",
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Invariant Cards */}
      <div className="space-y-4 mb-12">
        {filtered.map((inv, i) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card overflow-hidden transition-all duration-500 ${
              simulatingId === inv.id ? "ring-2 ring-red-500/50" : ""
            }`}
            style={{
              borderLeftWidth: "4px",
              borderLeftColor: severityColors[inv.severity],
            }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{inv.name}</h3>
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{
                        background: `${severityColors[inv.severity]}20`,
                        color: severityColors[inv.severity],
                        border: `1px solid ${severityColors[inv.severity]}40`,
                      }}
                    >
                      {inv.severity}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded-full bg-white/5">
                      {inv.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{inv.description}</p>
                  <p className="text-xs text-slate-500">
                    <span className="text-slate-400">Enforcement:</span>{" "}
                    {inv.enforcement}
                  </p>
                </div>

                <button
                  onClick={() => simulateInvariant(inv.id)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Simulate
                </button>
              </div>

              {/* Simulation Result */}
              {simulatingId === inv.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-3 rounded-lg font-mono text-xs"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}
                >
                  <div className="text-red-400 mb-1">
                    ⚠ INVARIANT TRIGGERED: {inv.name}
                  </div>
                  <div className="text-slate-400">
                    Severity: {inv.severity} | Category: {inv.category}
                  </div>
                  <div className="text-amber-400 mt-1">
                    → System response: {inv.severity === "HALT" ? "FULL HALT — No operations permitted" : inv.severity === "BLOCK" ? "OPERATION BLOCKED — Other operations continue" : "WARNING DISPATCHED — Monitoring escalated"}
                  </div>
                  <div className="text-green-400 mt-1">
                    ✓ No degraded mode. No undefined state. System integrity maintained.
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Principle */}
      <GlassCard glowColor="#ef4444">
        <div className="text-center py-4">
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: "#ef4444" }}
          >
            Zero Undefined Failure States
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every possible failure path is enumerated and handled. The FailureMatrix validates
            complete coverage at build time. If a state is uncovered, the build blocks.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
