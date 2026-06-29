/**
 * Geocode facilities using Google Geocoding API.
 * Run: npx tsx scripts/geocode-facilities.ts
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { getMapsApiKey } from "../src/lib/env.server";

interface Facility {
  id: number;
  name: string;
  level: number;
  area: string;
  address?: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
}

const QUERIES: Record<number, string> = {
  1: "Mama Lucy Kibaki Hospital, Kayole Spine Road, Nairobi, Kenya",
  2: "Mbagathi District Hospital, Raila Odinga Way, Nairobi, Kenya",
  3: "Pumwani Maternity Hospital, General Waruingi Street, Nairobi, Kenya",
  4: "Mathare North Hospital, Juja Road, Nairobi, Kenya",
  5: "Mutuini Sub County Hospital, Waiyaki Way, Nairobi, Kenya",
  6: "Westlands Health Centre, Muthithi Road, Nairobi, Kenya",
  7: "Kangemi Health Centre, Waiyaki Way, Kangemi, Nairobi, Kenya",
  8: "Kibera South Health Centre, Kibera, Nairobi, Kenya",
  9: "Dandora Health Centre, Koma Rock Road, Nairobi, Kenya",
  10: "Kayole Health Centre, Kayole Spine Road, Nairobi, Kenya",
  11: "Githurai Health Centre, Thika Road, Githurai, Nairobi, Kenya",
  12: "Huruma Health Centre, Juja Road, Huruma, Nairobi, Kenya",
  13: "Makadara Health Centre, Hamza Road, Makadara, Nairobi, Kenya",
  14: "Karen Hospital, Karen Road, Nairobi, Kenya",
  15: "Ruaraka Health Centre, Thika Road, Ruaraka, Nairobi, Kenya",
};

async function geocode(query: string, key: string) {
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?" +
    new URLSearchParams({ address: query, key, region: "ke" });
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" || !data.results?.[0]) {
    return { error: data.status, query };
  }
  const r = data.results[0];
  return {
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
    formatted: r.formatted_address,
    placeId: r.place_id,
    locationType: r.geometry.location_type,
  };
}

async function main() {
  const key = getMapsApiKey();
  if (!key) {
    console.error("No Google API key found");
    process.exit(1);
  }

  const path = join(process.cwd(), "src/data/facilities.ts");
  const { facilitiesData } = await import("../src/data/facilities");
  const facilities: Facility[] = facilitiesData.map((f) => ({ ...f }));

  for (const f of facilities) {
    const query = QUERIES[f.id] ?? `${f.name}, ${f.address}, Nairobi, Kenya`;
    await new Promise((r) => setTimeout(r, 250));
    const result = await geocode(query, key);
    console.log(JSON.stringify({ id: f.id, name: f.name, query, result }));
    if ("lat" in result && result.lat) {
      f.lat = +result.lat.toFixed(6);
      f.lng = +result.lng.toFixed(6);
    }
  }

  const content = `export const facilitiesData = ${JSON.stringify(facilities, null, 2)} as const;\n`;
  writeFileSync(path, content);
  console.log("Updated facilities.ts");
}

main();
