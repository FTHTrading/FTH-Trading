"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { MetricCard } from "@/components/MetricCard";
import { ModeToggle } from "@/components/UIElements";
import { revenueModels, pathScenarios, formatCurrency } from "@/lib/financialData";
import { layers } from "@/lib/architectureData";
import { failureMatrix } from "@/lib/invariantsData";
import Link from "next/link";

export default function InvestorPage() {
  const [viewMode, setViewMode] = useState("Investor");

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <div className="flex items-center justify-between mb-10">
        <PageHeader
          title="FTH Trading"
          subtitle="Sovereign Institutional Runtime — Capital Infrastructure Platform"
          badge="CONFIDENTIAL"
          badgeColor="#f59e0b"
        />
        <ModeToggle
          options={["Investor", "Technical"]}
          value={viewMode}
          onChange={setViewMode}
        />
      </div>

      {viewMode === "Investor" ? (
        <InvestorView />
      ) : (
        <TechnicalView />
      )}
    </div>
  );
}

function InvestorView() {
  return (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <MetricCard label="Total Addressable Market" value="$15T+" sublabel="Institutional DeFi" color="#3b82f6" />
        <MetricCard label="Projected Y3 Revenue" value="$80M" sublabel="Combined paths" color="#10b981" delay={0.1} />
        <MetricCard label="Infrastructure Complete" value="100+" sublabel="Production modules" color="#f59e0b" delay={0.2} />
        <MetricCard label="Competitive Moat" value="Deep" sublabel="Deterministic runtime" color="#8b5cf6" delay={0.3} />
      </div>

      {/* Investment Thesis */}
      <GlassCard glowColor="#3b82f6" hoverable={false} className="mb-10">
        <h3 className="text-lg font-bold text-white mb-4">Investment Thesis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              The Problem
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Institutional capital cannot safely enter digital asset infrastructure.
              Existing platforms lack deterministic guarantees, architectural separation,
              and regulatory-grade audit trails.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">
              The Solution
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              FTH OS is a sovereign institutional runtime with zero undefined failure
              states, MPC-only signing, hash-chained ledger, and architectural mode
              isolation across 13 chains.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-400 mb-2">
              The Opportunity
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              First-mover in deterministic capital infrastructure. Five revenue
              models from custody (30-50 bps) to stablecoin flows (5-10 bps on
              billions). Three deployment paths from $2M to $50M capital.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Revenue Paths */}
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
        Deployment Paths
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {pathScenarios.map((path, i) => (
          <GlassCard key={path.id} delay={i * 0.1}>
            <h3 className="text-white font-semibold mb-2">{path.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{path.description}</p>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Capital
                </span>
                <div className="text-lg font-bold text-white">{path.capital}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Y3 Revenue
                </span>
                <div className="text-lg font-bold text-emerald-400">
                  {path.y3Revenue}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Competitive Position */}
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
        Competitive Landscape
      </h2>
      <GlassCard hoverable={false} className="mb-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[10px] uppercase tracking-widest text-slate-500 p-3">
                  Feature
                </th>
                <th className="text-center text-[10px] uppercase tracking-widest text-blue-400 p-3">
                  FTH OS
                </th>
                <th className="text-center text-[10px] uppercase tracking-widest text-slate-500 p-3">
                  Fireblocks
                </th>
                <th className="text-center text-[10px] uppercase tracking-widest text-slate-500 p-3">
                  Securitize
                </th>
                <th className="text-center text-[10px] uppercase tracking-widest text-slate-500 p-3">
                  Circle
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                ["Deterministic Ledger", "✓", "✕", "✕", "✕"],
                ["Multi-Custodian Orchestration", "✓", "Partial", "✕", "✕"],
                ["Mode Isolation", "✓", "✕", "✕", "✕"],
                ["Token Issuance", "✓", "✕", "✓", "✕"],
                ["Stablecoin Treasury", "✓", "✕", "✕", "✓"],
                ["Cross-Chain (13)", "✓", "✓", "Partial", "Partial"],
                ["Zero Undefined Failures", "✓", "✕", "✕", "✕"],
                ["Sovereign Verifier", "✓", "✕", "✕", "✕"],
              ].map(([feature, ...values]) => (
                <tr
                  key={feature}
                  className="border-b border-white/3 hover:bg-white/2"
                >
                  <td className="p-3 text-slate-300">{feature}</td>
                  {values.map((v, j) => (
                    <td key={j} className="p-3 text-center">
                      <span
                        style={{
                          color:
                            v === "✓"
                              ? j === 0
                                ? "#3b82f6"
                                : "#10b981"
                              : v === "✕"
                              ? "#ef4444"
                              : "#f59e0b",
                        }}
                      >
                        {v}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* IP & Defensibility */}
      <GlassCard glowColor="#8b5cf6" hoverable={false}>
        <h3 className="text-white font-semibold mb-4">
          Intellectual Property & Defensibility
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-violet-400">◆</span>
              DOI-registered research publications
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-400">◆</span>
              ORCID-linked author credentials
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-400">◆</span>
              IPFS CID content-addressed proofs
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-violet-400">◆</span>
              Deterministic runtime is proprietary
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-400">◆</span>
              Sovereign verifier cannot be replicated overnight
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-400">◆</span>
              345+ tests as executable specification
            </div>
          </div>
        </div>
      </GlassCard>
    </>
  );
}

function TechnicalView() {
  return (
    <>
      {/* Technical Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        <MetricCard label="Modules" value="100+" color="#3b82f6" />
        <MetricCard label="Tests" value="345+" color="#10b981" delay={0.05} />
        <MetricCard label="Chains" value="13" color="#f59e0b" delay={0.1} />
        <MetricCard label="Failure States" value={failureMatrix.totalStates.toString()} sublabel="100% covered" color="#ef4444" delay={0.15} />
        <MetricCard label="Categories" value="22" color="#8b5cf6" delay={0.2} />
      </div>

      {/* Architecture Summary */}
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
        Architecture Layers
      </h2>
      <div className="space-y-3 mb-12">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-4 flex items-center gap-4"
            style={{ borderLeftWidth: "3px", borderLeftColor: layer.color }}
          >
            <span className="text-lg">{layer.icon}</span>
            <div className="flex-1">
              <h3 className="text-white font-medium text-sm">{layer.name}</h3>
              <p className="text-xs text-slate-500">{layer.subtitle}</p>
            </div>
            <span className="text-[10px] text-slate-500">
              {layer.modules.length} modules
            </span>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
        Technology Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {[
          { name: "TypeScript", desc: "Core language" },
          { name: "Node.js", desc: "Runtime" },
          { name: "SHA-256", desc: "Hash function" },
          { name: "MPC", desc: "Key management" },
          { name: "Fireblocks", desc: "Primary custody" },
          { name: "Circle", desc: "USDC integration" },
          { name: "Chainlink", desc: "4 products" },
          { name: "XRPL", desc: "Payment channels" },
        ].map((tech) => (
          <div key={tech.name} className="glass-card p-3 text-center">
            <div className="text-white font-medium text-sm">{tech.name}</div>
            <div className="text-[10px] text-slate-500">{tech.desc}</div>
          </div>
        ))}
      </div>

      {/* Deep Dive Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/architecture">
          <GlassCard glowColor="#3b82f6">
            <h3 className="text-blue-400 font-semibold">
              Architecture Deep Dive →
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Color-coded layers, mode isolation, chain support
            </p>
          </GlassCard>
        </Link>
        <Link href="/invariants">
          <GlassCard glowColor="#ef4444">
            <h3 className="text-red-400 font-semibold">
              Invariant Explorer →
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              HALT/BLOCK/WARN conditions with live simulation
            </p>
          </GlassCard>
        </Link>
        <Link href="/vaults">
          <GlassCard glowColor="#10b981">
            <h3 className="text-emerald-400 font-semibold">
              Vault Topology →
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              12 canonical roles across 4 security tiers
            </p>
          </GlassCard>
        </Link>
      </div>
    </>
  );
}
