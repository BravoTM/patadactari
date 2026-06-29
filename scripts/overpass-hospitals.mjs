const q = `[out:json][timeout:90];
(
  node["healthcare"="hospital"](-1.45,36.65,-1.15,36.99);
  node["amenity"~"hospital|clinic|doctors"](-1.45,36.65,-1.15,36.99);
  way["amenity"~"hospital|clinic"](-1.45,36.65,-1.15,36.99);
);
out center 100;`;

const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  body: "data=" + encodeURIComponent(q),
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
const text = await res.text();
let data;
try { data = JSON.parse(text); } catch { console.log(text.slice(0,500)); process.exit(1); }

const needles = [
  "mama lucy", "mbagathi", "pumwani", "mathare north", "mutuini",
  "westlands health", "kangemi health", "kibera south", "dandora health",
  "kayole", "githurai", "huruma lion", "makadara health", "karen hospital", "ruaraka health"
];

for (const el of data.elements ?? []) {
  const name = (el.tags?.name || "").toLowerCase();
  if (needles.some((n) => name.includes(n))) {
    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    console.log(el.tags?.name, lat, lon, el.tags?.amenity, el.tags?.healthcare);
  }
}
