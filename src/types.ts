export type Language = "es" | "en";

export interface PropertyListing {
  id: string;
  title: { es: string; en: string };
  city: string;
  state: string;
  address: string;
  coordinates: { lat: number; lng: number };
  priceUsd: number;
  originalValuationUsd: number;
  projectedExitUsd: number;
  projectedRoi: string;
  sqft: number;
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  passivhausScore: string;
  energyRating: string;
  type: "sale" | "demand";
  featured: boolean;
  propertyType?: "Single Family" | "Luxury Villa" | "Modern Penthouse" | "Townhouse" | "Architectural Estate";
  yearBuilt?: number;
  zipCode?: string;
  neighborhood?: string;
  lotSizeSqft?: number;
  estMonthlyMortgageUsd?: number;
  investEstimateUsd?: number;
  priceChange30d?: string;
  statusBadge?: { es: string; en: string };
  stories?: number;
  images: string[];
  panoramaImage: string;
  hotspots: SpatialHotspot[];
  features: { es: string[]; en: string[] };
}

export interface SpatialHotspot {
  id: string;
  x: number; // percentage or degrees
  y: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
  materialUpgrade: { es: string; en: string };
  costUsd: number;
  roiContribution: string;
  type: "structural" | "material" | "energy" | "tech";
}

export interface BankSyndicate {
  id: string;
  name: string;
  logoShort: string;
  maxLtv: number; // e.g. 75
  spreadRate: string; // e.g. "SOFR + 210 bps"
  minTicketUsd: number;
  termMonths: number;
  dscrRequirement: number; // e.g. 1.35
  rating: string;
  description: { es: string; en: string };
}

export interface AuctionItem {
  id: string;
  title: { es: string; en: string };
  location: string;
  currentBidUsd: number;
  reservePriceUsd: number;
  estimatedAfterRepairValueUsd: number;
  bidsCount: number;
  endTime: string;
  sqft: number;
  contractAddress: string;
  certikScore: number;
  delayPenaltyUsdPerDay: number;
  imageUrl: string;
  recentBidders: { bidder: string; amount: number; timeAgo: string }[];
}

export interface StructuralSpot {
  id: string;
  x: number;
  y: number;
  label: { es: string; en: string };
  action: { es: string; en: string };
  valueAddedUsd: number;
  category: "load-bearing" | "ceiling" | "envelope" | "lighting";
}

export interface DegradedRoomPreset {
  id: string;
  name: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  description: { es: string; en: string };
  projectedGain: string;
  estimatedBudgetUsd: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "elena";
  text: string;
  timestamp: string;
}
