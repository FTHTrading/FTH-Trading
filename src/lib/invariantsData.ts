export interface Invariant {
  id: string;
  name: string;
  category: 'custody' | 'settlement' | 'governance' | 'issuance' | 'runtime';
  severity: 'HALT' | 'BLOCK' | 'WARN';
  description: string;
  enforcement: string;
  color: string;
}

export const invariants: Invariant[] = [
  {
    id: 'no-custody-guard',
    name: 'NoCustodyGuard',
    category: 'custody',
    severity: 'HALT',
    description: 'System enters HALT state if all custody providers are unavailable',
    enforcement: 'Automatic. No manual override possible.',
    color: '#ef4444',
  },
  {
    id: 'mpc-only-signing',
    name: 'MPC-Only Signing',
    category: 'custody',
    severity: 'HALT',
    description: 'All transaction signing via Fireblocks MPC. Keys never exist in memory.',
    enforcement: '3-of-5 multisig. Hardware-backed key shards.',
    color: '#ef4444',
  },
  {
    id: 'velocity-limits',
    name: 'Velocity Controls',
    category: 'custody',
    severity: 'BLOCK',
    description: '$10M per transaction, $50M daily cap. Exceeding triggers policy review.',
    enforcement: 'Policy engine pre-validates before signing request.',
    color: '#f59e0b',
  },
  {
    id: 'hash-chain-integrity',
    name: 'Hash Chain Integrity',
    category: 'runtime',
    severity: 'HALT',
    description: 'Every entry is hash-chained to its predecessor. One byte change breaks the chain.',
    enforcement: 'SHA-256 domain-separated hashing. Tamper = immediate detection.',
    color: '#ef4444',
  },
  {
    id: 'mode-isolation',
    name: 'Mode Isolation Guard',
    category: 'runtime',
    severity: 'BLOCK',
    description: 'INFRA, ISSUER, and VENUE modes are architecturally separated.',
    enforcement: 'Cross-mode operations rejected at runtime boundary.',
    color: '#8b5cf6',
  },
  {
    id: 'zero-undefined-failures',
    name: 'Zero Undefined Failure States',
    category: 'runtime',
    severity: 'HALT',
    description: 'Every possible failure path is enumerated and handled.',
    enforcement: 'FailureMatrix validates complete coverage. Uncovered = build block.',
    color: '#ef4444',
  },
  {
    id: 'collateral-margin',
    name: 'Collateral Margin Guard',
    category: 'issuance',
    severity: 'WARN',
    description: 'Automatic margin warnings, calls, and liquidation triggers.',
    enforcement: 'State machine: ACTIVE → MARGIN_WARNING → MARGIN_CALL → LIQUIDATED',
    color: '#f59e0b',
  },
  {
    id: 'settlement-finality',
    name: 'Settlement Finality',
    category: 'settlement',
    severity: 'BLOCK',
    description: 'Cross-chain settlement requires cryptographic proof from anchor chain.',
    enforcement: 'Multi-tier anchoring: Bitcoin → XRPL → Polygon.',
    color: '#3b82f6',
  },
  {
    id: 'governance-quorum',
    name: 'Governance Quorum',
    category: 'governance',
    severity: 'BLOCK',
    description: 'Protocol changes require governance quorum via Cardano CIP-1694 style voting.',
    enforcement: 'On-chain governance with time-locked execution.',
    color: '#8b5cf6',
  },
];

export const failureMatrix = {
  totalStates: 147,
  coveredStates: 147,
  undefinedStates: 0,
  haltConditions: 12,
  blockConditions: 23,
  warnConditions: 18,
};
