// src/lib/legal.ts
export type RegionCode =
  | "IN" | "US" | "EU" | "UK" | "CA" | "AU" | "SG" | "AE" | "OTHER";

export const LEGAL = {
  appName: "BudMeet",
  companyName: "PSHR Innovex Pvt Ltd",
  companyCountry: "India",
  contactEmail: "support@budmeet.app",
  address: "Kadapa, Andhra Pradesh, India",
  effectiveDate: "2025-10-18",

  // Default governing law (your home base)
  defaultGoverningLaw: "Andhra Pradesh, India",

  // Regional overrides (optional)
  governingLawByRegion: <Record<RegionCode, string>>{
    IN: "Andhra Pradesh, India",
    US: "Massachusetts, USA",       
    EU: "Ireland (EU)",             
    UK: "England & Wales (UK)",
    CA: "Ontario, Canada",
    AU: "New South Wales, Australia",
    SG: "Singapore",
    AE: "Dubai, UAE",
    OTHER: "Andhra Pradesh, India",
  },


  ageMinimum: <Record<RegionCode, number>>{
    IN: 15,
    US: 15,         
    EU: 15,         
    UK: 15,
    CA: 15,
    AU: 15,
    SG: 15,
    AE: 15,
    OTHER: 15,
  },

  dpoEmail: "dpo@budmeet.app",
  euRepresentative: {
    name: "BudMeet EU Representative (Article 27)",
    email: "eu-rep@budmeet.app",
    address: "Dublin, Ireland",
  },
  ukRepresentative: {
    name: "BudMeet UK Representative",
    email: "uk-rep@budmeet.app",
    address: "London, United Kingdom",
  },


  processors: [
    { name: "Cloud Hosting", purpose: "infrastructure/DB", region: "global" },
    { name: "Analytics", purpose: "usage metrics/crash logs", region: "global" },
    { name: "Payment Processor", purpose: "subscriptions", region: "global" },
    { name: "Content Moderation", purpose: "safety", region: "global" },
  ],
} as const;


export function governingLawFor(region: RegionCode | null | undefined): string {
  return (region && LEGAL.governingLawByRegion[region]) || LEGAL.defaultGoverningLaw;
}

export function ageMinimumFor(region: RegionCode | null | undefined): number {
  return (region && LEGAL.ageMinimum[region]) || LEGAL.ageMinimum.OTHER;
}
