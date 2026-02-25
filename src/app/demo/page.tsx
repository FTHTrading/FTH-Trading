"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { demoSteps, simulationScenarios } from "@/lib/demoData";

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simResult, setSimResult] = useState<string | null>(null);

  function runDemo() {
    setIsRunning(true);
    setCompletedSteps([]);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      setCompletedSteps((prev) => [...prev, step]);
      step++;
      if (step < demoSteps.length) {
        setActiveStep(step);
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 2500);
  }

  function runSimulation(id: string) {
    setActiveSimulation(id);
    setSimResult(null);
    setTimeout(() => {
      const scenario = simulationScenarios.find((s) => s.id === id);
      setSimResult(scenario?.expectedResult || "");
    }, 1500);
  }

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Interactive Demo"
        subtitle="Walk through a $25M bond issuance scenario. Simulate failures. See invariants enforce in real-time."
        badge="LIVE DEMO"
        badgeColor="#8b5cf6"
      />

      {/* Demo Controls */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={runDemo}
          disabled={isRunning}
          className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
          style={{
            background: isRunning
              ? "rgba(139,92,246,0.3)"
              : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            boxShadow: isRunning ? "none" : "0 4px 20px rgba(139,92,246,0.4)",
          }}
        >
          {isRunning ? "Running Demo..." : "▶ Run Full Demo"}
        </button>
        <span className="text-xs text-slate-500">
          {completedSteps.length} / {demoSteps.length} steps complete
        </span>
        {completedSteps.length === demoSteps.length && completedSteps.length > 0 && (
          <span className="text-xs text-emerald-400 font-medium">
            ✓ All steps verified
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-1 rounded-full bg-white/5 mb-10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #8b5cf6, #3b82f6)" }}
          animate={{
            width: `${(completedSteps.length / demoSteps.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Demo Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Step List */}
        <div className="space-y-2">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
            Scenario Steps
          </h3>
          {demoSteps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = activeStep === i;

            return (
              <button
                key={step.id}
                onClick={() => !isRunning && setActiveStep(i)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1))",
                        border: "1px solid rgba(139,92,246,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{
                      background: isCompleted
                        ? "rgba(16,185,129,0.2)"
                        : isActive
                        ? "rgba(139,92,246,0.2)"
                        : "rgba(255,255,255,0.05)",
                      color: isCompleted
                        ? "#10b981"
                        : isActive
                        ? "#8b5cf6"
                        : "#6b7280",
                    }}
                  >
                    {isCompleted ? "✓" : step.id}
                  </div>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard glowColor="#8b5cf6" hoverable={false}>
                <div className="mb-4">
                  <span
                    className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      color: "#8b5cf6",
                    }}
                  >
                    Step {demoSteps[activeStep].id}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {demoSteps[activeStep].title}
                </h2>
                <p className="text-sm text-slate-400 mb-1">
                  {demoSteps[activeStep].subtitle}
                </p>

                <div className="h-px bg-white/5 my-4" />

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                      Narrative
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {demoSteps[activeStep].narrative}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                      Technical Detail
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {demoSteps[activeStep].technicalDetail}
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    <h4 className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">
                      Revenue Link
                    </h4>
                    <p className="text-sm text-emerald-300">
                      {demoSteps[activeStep].revenueLink}
                    </p>
                  </div>

                  {demoSteps[activeStep].terminalOutput && (
                    <div
                      className="p-4 rounded-lg font-mono text-xs leading-relaxed"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <pre className="text-green-400 whitespace-pre">
                        {demoSteps[activeStep].terminalOutput}
                      </pre>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Failure Simulations */}
      <div>
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
          Failure Simulations — Prove the Guardrails
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {simulationScenarios.map((scenario) => (
            <GlassCard
              key={scenario.id}
              glowColor={scenario.severity === "critical" ? "#ef4444" : "#f59e0b"}
              delay={0}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold text-sm">
                      {scenario.name}
                    </h3>
                    <span
                      className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          scenario.severity === "critical"
                            ? "rgba(239,68,68,0.15)"
                            : "rgba(245,158,11,0.15)",
                        color:
                          scenario.severity === "critical"
                            ? "#ef4444"
                            : "#f59e0b",
                      }}
                    >
                      {scenario.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {scenario.description}
                  </p>

                  {activeSimulation === scenario.id && simResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 rounded-lg font-mono text-xs mb-3"
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      <div className="text-green-400">✓ {simResult}</div>
                    </motion.div>
                  )}
                </div>
                <button
                  onClick={() => runSimulation(scenario.id)}
                  disabled={activeSimulation === scenario.id && !simResult}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {activeSimulation === scenario.id && !simResult
                    ? "Running..."
                    : "Simulate"}
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
