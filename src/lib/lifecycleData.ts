export interface LifecycleStage {
  id: string;
  name: string;
  description: string;
  invariants: string[];
  color: string;
}

export const bondLifecycle: LifecycleStage[] = [
  {
    id: 'draft',
    name: 'DRAFT',
    description: 'Bond terms defined. Awaiting compliance review.',
    invariants: ['Issuer identity verified', 'Terms validated against regulatory template'],
    color: '#6b7280',
  },
  {
    id: 'approved',
    name: 'APPROVED',
    description: 'Compliance approved. Ready for investor subscription.',
    invariants: ['Regulatory approval on-chain', 'Collateral requirements set'],
    color: '#3b82f6',
  },
  {
    id: 'subscription',
    name: 'SUBSCRIPTION',
    description: 'Subscription period open. Investors committing capital.',
    invariants: ['KYC/AML verified per investor', 'Minimum subscription met'],
    color: '#8b5cf6',
  },
  {
    id: 'funded',
    name: 'FUNDED',
    description: 'Subscription closed. Capital in escrow.',
    invariants: ['Full amount in custody', 'Escrow hash-anchored'],
    color: '#f59e0b',
  },
  {
    id: 'active',
    name: 'ACTIVE',
    description: 'Bond issued. Coupon payments active.',
    invariants: ['Token minted on-chain', 'Custody verified', 'Coupon scheduler running'],
    color: '#10b981',
  },
  {
    id: 'matured',
    name: 'MATURED',
    description: 'Bond reached maturity. Redemption initiated.',
    invariants: ['Principal verified in vault', 'Final coupon calculated'],
    color: '#06b6d4',
  },
  {
    id: 'redeemed',
    name: 'REDEEMED',
    description: 'All holders redeemed. Bond lifecycle complete.',
    invariants: ['All tokens burned', 'Settlement finalized', 'Audit trail sealed'],
    color: '#14b8a6',
  },
];

export const collateralLifecycle: LifecycleStage[] = [
  {
    id: 'unencumbered',
    name: 'UNENCUMBERED',
    description: 'Asset free and clear. Available for pledging.',
    invariants: ['Ownership verified on-chain'],
    color: '#6b7280',
  },
  {
    id: 'pledged',
    name: 'PLEDGED',
    description: 'Asset pledged as collateral. Pending verification.',
    invariants: ['Pledge recorded in vault ledger'],
    color: '#3b82f6',
  },
  {
    id: 'verified',
    name: 'VERIFIED',
    description: 'Collateral verified and valued.',
    invariants: ['Oracle price feed confirmed', 'LTV ratio within bounds'],
    color: '#8b5cf6',
  },
  {
    id: 'active',
    name: 'ACTIVE',
    description: 'Collateral actively backing a position.',
    invariants: ['Continuous price monitoring', 'Margin ratio maintained'],
    color: '#10b981',
  },
  {
    id: 'margin-warning',
    name: 'MARGIN_WARNING',
    description: 'LTV approaching threshold. Warning issued.',
    invariants: ['Alert dispatched', 'Cure window opened'],
    color: '#f59e0b',
  },
  {
    id: 'margin-call',
    name: 'MARGIN_CALL',
    description: 'LTV breached. Additional collateral required.',
    invariants: ['Position frozen', 'Cure deadline set'],
    color: '#ef4444',
  },
  {
    id: 'margin-cure',
    name: 'MARGIN_CURE',
    description: 'Additional collateral posted. Position restored.',
    invariants: ['New collateral verified', 'LTV recalculated'],
    color: '#10b981',
  },
  {
    id: 'released',
    name: 'RELEASED',
    description: 'Position closed. Collateral returned.',
    invariants: ['All obligations settled', 'Collateral transferred back'],
    color: '#14b8a6',
  },
  {
    id: 'liquidated',
    name: 'LIQUIDATED',
    description: 'Cure period expired. Collateral liquidated.',
    invariants: ['Liquidation price locked', 'Proceeds distributed', 'Audit sealed'],
    color: '#991b1b',
  },
];

export const stablecoinFlow = [
  { step: 'Client Deposit', description: 'Fiat received via bank partner' },
  { step: 'Treasury Allocation', description: 'Funds allocated in FTH Treasury vault' },
  { step: 'Stablecoin Mint', description: 'USDC/custom stablecoin minted 1:1' },
  { step: 'Cross-Border Transfer', description: 'Settlement via XRPL/Stellar rail' },
  { step: 'Redemption', description: 'Recipient redeems to local fiat' },
  { step: 'Audit Anchor', description: 'Full cycle hash-anchored to ledger' },
];
