"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface StatusBadgeProps {
  status: "active" | "warning" | "critical" | "inactive";
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = {
    active: { bg: "#10b98120", text: "#10b981", border: "#10b98140", dot: "#10b981" },
    warning: { bg: "#f59e0b20", text: "#f59e0b", border: "#f59e0b40", dot: "#f59e0b" },
    critical: { bg: "#ef444420", text: "#ef4444", border: "#ef444440", dot: "#ef4444" },
    inactive: { bg: "#6b728020", text: "#6b7280", border: "#6b728040", dot: "#6b7280" },
  };

  const c = colors[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
        style={{ background: c.dot, boxShadow: `0 0 6px ${c.dot}` }}
      />
      {label}
    </span>
  );
}

interface ToggleProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function ModeToggle({ options, value, onChange }: ToggleProps) {
  return (
    <div className="inline-flex items-center gap-0 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            value === opt ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {value === opt && (
            <motion.div
              layoutId="mode-toggle"
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.2))",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{opt}</span>
        </button>
      ))}
    </div>
  );
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function ExpandableSection({ title, children, defaultOpen = false }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/3 transition-colors"
      >
        <span className="text-sm font-medium text-white">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-white/5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
