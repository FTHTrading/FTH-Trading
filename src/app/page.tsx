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

const whyNowReasons = [
  {
    icon: "⚠",
    title: "Capital markets are migrating to multi-chain environments",
    detail: "Institutional flows now span Ethereum, Solana, XRPL, Polygon, Avalanche, and more. No single-chain assumption holds.",
  },
  {
    icon: "🔓",
    title: "Traditional custody systems are not deterministic",
    detail: "Existing platforms rely on permission checks, not invariant enforcement. When permissions fail, undefined states emerge.",
  },
  {
    icon: "💥",
    title: "Cross-chain settlement introduces undefined failure states",
    detail: "Bridge collapses, reorgs, and oracle failures create gaps that no permission-based system can prevent.",
  },
  {
    icon: "⚖",
    title: "Regulatory enforcement now requires architectural isolation",
    detail: "MiCA, SEC digital asset rules, and Basel III crypto exposure limits demand separation at the infrastructure layer — not the application layer.",
  },
  {
    icon: "🧱",
    title: "Most crypto infrastructure is permission-based, not invariant-based",
    detail: "Permissions can be overridden. Invariants cannot. The difference is the difference between trust and proof.",
  },
];

const whyNowCatalysts = [
  {
    year: "2024–2025",
    catalyst: "Stablecoin Legislation Standardizes Reserve Expectations",
    detail:
      "The EU's MiCA framework and pending US stablecoin bills require issuers to prove reserve composition, redemption mechanics, and segregation in real time. Permission-based reporting cannot satisfy this. Deterministic state enforcement can.",
    color: "#3b82f6",
  },
  {
    year: "2025–2026",
    catalyst: "Multi-Chain Settlement Complexity Exceeds Manual Governance",
    detail:
      "Institutional flows now span 13+ chains. Bridge failures, reorgs, and oracle disputes create undefined settlement states that no human governance committee can adjudicate in real time. Automated invariant enforcement becomes the only viable path.",
    color: "#8b5cf6",
  },
  {
    year: "2025–2027",
    catalyst: "Regulators Require Architectural — Not Policy — Isolation",
    detail:
      "SEC, ESMA, and MAS are shifting from \"show us your compliance policy\" to \"show us your architectural separation.\" Mode isolation (INFRA / ISSUER / VENUE) is designed exactly for this transition.",
    color: "#ef4444",
  },
  {
    year: "2026–2028",
    catalyst: "Institutional Digital Asset Custody Reaches $10T+ AUM",
    detail:
      "BlackRock, Fidelity, State Street, and sovereign wealth funds are moving on-chain. They will not accept custody infrastructure that has undefined failure states. The bar is deterministic proofs, not dashboards.",
    color: "#10b981",
  },
  {
    year: "2026–2029",
    catalyst: "RWA Tokenization Scales Beyond Pilot Programs",
    detail:
      "Real-world asset tokenization (bonds, real estate, commodities) requires lifecycle state machines — issuance, coupon, maturity, redemption — enforced at the infrastructure layer. This is the core of FTH OS.",
    color: "#f59e0b",
  },
];

const personas = [
  {
    role: "Infrastructure Operators",
    need: "Deterministic settlement backbone",
    detail: "Deploy a runtime where every transaction, every state change, every failure path is defined in advance. No undefined behavior. No exceptions.",
    color: "#3b82f6",
    icon: "🔧",
  },
  {
    role: "Asset Issuers",
    need: "Bond + collateral lifecycle enforcement",
    detail: "Issue tokenized bonds with lifecycle state machines that enforce compliance at every stage — from subscription to redemption.",
    color: "#f59e0b",
    icon: "📜",
  },
  {
    role: "Trading Venues",
    need: "Mode isolation + surveillance",
    detail: "Run execution environments that are architecturally separated from custody and issuance. Not by policy. By design.",
    color: "#8b5cf6",
    icon: "📊",
  },
  {
    role: "Regulators",
    need: "Provable invariant enforcement + halting logic",
    detail: "Audit a system where every constraint is machine-verifiable, every failure is registered, and every halt condition is deterministic.",
    color: "#ef4444",
    icon: "🏛",
  },
  {
    role: "Custodians",
    need: "Vault topology + policy engine enforcement",
    detail: "Integrate with a 12-role vault architecture across 4 security tiers with MPC signing thresholds and velocity limits.",
    color: "#10b981",
    icon: "🔐",
  },
];

const verificationItems = [
  { label: "Hash Chain Structure", desc: "SHA-256 linked ledger entries. Every state transition is content-addressed and tamper-evident." },
  { label: "Snapshot Equivalence", desc: "Any two nodes replaying the same inputs produce byte-identical ledger state." },
  { label: "Deterministic Replay", desc: "Full audit replay from genesis. No external state required. No non-determinism." },
  { label: "Public Anchoring", desc: "XRPL testnet anchoring with verifiable transaction proofs. Bridgeable to mainnet." },
  { label: "Freeze Manifest", desc: "Cryptographically signed ceremony binding genesis block, invariants table, and author identity." },
  { label: "Independent Verifier CLI", desc: "Third-party verification tool. Validate the entire ledger without trusting the runtime." },
];

const governanceItems = [
  { label: "Mode Isolation", desc: "INFRA, ISSUER, and VENUE are architecturally separated. Cross-mode operations are rejected at runtime boundary.", color: "#3b82f6" },
  { label: "Vault Signer Distribution", desc: "Multi-party computation across custodians. No single party can sign. Quorum thresholds per tier.", color: "#10b981" },
  { label: "Halt Conditions", desc: "9 invariants with HALT/BLOCK/WARN severity. Violating a HALT invariant stops the entire system.", color: "#ef4444" },
  { label: "Failure Matrix", desc: "147 registered failure states. 147 covered. 0 undefined. 100% coverage is a hard requirement.", color: "#f59e0b" },
  { label: "External Audit Pathways", desc: "DOI-registered publications, IPFS content-addressed proofs, ORCID-linked author credentials.", color: "#8b5cf6" },
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
              Deterministic Execution Infrastructure
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
            Deterministic execution infrastructure for regulated digital capital markets.
          </p>
          <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
            Custody · Issuance · Settlement · Surveillance
            <br />
            Across 13 Chains · 3 Isolated Modes · Zero Undefined Failure States
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

      {/* ═══════════ WHY THIS EXISTS ═══════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-20"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">
          Why This Exists
        </h2>
        <p className="text-2xl font-bold text-white mb-2">
          Why Deterministic Runtime Infrastructure Is Required
        </p>
        <p className="text-sm text-slate-400 max-w-3xl mb-8">
          Institutional capital cannot safely operate in digital asset environments
          built on permission-based assumptions. The next generation of capital markets
          infrastructure must enforce constraints — not request them.
        </p>

        <div className="space-y-3 mb-8">
          {whyNowReasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="glass-card p-5 flex items-start gap-4"
              style={{ borderLeftWidth: "3px", borderLeftColor: "#3b82f6" }}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{reason.icon}</span>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {reason.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {reason.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Thesis Statement */}
        <div
          className="p-6 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))",
            border: "1px solid rgba(59,130,246,0.2)",
            boxShadow: "0 0 60px rgba(59,130,246,0.1)",
          }}
        >
          <p className="text-lg text-white font-semibold leading-relaxed max-w-2xl mx-auto">
            FTH OS exists to eliminate undefined states in digital capital systems.
          </p>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">
            This is not optional infrastructure. This is required infrastructure.
          </p>
        </div>
      </motion.section>

      {/* ═══════════ WHY NOW ═══════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-20"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">
          Market Timing
        </h2>
        <p className="text-2xl font-bold text-white mb-2">
          Why Now — The Inevitability Window
        </p>
        <p className="text-sm text-slate-400 max-w-3xl mb-8">
          Five converging forces make deterministic execution infrastructure unavoidable
          within the next 3–5 years. This is not a prediction. It is a reading of regulatory
          text, capital flows, and infrastructure failure rates already in motion.
        </p>

        <div className="space-y-3 mb-8">
          {whyNowCatalysts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="glass-card p-5 flex items-start gap-4"
              style={{ borderLeftWidth: "3px", borderLeftColor: item.color }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.year}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.catalyst}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Convergence Statement */}
        <div
          className="p-5 rounded-xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(16,185,129,0.06))",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            These are not speculative trends. MiCA is enacted. Stablecoin bills are in committee.
            BlackRock&apos;s BUIDL fund is live. The question is not <em>whether</em> deterministic
            infrastructure will be required — it is <em>who builds it first</em>.
          </p>
        </div>
      </motion.section>

      {/* ═══════════ WHO THIS IS FOR ═══════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">
          Personas
        </h2>
        <p className="text-2xl font-bold text-white mb-8">
          Who This Is For
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((persona, i) => (
            <GlassCard key={persona.role} glowColor={persona.color} delay={i * 0.06}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{persona.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm">{persona.role}</h3>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: persona.color }}>
                    {persona.need}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {persona.detail}
              </p>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* ═══════════ VERIFICATION & REPRODUCIBILITY ═══════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-20"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">
          Institutional Credibility
        </h2>
        <p className="text-2xl font-bold text-white mb-2">
          Verification & Reproducibility
        </p>
        <p className="text-sm text-slate-400 max-w-3xl mb-8">
          Every claim is machine-verifiable. Every state is reproducible. External parties
          can independently verify this runtime without trusting any operator.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {verificationItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="glass-card p-5"
              style={{ borderTopWidth: "2px", borderTopColor: "#10b981" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }}
                />
                <h3 className="text-white font-semibold text-sm">{item.label}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════ GOVERNANCE & OVERSIGHT ═══════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">
          Risk Mitigation
        </h2>
        <p className="text-2xl font-bold text-white mb-2">
          Governance & Oversight
        </p>
        <p className="text-sm text-slate-400 max-w-3xl mb-8">
          Power without governance is opacity. Every enforcement mechanism is visible,
          auditable, and constrained by design.
        </p>

        <div className="space-y-3">
          {governanceItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="glass-card p-5 flex items-start gap-4"
              style={{ borderLeftWidth: "3px", borderLeftColor: item.color }}
            >
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

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
