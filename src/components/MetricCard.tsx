"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  color?: string;
  delay?: number;
}

export function MetricCard({
  label,
  value,
  sublabel,
  color = "#3b82f6",
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5"
    >
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
        {label}
      </div>
      <div
        className="text-3xl font-bold tracking-tight"
        style={{ color }}
      >
        {value}
      </div>
      {sublabel && (
        <div className="text-xs text-slate-400 mt-1">{sublabel}</div>
      )}
    </motion.div>
  );
}
