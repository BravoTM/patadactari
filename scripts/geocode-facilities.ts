/**
 * Geocode facility addresses via OpenStreetMap Nominatim and update data/facilities.json.
 * Manual overrides are used when geocoding returns no result or a wrong match.
 * Run: npx ts-node --project tsconfig.scripts.json scripts/geocode-facilities.ts
 */
import fs from "fs";
import path from "path";

interface Facility {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  [key: string]: unknown;
}

/** Verified coords from KMHFR, Wikipedia, or OpenStreetMap when APIs fail. */
const VERIFIED_OVERRIDES: Record<string, { lat: number; lng: number; source: string }> = {
  nbi_hospital: { lat: -1.296115, lng: 36.804718, source: "Wikipedia" },
  mlk: { lat: -1.27416, lng: 36.89843, source: "KMHFR" },
  mbagathi: { lat: -1.30793, lng: 36.80317, source: "KMHFR" },
  mathare: { lat: -1.25323, lng: 36.867485, source: "KMHFR" },
  eastleigh: { lat: -1.27175, lng: 36.85087, source: "data.afro.co.ke" },
  kayole: { lat: -1.26649, lng: 36.91668, source: "KMHFR/Kayole II" },
  kasarani: { lat: -1.21821, lng: 36.90139, source: "KMHFR" },
  nwh: { lat: -1.293856, lng: 36.796071, source: "Wikidata" },
  karen: { lat: -1.336111, lng: 36.726111, source: "Wikipedia" },
  westlands: { lat: -1.263014, lng: 36.803456, source: "KMHFR" },
  kibera: { lat: -1.3152, lng: 36.7858, source: "Mugumo-Ini, Langata" },
};

async function geocodeFacility(
  facility: Facility
): Promise<{ lat: number; lng: number; displayName: string } | null> {
  const query = `${facility.name}, ${facility.address}, Nairobi, Kenya`;
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ke");

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "PataDaktari/1.0 (health-triage-app; contact@patadaktari.local)",
    },
  });

  const data = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;
  if (!data[0]) {
    // Fallback: search by name only
    const fallbackUrl = new URL("https://nominatim.openstreetmap.org/search");
    fallbackUrl.searchParams.set("q", `${facility.name}, Nairobi, Kenya`);
    fallbackUrl.searchParams.set("format", "json");
    fallbackUrl.searchParams.set("limit", "1");
    fallbackUrl.searchParams.set("countrycodes", "ke");

    const fallbackRes = await fetch(fallbackUrl.toString(), {
      headers: {
        "User-Agent": "PataDaktari/1.0 (health-triage-app; contact@patadaktari.local)",
      },
    });
    const fallback = (await fallbackRes.json()) as Array<{
      lat: string;
      lon: string;
      display_name: string;
    }>;
    if (!fallback[0]) return null;
    return {
      lat: parseFloat(fallback[0].lat),
      lng: parseFloat(fallback[0].lon),
      displayName: fallback[0].display_name,
    };
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
}

async function main() {
  const dataPath = path.join(process.cwd(), "data", "facilities.json");
  const facilities = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Facility[];

  console.log(`Geocoding ${facilities.length} facilities via OpenStreetMap...\n`);

  for (const facility of facilities) {
    const override = VERIFIED_OVERRIDES[facility.id];
    if (override) {
      facility.latitude = override.lat;
      facility.longitude = override.lng;
      console.log(`✓ ${facility.id}: ${override.source} → ${override.lat}, ${override.lng}`);
      continue;
    }

    const result = await geocodeFacility(facility);
    if (result) {
      const oldLat = facility.latitude;
      const oldLng = facility.longitude;
      facility.latitude = Math.round(result.lat * 1e6) / 1e6;
      facility.longitude = Math.round(result.lng * 1e6) / 1e6;
      const moved =
        Math.abs(oldLat - facility.latitude) > 0.001 ||
        Math.abs(oldLng - facility.longitude) > 0.001;
      console.log(
        `${moved ? "✓" : "·"} ${facility.id}: ${facility.name}`,
        `\n    ${result.displayName.slice(0, 80)}...`,
        `\n    ${facility.latitude}, ${facility.longitude}`,
        moved ? ` (was ${oldLat}, ${oldLng})` : ""
      );
    } else {
      console.warn(`  ⚠ ${facility.id}: no result`);
    }
    await new Promise((r) => setTimeout(r, 1100));
  }

  fs.writeFileSync(dataPath, JSON.stringify(facilities, null, 2) + "\n", "utf8");
  console.log("\nUpdated data/facilities.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
