export interface DemoStep {
  id: number;
  title: string;
  subtitle: string;
  narrative: string;
  technicalDetail: string;
  revenueLink: string;
  visual: 'terminal' | 'diagram' | 'chart' | 'explorer';
  terminalOutput?: string;
}

export const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Enterprise Client Sends $5M Cross Border',
    subtitle: 'Stablecoin Treasury Rail',
    narrative:
      'A Fortune 500 company needs to move $5M from New York to Singapore. Traditional wire: 3-5 days, $15K+ in fees. FTH: 8 seconds, $50.',
    technicalDetail:
      'Client deposit triggers FTH Treasury allocation → Circle USDC mint → XRPL payment channel → Stellar anchor → Local fiat redemption. Full cycle hash-anchored.',
    revenueLink: '5-10 bps on $5M = $2,500-$5,000 per transaction',
    visual: 'diagram',
  },
  {
    id: 2,
    title: 'FX Savings Calculated',
    subtitle: 'Cost Comparison Engine',
    narrative:
      'The system automatically calculates savings vs traditional banking rails. At scale ($1B/month flow), savings exceed $2M/month for the client.',
    technicalDetail:
      'Real-time FX rate comparison engine. Spread: 0.05% vs bank 1-3%. Settlement: T+0 vs T+2.',
    revenueLink: 'Spread capture + settlement speed premium',
    visual: 'chart',
  },
  {
    id: 3,
    title: 'Deterministic Ledger Anchor',
    subtitle: 'Hash Chain Verification',
    narrative:
      'Every transaction is hash-chained. If anyone—including an insider—tries to modify history, the entire chain breaks. This is mathematics, not policy.',
    technicalDetail:
      'SHA-256 domain-separated hashing. Each entry: H(domain || previous_hash || payload). 71 assertions verify chain integrity.',
    revenueLink: 'Audit licensing: 15-25 bps',
    visual: 'terminal',
    terminalOutput: `┌─────────────────────────────────────────────┐
│  HASH CHAIN VERIFICATION                    │
│  ✓ 71 entries verified                      │
│  ✓ Domain separation: VALID                 │
│  ✓ Tamper detection: ACTIVE                 │
│  ✓ Chain integrity: UNBROKEN                │
│                                              │
│  Hash: 5c580285...e4a1                      │
│  Entries: 71 | Failures: 0                  │
└─────────────────────────────────────────────┘`,
  },
  {
    id: 4,
    title: 'Custody Route Selection',
    subtitle: 'Multi-Custodian Orchestration',
    narrative:
      'The system selects the optimal custodian based on asset type, jurisdiction, amount, and policy. If Fireblocks goes down, the system halts—it does not degrade into unsafe mode.',
    technicalDetail:
      'Fireblocks MPC → BitGo fallback → Anchorage for qualified custody. Policy engine validates before signing. Velocity: $10M/tx, $50M/day.',
    revenueLink: 'Custody fees: 30-50 bps AUC',
    visual: 'diagram',
  },
  {
    id: 5,
    title: 'Audit Proof Generation',
    subtitle: 'Sovereign Verifier',
    narrative:
      'A complete cryptographic proof of the entire transaction lifecycle. Regulators, auditors, and counterparties can independently verify without trusting FTH.',
    technicalDetail:
      'Multi-tier anchoring: Bitcoin (Taproot) → XRPL (AccountSet memo) → Polygon (L2). Each tier independently verifiable via public explorer.',
    revenueLink: 'Compliance-as-a-Service: subscription revenue',
    visual: 'explorer',
    terminalOutput: `┌─────────────────────────────────────────────┐
│  AUDIT PROOF                                │
│                                              │
│  Tier 1: Bitcoin (Taproot)                  │
│  TX: bc1q...7f3k                            │
│                                              │
│  Tier 2: XRPL (AccountSet)                  │
│  TX: 3B335236...7BBD875                     │
│  Ledger: 15181730                           │
│                                              │
│  Tier 3: Polygon (L2)                       │
│  TX: 0xa4c2...8e1f                          │
│                                              │
│  Status: ANCHORED ✓                         │
└─────────────────────────────────────────────┘`,
  },
];

export const simulationScenarios = [
  {
    id: 'fireblocks-outage',
    name: 'Fireblocks Outage',
    description: 'Primary custody provider goes offline',
    expectedResult: 'System enters HALT state. No degraded mode. Zero fund risk.',
    severity: 'critical',
  },
  {
    id: 'margin-breach',
    name: 'Collateral Margin Breach',
    description: 'Asset price drops 40% in 1 hour',
    expectedResult: 'MARGIN_WARNING → MARGIN_CALL → Auto-liquidation if no cure.',
    severity: 'high',
  },
  {
    id: 'tamper-attempt',
    name: 'Ledger Tamper Attempt',
    description: 'Insider modifies historical transaction',
    expectedResult: 'Hash chain breaks. Tamper detected. Entry rejected. Alert fired.',
    severity: 'critical',
  },
  {
    id: 'mode-violation',
    name: 'Cross-Mode Violation',
    description: 'VENUE tries to access ISSUER custody',
    expectedResult: 'SystemModeGuard: BLOCKED. Operation rejected at runtime boundary.',
    severity: 'high',
  },
];
