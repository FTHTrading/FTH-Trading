"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { operatingModes, integrations } from "@/lib/modesData";

export default function ModesPage() {
  const [selectedMode, setSelectedMode] = useState<string>("infra");
  const [showIntegrations, setShowIntegrations] = useState(false);

  const activeMode = operatingModes.find((m) => m.id === selectedMode)!;

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Operational Modes"
        subtitle="Three architecturally separated modes. Each deployable as an independent regulated entity."
        badge="MODES"
        badgeColor="#8b5cf6"
      />

      {/* Mode Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {operatingModes.map((mode, i) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedMode(mode.id)}
            className="text-left"
          >
            <div
              className={`glass-card p-6 transition-all ${
                selectedMode === mode.id ? "ring-1" : ""
              }`}
              style={{
                borderTopWidth: "4px",
                borderTopColor: mode.color,
                ...(selectedMode === mode.id
                  ? {
                      boxShadow: `0 0 40px ${mode.color}20`,
                      ringColor: `${mode.color}40`,
                    }
                  : {}),
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-2xl font-bold font-mono"
                  style={{ color: mode.color }}
                >
                  {mode.name}
                </h3>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: mode.color,
                    boxShadow: `0 0 10px ${mode.color}`,
                    opacity: selectedMode === mode.id ? 1 : 0.3,
                  }}
                />
              </div>
              <p className="text-xs text-slate-400">{mode.entity}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Active Mode Detail */}
      <motion.div
        key={selectedMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        <GlassCard glowColor={activeMode.color} hoverable={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column — details */}
            <div>
              <h3
                className="text-3xl font-bold font-mono mb-4"
                style={{ color: activeMode.color }}
              >
                {activeMode.name}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Entity Type</span>
                  <span className="text-slate-300">{activeMode.entity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">License</span>
                  <span className="text-slate-300">{activeMode.license}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Capital Required</span>
                  <span className="text-slate-300">
                    {activeMode.capitalRequired}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Risk Profile</span>
                  <span style={{ color: activeMode.riskColor }}>
                    {activeMode.riskProfile}
                  </span>
                </div>
              </div>

              {activeMode.regulatoryBodies.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                    Regulatory Bodies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeMode.regulatoryBodies.map((body) => (
                      <span
                        key={body}
                        className="text-[10px] px-2 py-1 rounded-full"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        {body}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column — capabilities */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                Capabilities
              </h4>
              <div className="space-y-2">
                {activeMode.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeMode.color }}
                    />
                    {cap}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Isolation Enforcement */}
      <div className="glass-card p-6 mb-12">
        <div className="text-center mb-6">
          <h3 className="text-white font-semibold mb-2">
            Mode Isolation Enforcement
          </h3>
          <p className="text-xs text-slate-400">
            Cross-mode operations are rejected at runtime boundary. This is
            architectural separation, not permissions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {operatingModes.map((mode) => (
            <div
              key={mode.id}
              className="text-center p-4 rounded-xl"
              style={{
                background: `${mode.color}08`,
                border: `1px solid ${mode.color}20`,
              }}
            >
              <div
                className="text-sm font-bold font-mono"
                style={{ color: mode.color }}
              >
                {mode.name}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex-1 h-px" style={{ background: "#ef444440" }} />
          <span className="text-xs text-red-400 font-mono">✕ ISOLATED ✕</span>
          <div className="flex-1 h-px" style={{ background: "#ef444440" }} />
        </div>
      </div>

      {/* Integrations Matrix */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            Integration Matrix
          </h2>
          <button
            onClick={() => setShowIntegrations(!showIntegrations)}
            className="text-xs text-slate-400 hover:text-white glass-card px-3 py-1.5 rounded-lg transition-all"
          >
            {showIntegrations ? "Collapse" : "Expand"}
          </button>
        </div>

        {showIntegrations && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="glass-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-[10px] uppercase tracking-widest text-slate-500 p-4">
                      Integration
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-slate-500 p-4">
                      Layer
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-slate-500 p-4">
                      Type
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-slate-500 p-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((integ) => (
                    <tr
                      key={integ.name}
                      className="border-b border-white/3 hover:bg-white/2 transition-colors"
                    >
                      <td className="p-4 text-sm text-white font-medium">
                        {integ.name}
                      </td>
                      <td className="p-4">
                        <span
                          className="text-[10px] font-mono font-bold"
                          style={{
                            color:
                              integ.layer === "INFRA"
                                ? "#3b82f6"
                                : integ.layer === "ISSUER"
                                ? "#f59e0b"
                                : "#8b5cf6",
                          }}
                        >
                          {integ.layer}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-400">
                        {integ.type}
                      </td>
                      <td className="p-4">
                        <span
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            background:
                              integ.status === "Integrated"
                                ? "rgba(16,185,129,0.15)"
                                : integ.status === "Active"
                                ? "rgba(59,130,246,0.15)"
                                : integ.status === "Live Testnet"
                                ? "rgba(245,158,11,0.15)"
                                : "rgba(139,92,246,0.15)",
                            color:
                              integ.status === "Integrated"
                                ? "#10b981"
                                : integ.status === "Active"
                                ? "#3b82f6"
                                : integ.status === "Live Testnet"
                                ? "#f59e0b"
                                : "#8b5cf6",
                          }}
                        >
                          {integ.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
