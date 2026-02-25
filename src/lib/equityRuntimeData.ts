// ============================================================================
// FTH Trading — Equity Runtime Data Model
// ============================================================================

export interface RuntimeModule {
  layer: string;
  name: string;
  module: string;
  mode: "ISSUER" | "VENUE" | "INFRA";
  color: string;
  colorDim: string;
  chains: number;
  tests: number;
  description: string;
  keyCapabilities: string[];
  invariants: string[];
  icon: string;
}

export const equityRuntimeModules: RuntimeModule[] = [
  {
    layer: "L1",
    name: "Equity Token Standard (ERS)",
    module: "EquityTokenStandard",
    mode: "ISSUER",
    color: "#3b82f6",
    colorDim: "#1e40af",
    chains: 6,
    tests: 7,
    description:
      "Every tokenized equity is a state machine, not a balance entry. Eight-state FSM with jurisdiction-aware restrictions, cap table synchronization, and append-only audit trail.",
    keyCapabilities: [
      "8-state finite state machine (DRAFT → WOUND_DOWN)",
      "5 equity classes (Common, Preferred, Restricted, Convertible, Founders)",
      "6 transfer restriction types",
      "Jurisdiction whitelist enforcement",
      "Cap table issuance guard",
    ],
    invariants: [
      "No issuance beyond authorized cap — totalIssued ≤ totalAuthorized",
      "Every state transition is deterministic and logged",
      "No token exists without ≥1 whitelisted jurisdiction",
    ],
    icon: "🏛️",
  },
  {
    layer: "L2",
    name: "Identity Gate",
    module: "IdentityGate",
    mode: "INFRA",
    color: "#10b981",
    colorDim: "#065f46",
    chains: 6,
    tests: 4,
    description:
      "Every wallet is bound to a verified identity. Transfers execute only when both sender and receiver satisfy all 8 compliance predicates. No discretionary overrides.",
    keyCapabilities: [
      "8-point deterministic compliance gate",
      "5 investor types · 6 accreditation levels · 5 risk tiers",
      "Jurisdiction transfer matrix (ISO 3166-1)",
      "KYC expiry enforcement",
      "Verifiable Credential support",
    ],
    invariants: [
      "TIER_5_PROHIBITED wallets cannot register",
      "Transfer allowed iff ALL 8 checks pass",
      "jurisdictionTag must be ISO 3166-1 alpha-2 (2 chars)",
    ],
    icon: "🔐",
  },
  {
    layer: "L3",
    name: "Deterministic Pricing Engine",
    module: "DeterministicPricingEngine",
    mode: "VENUE",
    color: "#f59e0b",
    colorDim: "#92400e",
    chains: 6,
    tests: 3,
    description:
      "Multi-source weighted pricing with formula versioning and volatility damping. Same inputs always produce the same price. No oracle discretion.",
    keyCapabilities: [
      "5 price source types with configurable weights",
      "Formula-versioned — every price records formulaVersion",
      "Volatility damping (0.85 coefficient)",
      "Spread floor enforcement (10 bps minimum)",
      "Full weight decomposition in every result",
    ],
    invariants: [
      "Same inputs → same price, always (deterministic: true)",
      "Minimum 2 sources required — no single-source pricing",
      "Formula weight changes require version bump",
    ],
    icon: "📊",
  },
  {
    layer: "L4",
    name: "Institutional Risk Framework",
    module: "InstitutionalRiskFramework",
    mode: "INFRA",
    color: "#ef4444",
    colorDim: "#991b1b",
    chains: 6,
    tests: 5,
    description:
      "6-dimensional risk evaluation for every position. Concentration, leverage, counterparty, settlement, liquidity, and margin dimensions evaluated simultaneously.",
    keyCapabilities: [
      "6-dimensional risk scoring per position",
      "Margin state machine (NONE → LIQUIDATED)",
      "Volatility-conditional decision rules",
      "Per-holder, per-token evaluation history",
      "Automatic block flag on any BREACH dimension",
    ],
    invariants: [
      "All 6 dimensions evaluated on every call",
      "Overall risk = highest individual dimension",
      "leverage > 2.5x AND volatility > 0.35 → RESTRICT + INCREASE_MARGIN",
    ],
    icon: "⚠️",
  },
  {
    layer: "L5",
    name: "Equity Collateral & Lending Engine",
    module: "EquityCollateralEngine",
    mode: "VENUE",
    color: "#8b5cf6",
    colorDim: "#5b21b6",
    chains: 6,
    tests: 6,
    description:
      "Institutional-grade collateral management with automatic margin state transitions. LTV monitoring triggers WARNING → MARGIN_CALL → LIQUIDATION automatically.",
    keyCapabilities: [
      "Position lifecycle: OPEN → ACTIVE → WARNING → LIQUIDATING → CLOSED",
      "Default terms: 65% max LTV, $50K minimum collateral, 850 bps",
      "4 liquidation strategies",
      "Auto-transition on valuation update",
      "Full repayment auto-close",
    ],
    invariants: [
      "Position cannot open above max LTV (65%)",
      "Collateral must meet $50,000 minimum",
      "LTV > 70% auto-triggers LIQUIDATING state",
    ],
    icon: "💰",
  },
  {
    layer: "L6",
    name: "Lifecycle Governance Engine",
    module: "EquityLifecycleEngine",
    mode: "ISSUER",
    color: "#06b6d4",
    colorDim: "#0e7490",
    chains: 6,
    tests: 4,
    description:
      "Multi-gate approval workflow for 9 corporate lifecycle event types. Simulation required before approval collection. Wind-down requires unanimous 5-gate consent.",
    keyCapabilities: [
      "9 lifecycle event types (Issuance through Wind-Down)",
      "5 approval types with per-event requirements",
      "Mandatory simulation step before approvals",
      "Auto-transition to APPROVED when all gates pass",
      "Full audit trail per event",
    ],
    invariants: [
      "No execution without simulation",
      "All required approvals must be collected",
      "Wind-down requires ALL 5 approval types",
    ],
    icon: "🔄",
  },
  {
    layer: "L7a",
    name: "Cap Table Registry",
    module: "CapTableRegistry",
    mode: "ISSUER",
    color: "#ec4899",
    colorDim: "#9d174d",
    chains: 6,
    tests: 5,
    description:
      "Authoritative equity ownership record with on-chain reconciliation. Registry is the source of truth; on-chain balances are verified against it.",
    keyCapabilities: [
      "Holder registration with KYC binding",
      "6 share classes",
      "Point-in-time cap table snapshots",
      "On-chain ↔ registry reconciliation with delta reporting",
      "Transfer guards — no transfer exceeds available shares",
    ],
    invariants: [
      "total outstanding = Σ(all positions) always",
      "Snapshots are immutable once captured",
      "Reconciliation is non-destructive — reports only",
    ],
    icon: "📋",
  },
  {
    layer: "L7b",
    name: "Equity Audit Trail",
    module: "EquityAuditTrail",
    mode: "INFRA",
    color: "#14b8a6",
    colorDim: "#0f766e",
    chains: 6,
    tests: 5,
    description:
      "Hash-chained, append-only event log covering all 8 modules. Periodic Merkle root anchoring to supported chains. Integrity verifiable at any time.",
    keyCapabilities: [
      "8 tracked modules · 10 event categories · 4 severity levels",
      "SHA-256 hash chain (each event links to previous)",
      "Merkle root computation for on-chain anchoring",
      "Query by module, category, severity, time range",
      "Export with automatic chain integrity verification",
    ],
    invariants: [
      "Hash chain is append-only — no modification",
      "Chain integrity is verifiable at any time",
      "Anchors reference exact sequence ranges",
    ],
    icon: "🔗",
  },
];

export interface CompetitorComparison {
  capability: string;
  zoniqx: string;
  stockfi: string;
  fthOS: string;
}

export const competitorTable: CompetitorComparison[] = [
  {
    capability: "Token Standard",
    zoniqx: "Generic token wrapping",
    stockfi: "ERC-20 + metadata",
    fthOS: "Equity-native 8-state FSM",
  },
  {
    capability: "Identity",
    zoniqx: "Third-party KYC integration",
    stockfi: "Basic whitelist",
    fthOS: "8-point deterministic compliance gate",
  },
  {
    capability: "Pricing",
    zoniqx: "External oracle",
    stockfi: "Market price feed",
    fthOS: "5-source weighted deterministic engine",
  },
  {
    capability: "Risk",
    zoniqx: "Portfolio-level only",
    stockfi: "None",
    fthOS: "6-dimensional per-position evaluation",
  },
  {
    capability: "Lending",
    zoniqx: "Not offered",
    stockfi: "Basic borrow/lend",
    fthOS: "Full margin engine with auto-liquidation",
  },
  {
    capability: "Lifecycle",
    zoniqx: "Manual workflow",
    stockfi: "None",
    fthOS: "5-gate approval with simulation",
  },
  {
    capability: "Cap Table",
    zoniqx: "Third-party integration",
    stockfi: "Basic ledger",
    fthOS: "Authoritative registry + on-chain reconciliation",
  },
  {
    capability: "Audit",
    zoniqx: "Event logs",
    stockfi: "Transaction history",
    fthOS: "Hash-chained trail + Merkle anchoring",
  },
];

export const runtimeStats = {
  modules: 8,
  tests: 39,
  testsPassing: 39,
  chains: 6,
  stateTransitions: 10,
  complianceChecks: 8,
  riskDimensions: 6,
  approvalTypes: 5,
  lifecycleEvents: 9,
  equityClasses: 5,
  shareClasses: 6,
  priceSources: 5,
};
