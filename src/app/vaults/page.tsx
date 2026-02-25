"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { vaultRoles } from "@/lib/vaultData";

export default function VaultsPage() {
  const [selectedVault, setSelectedVault] = useState<string | null>(null);

  const tierColors = {
    hot: "#ef4444",
    warm: "#f59e0b",
    cold: "#3b82f6",
    governance: "#8b5cf6",
  };

  const tierLabels = {
    hot: "HOT — Operational Liquidity",
    warm: "WARM — Active Operations",
    cold: "COLD — Long-term Storage",
    governance: "GOVERNANCE — Protocol Control",
  };

  const tiers = ["hot", "warm", "cold", "governance"] as const;

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Vault Architecture"
        subtitle="12 canonical vault roles across 4 security tiers. MPC-only signing. Policy-enforced velocity limits."
        badge="CUSTODY"
        badgeColor="#10b981"
      />

      {/* Radial Overview */}
      <div className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-red-400">2</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
              Hot Vaults
            </div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">6</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
              Warm Vaults
            </div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">3</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
              Cold Vaults
            </div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-violet-400">1</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
              Governance Vault
            </div>
          </div>
        </div>
      </div>

      {/* Vault Tiers */}
      {tiers.map((tier) => {
        const tierVaults = vaultRoles.filter((v) => v.tier === tier);
        return (
          <div key={tier} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: tierColors[tier],
                  boxShadow: `0 0 10px ${tierColors[tier]}`,
                }}
              />
              <h2 className="text-sm font-medium uppercase tracking-widest" style={{ color: tierColors[tier] }}>
                {tierLabels[tier]}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tierVaults.map((vault, i) => (
                <motion.div
                  key={vault.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div
                    className={`glass-card p-5 cursor-pointer transition-all ${
                      selectedVault === vault.id ? "ring-1" : ""
                    }`}
                    style={{
                      borderTopWidth: "3px",
                      borderTopColor: vault.color,
                      ...(selectedVault === vault.id
                        ? {
                            ringColor: `${vault.color}40`,
                            boxShadow: `0 0 30px ${vault.color}15`,
                          }
                        : {}),
                    }}
                    onClick={() =>
                      setSelectedVault(
                        selectedVault === vault.id ? null : vault.id
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="font-mono font-bold text-sm"
                        style={{ color: vault.color }}
                      >
                        {vault.name}
                      </h3>
                      <span
                        className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          background: `${tierColors[tier]}15`,
                          color: tierColors[tier],
                        }}
                      >
                        {tier}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-4">
                      {vault.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Signing</span>
                        <span className="text-slate-300 font-mono">
                          {vault.signingThreshold}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Velocity</span>
                        <span className="text-slate-300 font-mono">
                          {vault.velocityLimit}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Chains</span>
                        <span className="text-slate-300 text-right">
                          {vault.chains.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Security Architecture Summary */}
      <GlassCard glowColor="#10b981" className="mt-8">
        <div className="text-center py-4">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">
            MPC-Only Signing Architecture
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Private keys never exist in memory. All signing operations flow through
            Fireblocks MPC with hardware-backed key shards. 3-of-5 minimum multisig.
            Vault policies enforce velocity limits and jurisdictional constraints.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
