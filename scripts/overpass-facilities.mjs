const q = `[out:json][timeout:60];
(
  node["name"~"Mama Lucy",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Mbagathi",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Pumwani",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Mutuini",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Westlands Health",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Kangemi Health",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Kibera South",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Dandora Health",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Kayole",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Githurai Health",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Huruma Health",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Makadara Health",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Karen Hospital",i](-1.45,36.65,-1.15,36.99);
  node["name"~"Ruaraka Health",i](-1.45,36.65,-1.15,36.99);
  way["name"~"Mama Lucy|Mbagathi|Pumwani|Mutuini|Westlands Health|Kangemi Health|Kibera South|Dandora Health|Kayole Health|Githurai Health|Huruma Health|Makadara Health|Karen Hospital|Ruaraka Health",i](-1.45,36.65,-1.15,36.99);
);
out center;`;

const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  body: "data=" + encodeURIComponent(q),
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
const data = await res.json();
for (const el of data.elements ?? []) {
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;
  console.log(el.tags?.name, lat, lon, el.tags?.amenity ?? el.tags?.healthcare ?? el.type);
}
