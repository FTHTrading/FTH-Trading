"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  onClick?: () => void;
  hoverable?: boolean;
}

export function GlassCard({
  children,
  className = "",
  glowColor,
  delay = 0,
  onClick,
  hoverable = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverable ? { scale: 1.02, y: -2 } : undefined}
      onClick={onClick}
      className={`glass-card p-6 ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={
        glowColor
          ? {
              boxShadow: `0 0 40px ${glowColor}25, inset 0 0 40px ${glowColor}0d`,
              borderColor: `${glowColor}30`,
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
