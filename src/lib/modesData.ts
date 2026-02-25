export interface OperatingMode {
  id: string;
  name: string;
  entity: string;
  license: string;
  capitalRequired: string;
  riskProfile: string;
  riskColor: string;
  color: string;
  capabilities: string[];
  regulatoryBodies: string[];
}

export const operatingModes: OperatingMode[] = [
  {
    id: 'infra',
    name: 'INFRA',
    entity: 'Tech LLC / Foundation',
    license: 'None (Technology Provider)',
    capitalRequired: '$500K - $2M',
    riskProfile: 'Low',
    riskColor: '#10b981',
    color: '#3b82f6',
    capabilities: [
      'Deterministic ledger licensing',
      'Audit infrastructure SaaS',
      'Compliance engine API',
      'Genesis protocol research',
    ],
    regulatoryBodies: [],
  },
  {
    id: 'issuer',
    name: 'ISSUER',
    entity: 'Trust Company / Bank Partnership',
    license: 'State Trust Charter / OCC',
    capitalRequired: '$10M - $50M',
    riskProfile: 'High',
    riskColor: '#ef4444',
    color: '#f59e0b',
    capabilities: [
      'Stablecoin issuance',
      'Bond/RWA tokenization',
      'Custody operations',
      'Treasury management',
      'Cross-border settlement',
    ],
    regulatoryBodies: ['OCC', 'NYDFS', 'FinCEN', 'State regulators'],
  },
  {
    id: 'venue',
    name: 'VENUE',
    entity: 'Broker-Dealer Subsidiary',
    license: 'SEC/FINRA BD License',
    capitalRequired: '$5M - $25M',
    riskProfile: 'High',
    riskColor: '#ef4444',
    color: '#8b5cf6',
    capabilities: [
      'Multi-venue execution',
      'OTC desk',
      'Liquidity aggregation',
      'Market making',
      'Institutional trading',
    ],
    regulatoryBodies: ['SEC', 'FINRA', 'CFTC'],
  },
];

export const integrations = [
  { name: 'Fireblocks', layer: 'INFRA', type: 'Custody / MPC', status: 'Integrated' },
  { name: 'BitGo', layer: 'INFRA', type: 'Multi-Custody', status: 'Integrated' },
  { name: 'Anchorage Digital', layer: 'INFRA', type: 'Qualified Custody', status: 'Integrated' },
  { name: 'Circle', layer: 'ISSUER', type: 'USDC / Stablecoin', status: 'Integrated' },
  { name: 'Chainlink', layer: 'ISSUER', type: 'Oracles / CCIP / VRF / Automation', status: 'BUILD Partner' },
  { name: 'Aave V3', layer: 'ISSUER', type: 'DeFi Lending', status: 'Grants Submitted' },
  { name: 'Coinbase Prime', layer: 'VENUE', type: 'Execution', status: 'Integrated' },
  { name: 'Kraken Institutional', layer: 'VENUE', type: 'Execution', status: 'Integrated' },
  { name: 'Cardano (CIP-1694)', layer: 'INFRA', type: 'Governance', status: 'Active' },
  { name: 'Bitcoin (Taproot)', layer: 'INFRA', type: 'Settlement Anchor', status: 'Active' },
  { name: 'XRPL', layer: 'ISSUER', type: 'Payment Channels', status: 'Live Testnet' },
  { name: 'Stellar', layer: 'ISSUER', type: 'Anchor Protocol', status: 'Routing Layer' },
];
