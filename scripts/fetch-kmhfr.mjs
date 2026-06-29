/**
 * Fetch coordinates from KMHFR public facility pages.
 * Run: node scripts/fetch-kmhfr.mjs
 */
const PAGES = [
  { name: "Kayole Soweto", url: "https://kmhfr.health.go.ke/public/facilities/d7f91c2d-3f3a-4136-97b9-8ca5a90ef61b" },
  { name: "Githurai 44", url: "https://kmhfr.health.go.ke/public/facilities/580204d8-cd19-47e5-8eb1-85745d0c3ff8" },
  { name: "Mutuini", url: "https://kmhfr.health.go.ke/public/facilities/911dd529-3431-4e73-9de7-a90d96d47b8f" },
  { name: "Mathare North", url: "https://kmhfr.health.go.ke/public/facilities/1da4c8ea-0673-41a3-84ca-6529019969c9" },
  { name: "Jumuia Huruma (wrong)", url: "https://kmhfr.health.go.ke/public/facilities/e606848c-49d6-446b-ba13-26bf59793b09" },
];

const SEARCH_TERMS = [
  "Kibera South Health Centre",
  "Huruma Lions",
  "Kangemi Health Centre",
  "Westlands Health Centre",
  "GSU HQ Dispensary Ruaraka",
  "Ruaraka Dispensary",
];

function parseCoords(html) {
  const lat = html.match(/Latitude(-?[\d.]+)/)?.[1];
  const lng = html.match(/Longitude([\d.-]+)/)?.[1];
  const desc = html.match(/Description([^<]+)/)?.[1]?.trim();
  return { lat: lat ? +lat : null, lng: lng ? +lng : null, desc };
}

(async () => {
  for (const p of PAGES) {
    const res = await fetch(p.url);
    const html = await res.text();
    console.log(p.name, parseCoords(html));
    await new Promise((r) => setTimeout(r, 500));
  }

  // Try KMHFR search API (public)
  for (const term of SEARCH_TERMS) {
    const url =
      "https://kmhfr.health.go.ke/api/facilities/facilities/?search=" +
      encodeURIComponent(term) +
      "&page_size=3";
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const text = await res.text();
      console.log(`\nAPI search "${term}":`, res.status, text.slice(0, 400));
    } catch (e) {
      console.log(`API search "${term}" ERR`, e.message);
    }
    await new Promise((r) => setTimeout(r, 300));
  }
})();
