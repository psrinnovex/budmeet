// src/lib/region.ts
import type { RegionCode } from "@/lib/legal";

// TODO: wire real detection (GeoIP/headers). Fallback to OTHER.
export function detectRegion(): RegionCode {
  return "OTHER";
}
