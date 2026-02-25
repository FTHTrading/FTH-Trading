"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  badgeColor = "#3b82f6",
  children,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-3">
        {badge && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: `${badgeColor}20`,
              color: badgeColor,
              border: `1px solid ${badgeColor}40`,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">{title}</h1>
      <p className="text-slate-400 mt-2 text-lg max-w-2xl">{subtitle}</p>
      {children}
    </motion.div>
  );
}
