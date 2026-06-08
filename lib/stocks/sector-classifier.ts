import type { ComplianceStatus } from "@/types/stock";

export interface SectorClassification {
  sectorStatus: ComplianceStatus;
  businessStatus: ComplianceStatus;
  riskLevel: "low" | "medium" | "high";
  flags: string[];
  sectorSummary: string;
  businessSummary: string;
  revenueBreakdown: { label: string; percentage: number; compliant: boolean }[];
  businessDetails: string[];
}

interface SectorRule {
  defaultStatus: ComplianceStatus;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  flags: string[];
  revenueTemplate: { label: string; share: number; compliant: boolean }[];
}

const SECTOR_RULES: Record<string, SectorRule> = {
  Technology: {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Technology sector is generally permissible under Shariah principles.",
    flags: [],
    revenueTemplate: [
      { label: "Core Products & Services", share: 70, compliant: true },
      { label: "Cloud & Subscriptions", share: 20, compliant: true },
      { label: "Mixed/Other Revenue", share: 10, compliant: true },
    ],
  },
  "Consumer Discretionary": {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Consumer discretionary sector is generally permissible with product-level screening.",
    flags: ["Verify product mix for non-compliant goods"],
    revenueTemplate: [
      { label: "Core Retail / Products", share: 75, compliant: true },
      { label: "Services & Support", share: 15, compliant: true },
      { label: "Other Revenue", share: 10, compliant: true },
    ],
  },
  "Consumer Staples": {
    defaultStatus: "questionable",
    riskLevel: "medium",
    summary: "Consumer staples may include alcohol, pork, or mixed product lines — verify revenue mix.",
    flags: ["Product portfolio screening required"],
    revenueTemplate: [
      { label: "Compliant Products", share: 85, compliant: true },
      { label: "Non-Compliant Products", share: 5, compliant: false },
      { label: "Distribution & Other", share: 10, compliant: true },
    ],
  },
  Healthcare: {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Healthcare and pharmaceuticals are generally permissible under Shariah screening.",
    flags: [],
    revenueTemplate: [
      { label: "Pharmaceuticals & Devices", share: 80, compliant: true },
      { label: "Services & Research", share: 15, compliant: true },
      { label: "Other", share: 5, compliant: true },
    ],
  },
  Energy: {
    defaultStatus: "questionable",
    riskLevel: "medium",
    summary: "Energy sector screening depends on conventional vs. renewable mix and debt structure.",
    flags: ["Conventional energy exposure", "High capital expenditure / debt"],
    revenueTemplate: [
      { label: "Energy Production", share: 70, compliant: true },
      { label: "Refining & Distribution", share: 20, compliant: true },
      { label: "Other", share: 10, compliant: true },
    ],
  },
  Industrials: {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Industrial manufacturing is generally permissible under Islamic finance principles.",
    flags: [],
    revenueTemplate: [
      { label: "Manufacturing & Sales", share: 80, compliant: true },
      { label: "Services & Maintenance", share: 12, compliant: true },
      { label: "Other", share: 8, compliant: true },
    ],
  },
  "Real Estate": {
    defaultStatus: "questionable",
    riskLevel: "medium",
    summary: "Real estate requires screening for interest-based financing and tenant activities.",
    flags: ["Interest-based property financing", "Tenant activity screening"],
    revenueTemplate: [
      { label: "Rental Income", share: 60, compliant: true },
      { label: "Property Sales", share: 30, compliant: true },
      { label: "Financing-Related", share: 10, compliant: false },
    ],
  },
  Utilities: {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Utilities provision is generally permissible; debt ratios should be monitored.",
    flags: ["Often high regulated debt levels"],
    revenueTemplate: [
      { label: "Utility Services", share: 90, compliant: true },
      { label: "Other Operations", share: 10, compliant: true },
    ],
  },
  "Communication Services": {
    defaultStatus: "questionable",
    riskLevel: "medium",
    summary: "Media and telecom may involve mixed content revenue — scholarly opinions vary.",
    flags: ["Content-based revenue screening"],
    revenueTemplate: [
      { label: "Core Telecom / Media", share: 80, compliant: true },
      { label: "Mixed Content Revenue", share: 5, compliant: false },
      { label: "Advertising & Other", share: 15, compliant: true },
    ],
  },
  "Financial Services": {
    defaultStatus: "haram",
    riskLevel: "high",
    summary: "Conventional financial services involve interest (riba) — prohibited under Shariah.",
    flags: ["Interest-based lending (Riba)", "Conventional banking products"],
    revenueTemplate: [
      { label: "Interest Income (Riba)", share: 50, compliant: false },
      { label: "Investment Banking", share: 25, compliant: false },
      { label: "Other Financial Services", share: 25, compliant: false },
    ],
  },
  Automotive: {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Automotive manufacturing is a permissible industry in Islamic finance.",
    flags: [],
    revenueTemplate: [
      { label: "Vehicle Sales", share: 80, compliant: true },
      { label: "Parts & Services", share: 15, compliant: true },
      { label: "Other", share: 5, compliant: true },
    ],
  },
  Materials: {
    defaultStatus: "halal",
    riskLevel: "low",
    summary: "Materials and mining sectors are generally permissible with activity-level screening.",
    flags: [],
    revenueTemplate: [
      { label: "Core Materials", share: 85, compliant: true },
      { label: "Processing & Sales", share: 10, compliant: true },
      { label: "Other", share: 5, compliant: true },
    ],
  },
};

const PROHIBITED_INDUSTRIES = [
  "conventional banking",
  "investment banking",
  "insurance",
  "gambling",
  "casino",
  "alcohol",
  "brewery",
  "distillery",
  "pork",
  "adult entertainment",
];

const QUESTIONABLE_INDUSTRIES = [
  "social media",
  "beverages",
  "media",
  "entertainment",
  "reit",
  "mortgage",
];

function matchIndustry(industry: string, keywords: string[]): boolean {
  const lower = industry.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function worstStatus(a: ComplianceStatus, b: ComplianceStatus): ComplianceStatus {
  const rank = { halal: 0, questionable: 1, haram: 2 };
  return rank[a] >= rank[b] ? a : b;
}

/** Classify sector & business activity from sector/industry metadata */
export function classifySector(
  sector: string,
  industry: string,
  impureIncomeRatio: number
): SectorClassification {
  const rule = SECTOR_RULES[sector] ?? SECTOR_RULES.Technology;

  let sectorStatus = rule.defaultStatus;
  let businessStatus = rule.defaultStatus;
  const flags = [...rule.flags];

  if (matchIndustry(industry, PROHIBITED_INDUSTRIES)) {
    sectorStatus = "haram";
    businessStatus = "haram";
    flags.push(`Prohibited industry: ${industry}`);
  } else if (matchIndustry(industry, QUESTIONABLE_INDUSTRIES)) {
    sectorStatus = worstStatus(sectorStatus, "questionable");
    businessStatus = worstStatus(businessStatus, "questionable");
  }

  if (impureIncomeRatio > 5) {
    businessStatus = worstStatus(businessStatus, "haram");
  } else if (impureIncomeRatio > 3) {
    businessStatus = worstStatus(businessStatus, "questionable");
  }

  const nonCompliantShare = Math.min(Math.max(impureIncomeRatio, 0), 20);
  const compliantTemplate = rule.revenueTemplate.filter((t) => t.compliant);
  const compliantTotal = compliantTemplate.reduce((s, t) => s + t.share, 0);

  const revenueBreakdown = rule.revenueTemplate.map((item) => {
    if (!item.compliant) {
      return {
        label: item.label,
        percentage: Math.round(nonCompliantShare),
        compliant: false as const,
      };
    }
    const pct =
      compliantTotal > 0
        ? Math.round(((100 - nonCompliantShare) * item.share) / compliantTotal)
        : item.share;
    return { label: item.label, percentage: pct, compliant: true as const };
  });

  const totalPct = revenueBreakdown.reduce((s, r) => s + r.percentage, 0);
  if (totalPct !== 100 && revenueBreakdown.length > 0) {
    revenueBreakdown[0].percentage += 100 - totalPct;
  }

  return {
    sectorStatus,
    businessStatus,
    riskLevel: rule.riskLevel,
    flags,
    sectorSummary: rule.summary,
    businessSummary: `${industry} in ${sector} — screened using AAOIFI sector and activity criteria.`,
    revenueBreakdown,
    businessDetails: [
      `Primary operations in ${industry}`,
      `Sector classification: ${sectorStatus.toUpperCase()}`,
      `Non-compliant revenue exposure: ~${impureIncomeRatio}%`,
      flags.length > 0 ? `Flags: ${flags.slice(0, 2).join(", ")}` : "No major sector flags identified",
    ],
  };
}
