const queries = [
  ["Kibera South", "Kibera South Health Centre, Sheikh Mahmoud Road, Kibera, Nairobi"],
  ["Westlands HC", "Krishna Centre, Woodvale Grove, Westlands, Nairobi"],
  ["Mathare North", "Mathare North Road, Naivas, Outer Ring Road, Nairobi"],
  ["Huruma Lions", "Huruma Lions Health Centre, Juja Road, Huruma, Nairobi"],
  ["Ruaraka HC", "Ruaraka Health Centre, Baba Dogo, Thika Road, Nairobi"],
  ["Kangemi", "Kangemi Health Centre, Waiyaki Way, Nairobi"],
  ["Mutuini", "Kirigu Police Station, Kikuyu Road, Nairobi"],
];
async function go(q) {
  const url = "https://nominatim.openstreetmap.org/search?" + new URLSearchParams({ q, format: "json", limit: "5", countrycodes: "ke" });
  const r = await fetch(url, { headers: { "User-Agent": "PataDaktari/1.0" } });
  return r.json();
}
for (const [label, q] of queries) {
  await new Promise((r) => setTimeout(r, 1100));
  const hits = await go(q);
  console.log("---", label);
  for (const h of hits.slice(0, 3)) {
    console.log(+h.lat, +h.lon, h.type, h.display_name.slice(0, 90));
  }
  if (!hits.length) console.log("(no results)");
}
