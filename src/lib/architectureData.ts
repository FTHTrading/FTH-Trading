export interface ArchitectureLayer {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  colorDim: string;
  glowClass: string;
  icon: string;
  modules: string[];
  description: string;
  revenueImpact: string;
}

export const layers: ArchitectureLayer[] = [
  {
    id: 'infra',
    name: 'Layer 1 — INFRA',
    subtitle: 'Deterministic Ledger & Audit Core',
    color: '#3b82f6',
    colorDim: '#1e40af',
    glowClass: 'glow-blue',
    icon: '🟦',
    modules: [
      'Hash-Chained Ledger (SHA-256)',
      'Domain-Separated Hashing',
      'Sovereign Verifier',
      'Genesis Ceremony Engine',
      'Freeze Manifest Protocol',
      'Kernel Anchor API',
      'Tamper Detection (Automatic)',
    ],
    description:
      'The immutable foundation. Every operation is hash-chained, domain-separated, and cryptographically anchored. Tamper attempts are detected and rejected by mathematics — not policy.',
    revenueImpact: 'Audit licensing · Compliance-as-a-Service · 15-25 bps',
  },
  {
    id: 'custody',
    name: 'Layer 2 — CUSTODY',
    subtitle: 'Custody & Treasury Orchestration',
    color: '#10b981',
    colorDim: '#065f46',
    glowClass: 'glow-emerald',
    icon: '🟩',
    modules: [
      'Fireblocks MPC Integration',
      'BitGo Multi-Custody',
      'Anchorage Digital',
      'Vault Ledger (12 Canonical Roles)',
      'Velocity Controls',
      'Policy Engine',
      'Hot/Warm/Cold Architecture',
    ],
    description:
      'Multi-custodian orchestration layer with MPC-only signing, 3-of-5 multisig, velocity limits, and automatic halt on provider outage. Keys never exist in memory.',
    revenueImpact: 'Custody fees · 30-50 bps AUC · $10M+ per $2B managed',
  },
  {
    id: 'issuance',
    name: 'Layer 3 — ISSUANCE',
    subtitle: 'Token Issuance & Structured Products',
    color: '#f59e0b',
    colorDim: '#92400e',
    glowClass: 'glow-gold',
    icon: '🟨',
    modules: [
      'Bond Lifecycle Engine',
      'Subscription Engine',
      'Funding Orchestrator',
      'Collateral Manager',
      'Stablecoin Treasury Rail',
      'Circle USDC Integration',
      'Cross-Border Settlement',
    ],
    description:
      'Full-lifecycle token issuance from DRAFT → APPROVED → SUBSCRIPTION → FUNDED → ACTIVE → MATURED → REDEEMED. Supports bonds, RWAs, and structured products with deterministic state transitions.',
    revenueImpact: 'Issuance fees · 50-100 bps · Stablecoin flow margin 5-10 bps',
  },
  {
    id: 'venue',
    name: 'Layer 4 — VENUE',
    subtitle: 'Execution & Liquidity',
    color: '#8b5cf6',
    colorDim: '#5b21b6',
    glowClass: 'glow-violet',
    icon: '🟪',
    modules: [
      'Coinbase Prime Execution',
      'Kraken Institutional',
      'OTC Desk Integration',
      'XRPL Payment Channels',
      'Stellar Anchor Protocol',
      'Cross-Chain Settlement',
      'Liquidity Aggregation',
    ],
    description:
      'Multi-venue execution with best-price routing, OTC capabilities, and cross-chain settlement. Institutional-grade with pre-trade compliance checks.',
    revenueImpact: 'Execution spread · 5-15 bps · Volume-based revenue',
  },
  {
    id: 'compliance',
    name: 'Layer 5 — COMPLIANCE',
    subtitle: 'Regulatory & Compliance Framework',
    color: '#ef4444',
    colorDim: '#991b1b',
    glowClass: 'glow-crimson',
    icon: '🟥',
    modules: [
      'Mode Isolation Guards',
      'Failure Matrix (Zero Undefined States)',
      'System Mode Guard',
      'Telemetry & Surveillance',
      'Regulatory Reporting',
      'AML/KYC Integration Points',
      'Audit Trail Generation',
    ],
    description:
      'Architectural separation at runtime — not permissions. Each mode (INFRA, ISSUER, VENUE) can be spun into a separate regulated entity. Zero undefined failure states.',
    revenueImpact: 'Compliance licensing · Regulatory reporting SaaS',
  },
];

export const chainSupport = [
  { name: 'Bitcoin', tier: 'Settlement Anchor', status: 'active' },
  { name: 'Ethereum', tier: 'Smart Contracts', status: 'active' },
  { name: 'XRPL', tier: 'Payment Channels', status: 'live-testnet' },
  { name: 'Stellar', tier: 'Anchor Protocol', status: 'routing' },
  { name: 'Polygon', tier: 'L2 Execution', status: 'active' },
  { name: 'Cardano', tier: 'Governance (CIP-1694)', status: 'active' },
  { name: 'Solana', tier: 'High-Speed Execution', status: 'active' },
  { name: 'Avalanche', tier: 'Subnet Architecture', status: 'active' },
  { name: 'Arbitrum', tier: 'L2 Settlement', status: 'active' },
  { name: 'Optimism', tier: 'L2 Settlement', status: 'active' },
  { name: 'Base', tier: 'Coinbase L2', status: 'active' },
  { name: 'Cosmos', tier: 'IBC Cross-Chain', status: 'active' },
  { name: 'Polkadot', tier: 'Parachain Bridge', status: 'active' },
];
