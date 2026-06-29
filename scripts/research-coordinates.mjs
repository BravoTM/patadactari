/**
 * Research script — fetches coordinates from OpenStreetMap Nominatim.
 * Run: node scripts/research-coordinates.mjs
 */
const FACILITIES = [
  { id: 1, name: "Mama Lucy Kibaki Hospital", query: "Mama Lucy Kibaki Memorial Hospital, Nairobi" },
  { id: 2, name: "Mbagathi Hospital", query: "Mbagathi District Hospital, Nairobi" },
  { id: 3, name: "Pumwani Maternity Hospital", query: "Pumwani Maternity Hospital, Nairobi" },
  { id: 4, name: "Mathare North Hospital", query: "Mathare North Hospital, Nairobi" },
  { id: 5, name: "Mutuini Hospital", query: "Dagoretti Sub County Hospital Mutuini, Nairobi" },
  { id: 6, name: "Westlands Health Centre", query: "Westlands Health Centre, Nairobi Kenya" },
  { id: 7, name: "Kangemi Health Centre", query: "Kangemi Health Centre, Waiyaki Way, Nairobi" },
  { id: 8, name: "Kibera South Health Centre", query: "Kibera South Health Centre, Nairobi" },
  { id: 9, name: "Dandora Health Centre", query: "Dandora Health Centre, Nairobi" },
  { id: 10, name: "Kayole Health Centre", query: "Kayole Soweto Dispensary, Nairobi" },
  { id: 11, name: "Githurai Health Centre", query: "Githurai 44 Health Centre, Nairobi" },
  { id: 12, name: "Huruma Health Centre", query: "Huruma Lions Health Centre, Nairobi" },
  { id: 13, name: "Makadara Health Centre", query: "Makadara Health Centre, Nairobi" },
  { id: 14, name: "Karen Hospital", query: "Karen Hospital, Langata Road, Nairobi" },
  { id: 15, name: "Ruaraka Health Centre", query: "Ruaraka Health Centre, Thika Road, Nairobi" },
];

async function nominatim(query) {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({ q: query, format: "json", limit: "3", countrycodes: "ke" });
  const res = await fetch(url, { headers: { "User-Agent": "PataDaktari/1.0 (health research)" } });
  return res.json();
}

(async () => {
  for (const f of FACILITIES) {
    await new Promise((r) => setTimeout(r, 1100));
    try {
      const hits = await nominatim(f.query);
      const best =
        hits.find((h) => /hospital|health|centre|center|clinic|maternity/i.test(h.display_name)) ||
        hits[0];
      console.log(
        JSON.stringify({
          id: f.id,
          name: f.name,
          lat: best ? +(+best.lat).toFixed(6) : null,
          lng: best ? +(+best.lon).toFixed(6) : null,
          osm: best?.display_name?.slice(0, 100),
          type: best?.type,
        })
      );
    } catch (e) {
      console.log(JSON.stringify({ id: f.id, name: f.name, error: String(e) }));
    }
  }
})();
