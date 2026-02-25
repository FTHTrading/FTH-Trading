"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { layers, chainSupport } from "@/lib/architectureData";

export default function ArchitecturePage() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="System Architecture"
        subtitle="Five color-coded layers. Each architecturally separated. Each independently auditable."
        badge="INFRASTRUCTURE"
        badgeColor="#3b82f6"
      />

      {/* ═══════ ARCHITECTURE LAYER DIAGRAM ═══════ */}
      <div className="mb-16">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          System Stack — Layered Architecture
        </h2>
        <div className="glass-card p-8 relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-12 top-10 bottom-10 w-px"
            style={{ background: "linear-gradient(180deg, #3b82f6, #10b981, #f59e0b, #8b5cf6, #ef4444, #06b6d4)" }}
          />
          {[
            { layer: "L6", name: "Public Anchor Layer", desc: "XRPL anchoring · IPFS CID proofs · DOI publications · External verification", color: "#06b6d4" },
            { layer: "L5", name: "Venue & Surveillance", desc: "Execution routing · Liquidity aggregation · Market making · Cross-venue surveillance", color: "#ef4444" },
            { layer: "L4", name: "Issuance & Lifecycle Engine", desc: "Bond issuance · Collateral management · Stablecoin treasury · State machines", color: "#8b5cf6" },
            { layer: "L3", name: "Custody & Vault Control Plane", desc: "12 vault roles · 4 security tiers · MPC signing · Velocity enforcement", color: "#f59e0b" },
            { layer: "L2", name: "Mode Guard Enforcement", desc: "INFRA / ISSUER / VENUE isolation · Cross-mode rejection · Regulatory partitioning", color: "#10b981" },
            { layer: "L1", name: "Deterministic Ledger", desc: "SHA-256 hash chain · Immutable state · Deterministic replay · Zero undefined states", color: "#3b82f6" },
          ].map((item, i) => (
            <motion.div
              key={item.layer}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 relative"
              style={{ marginBottom: i < 5 ? "16px" : "0" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm z-10 flex-shrink-0"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                  boxShadow: `0 0 20px ${item.color}15`,
                }}
              >
                {item.layer}
              </div>
              <div className="flex-1 py-3">
                <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Diagram legend */}
        <div className="mt-4 glass-card p-4 flex items-center justify-center gap-3">
          <span className="text-xs text-slate-400">
            Each layer is independently auditable. Lower layers cannot be bypassed by higher layers.
            Enforcement flows bottom-up. Revenue flows top-down.
          </span>
        </div>
      </div>

      {/* Stacked Layers */}
      <div className="space-y-4 mb-12">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              className="glass-card overflow-hidden cursor-pointer transition-all duration-300"
              onClick={() =>
                setExpandedLayer(expandedLayer === layer.id ? null : layer.id)
              }
              style={{
                borderLeftWidth: "4px",
                borderLeftColor: layer.color,
                boxShadow:
                  expandedLayer === layer.id
                    ? `0 0 40px ${layer.color}20, inset 0 0 40px ${layer.color}08`
                    : undefined,
              }}
            >
              {/* Layer Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{layer.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {layer.name}
                    </h3>
                    <p className="text-sm text-slate-400">{layer.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: `${layer.color}15`,
                      color: layer.color,
                      border: `1px solid ${layer.color}30`,
                    }}
                  >
                    {layer.modules.length} modules
                  </span>
                  <motion.span
                    animate={{
                      rotate: expandedLayer === layer.id ? 180 : 0,
                    }}
                    className="text-slate-500"
                  >
                    ▼
                  </motion.span>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedLayer === layer.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-white/5 pt-4">
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {layer.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Modules */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                            Modules
                          </h4>
                          <div className="space-y-2">
                            {layer.modules.map((mod) => (
                              <div
                                key={mod}
                                className="flex items-center gap-2 text-sm text-slate-300"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ background: layer.color }}
                                />
                                {mod}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Revenue Impact */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                            Revenue Impact
                          </h4>
                          <div
                            className="glass-card p-4"
                            style={{
                              borderColor: `${layer.color}20`,
                            }}
                          >
                            <p className="text-sm text-slate-300">
                              {layer.revenueImpact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mode Isolation Diagram */}
      <div className="mb-12">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Mode Isolation — Architectural Separation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "INFRA", color: "#3b82f6", desc: "Deterministic ledger, hash chains, audit core" },
            { name: "ISSUER", color: "#f59e0b", desc: "Custody, issuance, stablecoins, treasury" },
            { name: "VENUE", color: "#8b5cf6", desc: "Execution, liquidity, market making" },
          ].map((mode, i) => (
            <GlassCard key={mode.name} glowColor={mode.color} delay={i * 0.1}>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: mode.color }}
                >
                  {mode.name}
                </div>
                <p className="text-xs text-slate-400">{mode.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }}
                  />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Isolated
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Isolation enforced indicator */}
        <div className="mt-4 glass-card p-4 flex items-center justify-center gap-3">
          <div className="text-xs text-crimson-400" style={{ color: "#ef4444" }}>
            ✕
          </div>
          <span className="text-xs text-slate-400">
            Cross-mode operations rejected at runtime boundary. Each mode can be spun into a
            separate regulated entity.
          </span>
        </div>
      </div>

      {/* Chain Support Grid */}
      <div>
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Chain Support — 13 Networks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {chainSupport.map((chain, i) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">
                  {chain.name}
                </span>
                <span
                  className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background:
                      chain.status === "live-testnet"
                        ? "rgba(16,185,129,0.2)"
                        : chain.status === "active"
                        ? "rgba(59,130,246,0.2)"
                        : "rgba(107,114,128,0.2)",
                    color:
                      chain.status === "live-testnet"
                        ? "#10b981"
                        : chain.status === "active"
                        ? "#3b82f6"
                        : "#6b7280",
                  }}
                >
                  {chain.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{chain.tier}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
