/**
 * Geocode facility addresses via Nominatim (address-specific queries).
 * Run: node scripts/geocode-addresses.mjs
 */
const QUERIES = [
  ["Westlands HC", "Krishna Centre, Woodvale Grove, Westlands, Nairobi, Kenya"],
  ["Westlands HC alt", "Pio Pinto Gama Road, Westlands, Nairobi, Kenya"],
  ["Huruma Lions", "Redeemed Gospel Church, Ngei, Huruma, Nairobi, Kenya"],
  ["Huruma Lions alt", "Huruma Estate, Juja Road, Nairobi, Kenya"],
  ["Huruma Lions alt2", "Huruma Police Post, Ngei, Mathare, Nairobi, Kenya"],
  ["Ruaraka HC", "Ruaraka Health Centre, Thika Road, Ruaraka, Nairobi, Kenya"],
  ["Ruaraka HC alt", "GSU Headquarters, Ruaraka, Thika Road, Nairobi, Kenya"],
  ["Ruaraka HC alt2", "Baba Dogo Road, Ruaraka, Nairobi, Kenya"],
  ["Kibera South", "Kibera South Health Centre, Sheikh Mahmoud Road, Kibera, Nairobi"],
  ["Kibera South alt", "Mugumo-ini, Kibera, Nairobi, Kenya"],
  ["Kangemi HC", "Kangemi Health Centre, Waiyaki Way, Kangemi, Nairobi"],
  ["Kayole Soweto", "Soweto Shopping Centre, Kayole, Nairobi, Kenya"],
  ["Githurai 44", "Githurai 44 Chiefs Camp, Githurai, Nairobi, Kenya"],
  ["Mutuini", "Dagoretti Sub County Hospital, Mutuini, Kikuyu Road, Nairobi"],
  ["Mathare North", "Mathare North Hospital, behind NYS Engineering, Nairobi"],
  ["Jumuia (wrong Huruma)", "Jumuia Friends Hospital, Huruma, Nairobi, Kenya"],
];

async function nominatim(query) {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({ q: query, format: "json", limit: "5", countrycodes: "ke" });
  const res = await fetch(url, { headers: { "User-Agent": "PataDaktari/1.0 (coordinate research)" } });
  return res.json();
}

(async () => {
  for (const [label, query] of QUERIES) {
    await new Promise((r) => setTimeout(r, 1100));
    const hits = await nominatim(query);
    console.log(`\n--- ${label}`);
    if (!hits.length) {
      console.log("(no results)");
      continue;
    }
    for (const h of hits.slice(0, 3)) {
      console.log(`${(+h.lat).toFixed(6)}, ${(+h.lon).toFixed(6)} | ${h.type} | ${h.display_name.slice(0, 120)}`);
    }
  }
})();
