import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FTH OS v1 — Deterministic Execution Infrastructure",
  description:
    "Deterministic execution infrastructure for regulated digital capital markets. Custody · Issuance · Settlement · Surveillance across 13 chains with zero undefined failure states.",
  keywords: ["institutional", "custody", "stablecoin", "settlement", "blockchain", "DeFi", "deterministic", "capital markets"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#060714] text-slate-200`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen grid-bg">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
