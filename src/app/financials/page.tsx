"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/GlassCard";
import { MetricCard } from "@/components/MetricCard";
import {
  baseProjections,
  revenueModels,
  pathScenarios,
  formatCurrency,
} from "@/lib/financialData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  AreaChart,
  Legend,
} from "recharts";

export default function FinancialsPage() {
  const [flowVolume, setFlowVolume] = useState(3_000_000_000);
  const [margin, setMargin] = useState(50);
  const [selectedPath, setSelectedPath] = useState("path-a");

  const dynamicRevenue = useMemo(
    () => flowVolume * (margin / 10000),
    [flowVolume, margin]
  );

  const chartData = baseProjections.map((p) => ({
    ...p,
    total: p.stablecoin + p.issuance + p.custody + p.execution + p.saas,
  }));

  const cumulativeData = baseProjections.map((p, i) => {
    const prevTotal =
      i > 0
        ? baseProjections
            .slice(0, i)
            .reduce(
              (acc, prev) =>
                acc +
                prev.stablecoin +
                prev.issuance +
                prev.custody +
                prev.execution +
                prev.saas,
              0
            )
        : 0;
    const current =
      p.stablecoin + p.issuance + p.custody + p.execution + p.saas;
    return { year: p.year, cumulative: prevTotal + current };
  });

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <PageHeader
        title="Financial Projections"
        subtitle="3-year revenue model with dynamic volume and margin controls. Three deployment paths."
        badge="FINANCIALS"
        badgeColor="#06b6d4"
      />

      {/* Dynamic Revenue Calculator */}
      <GlassCard glowColor="#3b82f6" hoverable={false} className="mb-10">
        <h3 className="text-white font-semibold mb-6">
          Dynamic Revenue Calculator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 block mb-3">
              Annual Flow Volume: {formatCurrency(flowVolume)}
            </label>
            <input
              type="range"
              min={100_000_000}
              max={20_000_000_000}
              step={100_000_000}
              value={flowVolume}
              onChange={(e) => setFlowVolume(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #3b82f6 ${
                  ((flowVolume - 100_000_000) / (20_000_000_000 - 100_000_000)) *
                  100
                }%, rgba(255,255,255,0.1) 0%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>$100M</span>
              <span>$20B</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 block mb-3">
              Margin: {margin} bps ({(margin / 100).toFixed(2)}%)
            </label>
            <input
              type="range"
              min={1}
              max={200}
              step={1}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #10b981 ${
                  (margin / 200) * 100
                }%, rgba(255,255,255,0.1) 0%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>1 bps</span>
              <span>200 bps</span>
            </div>
          </div>
        </div>
        <div
          className="mt-6 p-4 rounded-xl text-center"
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.25)",
          }}
        >
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
            Projected Annual Revenue
          </div>
          <div className="text-4xl font-bold text-white">
            {formatCurrency(dynamicRevenue)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {formatCurrency(flowVolume)} volume × {margin} bps margin
          </div>
        </div>
      </GlassCard>

      {/* Revenue Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <GlassCard hoverable={false}>
          <h3 className="text-white font-semibold mb-4">
            Revenue by Category (3-Year)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(6,7,20,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#e2e8f0",
                  }}
                  formatter={(value) => [`$${value}M`, ""]}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Bar dataKey="stablecoin" name="Stablecoin" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="issuance" name="Issuance" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="custody" name="Custody" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="execution" name="Execution" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saas" name="SaaS" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard hoverable={false}>
          <h3 className="text-white font-semibold mb-4">
            Cumulative Revenue Growth
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeData}>
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(6,7,20,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#e2e8f0",
                  }}
                  formatter={(value) => [`$${value}M`, "Cumulative"]}
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#3b82f6"
                  fill="url(#colorCumulative)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Revenue Models */}
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
        Revenue Models
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {revenueModels.map((model, i) => (
          <GlassCard key={model.id} glowColor={model.color} delay={i * 0.05}>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: model.color }}
            >
              {model.name}
            </div>
            <p className="text-sm text-slate-400 mb-4">{model.description}</p>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Margin</span>
                <span className="text-slate-300">{model.margin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capital</span>
                <span className="text-slate-300">{model.capitalRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Risk</span>
                <span
                  style={{
                    color:
                      model.riskLevel === "High"
                        ? "#ef4444"
                        : model.riskLevel === "Medium"
                        ? "#f59e0b"
                        : "#10b981",
                  }}
                >
                  {model.riskLevel}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5">
                <span className="text-slate-500">Y3 Projected</span>
                <span className="text-white font-bold">{model.projectedY3}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Deployment Paths */}
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-5">
        Deployment Paths
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pathScenarios.map((path) => (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path.id)}
            className="text-left"
          >
            <GlassCard
              glowColor={
                selectedPath === path.id ? "#3b82f6" : undefined
              }
              hoverable
            >
              <h3 className="text-white font-semibold mb-2">{path.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{path.description}</p>
              <div className="flex justify-between text-[11px]">
                <div>
                  <span className="text-slate-500">Capital</span>
                  <div className="text-white font-bold">{path.capital}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Y3 Revenue</span>
                  <div className="text-emerald-400 font-bold">
                    {path.y3Revenue}
                  </div>
                </div>
              </div>
            </GlassCard>
          </button>
        ))}
      </div>
    </div>
  );
}
