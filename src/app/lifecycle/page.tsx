"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import {
  bondLifecycle,
  collateralLifecycle,
  stablecoinFlow,
} from "@/lib/lifecycleData";

type TabType = "bond" | "collateral" | "stablecoin";

export default function LifecyclePage() {
  const [activeTab, setActiveTab] = useState<TabType>("bond");
  const [activeStage, setActiveStage] = useState<number>(0);

  const tabs: { id: TabType; label: string; color: string }[] = [
    { id: "bond", label: "Bond Issuance", color: "#f59e0b" },
    { id: "collateral", label: "Collateral Management", color: "#8b5cf6" },
    { id: "stablecoin", label: "Stablecoin Flow", color: "#3b82f6" },
  ];

  const currentLifecycle =
    activeTab === "bond"
      ? bondLifecycle
      : activeTab === "collateral"
      ? collateralLifecycle
      : null;

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Lifecycle State Machines"
        subtitle="Deterministic state transitions. Every stage has required invariants. No undefined transitions."
        badge="LIFECYCLE"
        badgeColor="#f59e0b"
      />

      {/* Tab Selector */}
      <div className="flex gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveStage(0);
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-white"
            }`}
            style={
              activeTab === tab.id
                ? {
                    background: `${tab.color}20`,
                    border: `1px solid ${tab.color}40`,
                    boxShadow: `0 0 20px ${tab.color}15`,
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lifecycle Stages (Bond & Collateral) */}
      {currentLifecycle && (
        <div className="mb-12">
          {/* Stage Flow Visualization */}
          <div className="flex flex-wrap items-center gap-2 mb-8 p-4 glass-card">
            {currentLifecycle.map((stage, i) => (
              <div key={stage.id} className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStage(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeStage === i ? "text-white scale-110" : "text-slate-400 hover:text-white"
                  }`}
                  style={
                    activeStage === i
                      ? {
                          background: `${stage.color}30`,
                          border: `1px solid ${stage.color}50`,
                          boxShadow: `0 0 15px ${stage.color}25`,
                        }
                      : {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }
                  }
                >
                  {stage.name}
                </button>
                {i < currentLifecycle.length - 1 && (
                  <span className="text-slate-600 text-xs">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Active Stage Detail */}
          <motion.div
            key={`${activeTab}-${activeStage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard
              glowColor={currentLifecycle[activeStage].color}
              hoverable={false}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                  style={{
                    background: `${currentLifecycle[activeStage].color}20`,
                    color: currentLifecycle[activeStage].color,
                    border: `1px solid ${currentLifecycle[activeStage].color}40`,
                  }}
                >
                  {activeStage + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {currentLifecycle[activeStage].name}
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    {currentLifecycle[activeStage].description}
                  </p>

                  <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                    Required Invariants
                  </h4>
                  <div className="space-y-2">
                    {currentLifecycle[activeStage].invariants.map((inv) => (
                      <div
                        key={inv}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#10b981",
                            boxShadow: "0 0 6px #10b981",
                          }}
                        />
                        <span className="text-slate-300">{inv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      {/* Stablecoin Flow */}
      {activeTab === "stablecoin" && (
        <div className="mb-12">
          <div className="space-y-4">
            {stablecoinFlow.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    color: "#3b82f6",
                    border: "1px solid rgba(59,130,246,0.3)",
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 glass-card p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {step.step}
                    </h4>
                    <p className="text-xs text-slate-400">{step.description}</p>
                  </div>
                  {i < stablecoinFlow.length - 1 && (
                    <span className="text-slate-600">→</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <GlassCard className="mt-6" glowColor="#3b82f6">
            <div className="text-center">
              <p className="text-sm text-slate-300">
                Full cycle: <span className="text-white font-bold">~8 seconds</span> vs
                traditional wire: <span className="text-slate-500">3-5 business days</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Cost: ~$50 vs $15,000+ for traditional cross-border settlement
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
