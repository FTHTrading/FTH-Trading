"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineArrowPath,
  HiOutlinePlay,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineBriefcase,
  HiOutlineHome,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

const navItems = [
  { href: "/", label: "Overview", icon: HiOutlineHome },
  { href: "/architecture", label: "Architecture", icon: HiOutlineCube },
  { href: "/invariants", label: "Invariants", icon: HiOutlineShieldCheck },
  { href: "/vaults", label: "Vaults", icon: HiOutlineLockClosed },
  { href: "/lifecycle", label: "Lifecycle", icon: HiOutlineArrowPath },
  { href: "/demo", label: "Demo", icon: HiOutlinePlay },
  { href: "/financials", label: "Financials", icon: HiOutlineChartBar },
  { href: "/modes", label: "Modes", icon: HiOutlineCog6Tooth },
  { href: "/investor", label: "Investor", icon: HiOutlineBriefcase },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 z-50`}
      style={{
        background:
          "linear-gradient(180deg, rgba(6,7,20,0.98) 0%, rgba(6,7,20,0.95) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
            style={{
              background:
                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}
          >
            FTH
          </div>
          {!collapsed && (
            <div>
              <div className="text-white font-semibold text-sm tracking-wide">
                FTH OS v1
              </div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase">
                Capital Infrastructure
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-3 flex-1">
        <div className={`${collapsed ? "" : "px-2"} mb-3`}>
          {!collapsed && (
            <span className="text-[10px] uppercase tracking-widest text-slate-600 font-medium">
              Navigation
            </span>
          )}
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-white/8 text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-white/4"
                  } ${collapsed ? "justify-center" : ""}`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))",
                          border: "1px solid rgba(59,130,246,0.2)",
                        }
                      : {}
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#3b82f6",
                        boxShadow: "0 0 8px #3b82f6",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mode Toggle */}
      <div className="p-4 border-t border-white/5">
        {!collapsed && (
          <div className="glass-card p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              <span className="text-[10px] uppercase tracking-widest text-slate-400">
                System Status
              </span>
            </div>
            <div className="text-xs text-slate-300">
              All invariants active
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              345 tests · 0 failures · 13 chains
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          {collapsed ? (
            <HiOutlineChevronRight className="w-4 h-4" />
          ) : (
            <HiOutlineChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
