export interface ProjectionYear {
  year: string;
  stablecoin: number;
  issuance: number;
  custody: number;
  execution: number;
  saas: number;
}

export const baseProjections: ProjectionYear[] = [
  { year: 'Y1', stablecoin: 2.5, issuance: 1.0, custody: 3.0, execution: 0.5, saas: 0.8 },
  { year: 'Y2', stablecoin: 8.0, issuance: 5.0, custody: 10.0, execution: 3.0, saas: 2.5 },
  { year: 'Y3', stablecoin: 25.0, issuance: 15.0, custody: 25.0, execution: 10.0, saas: 5.0 },
];

export interface RevenueModel {
  id: string;
  name: string;
  description: string;
  margin: string;
  capitalRequired: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  color: string;
  projectedY3: string;
}

export const revenueModels: RevenueModel[] = [
  {
    id: 'stablecoin-issuer',
    name: 'Stablecoin Issuer',
    description: 'Issue and manage fiat-backed stablecoins for cross-border settlement',
    margin: '5-10 bps on flow',
    capitalRequired: '$50M+ reserve',
    riskLevel: 'High',
    color: '#3b82f6',
    projectedY3: '$25M',
  },
  {
    id: 'institutional-custody',
    name: 'Institutional Custody',
    description: 'Multi-custodian orchestration with MPC signing and policy engine',
    margin: '30-50 bps AUC',
    capitalRequired: '$5M infrastructure',
    riskLevel: 'Medium',
    color: '#10b981',
    projectedY3: '$25M',
  },
  {
    id: 'token-issuance',
    name: 'Token Issuance Platform',
    description: 'Bond and RWA lifecycle management with deterministic state transitions',
    margin: '50-100 bps issuance',
    capitalRequired: '$10M+ deal flow',
    riskLevel: 'High',
    color: '#f59e0b',
    projectedY3: '$15M',
  },
  {
    id: 'execution-venue',
    name: 'Execution & Liquidity',
    description: 'Multi-venue routing with best-price execution and OTC capabilities',
    margin: '5-15 bps spread',
    capitalRequired: '$2M technology',
    riskLevel: 'Medium',
    color: '#8b5cf6',
    projectedY3: '$10M',
  },
  {
    id: 'compliance-saas',
    name: 'Compliance SaaS',
    description: 'Deterministic audit, surveillance, and regulatory reporting',
    margin: 'Subscription-based',
    capitalRequired: '$500K',
    riskLevel: 'Low',
    color: '#ef4444',
    projectedY3: '$5M',
  },
];

export const pathScenarios = [
  {
    id: 'path-a',
    name: 'Path A — Stablecoin Focus',
    capital: '$50M',
    y3Revenue: '$50M+',
    description: 'Federal stablecoin license, bank/trust partnership, cross-border settlement dominance',
  },
  {
    id: 'path-b',
    name: 'Path B — Issuance Focus',
    capital: '$10M',
    y3Revenue: '$30M',
    description: 'Bond/RWA issuance platform, institutional deal flow, custody bundling',
  },
  {
    id: 'path-c',
    name: 'Path C — Custody/SaaS',
    capital: '$2M',
    y3Revenue: '$15M',
    description: 'Lowest capital path. Multi-custodian orchestration + compliance licensing',
  },
];

export function calculateRevenue(flowVolume: number, margin: number): number {
  return flowVolume * margin;
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}
