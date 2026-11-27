const fs = require("fs");
const SEEDS_ID = ["portofolio", "portofolio ui ux", "portofolio desain", "contoh portofolio", "portofolio website", "jasa ui ux", "portofolio mahasiswa"];
const SEEDS_EN = ["portfolio", "portfolio website", "portfolio design", "ui ux portfolio"];
const ALPHA = "abcdefghijklmnopqrstuvwxyz".split("");

async function suggest(q, hl, gl) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=${gl}&q=${encodeURIComponent(q)}`;
  try {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) return [];
    const j = JSON.parse(await r.text());
    return (j[1] || []).map((s) => s.toLowerCase().trim());
  } catch { return []; }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const out = { id: new Set(), en: new Set() };
  const tasks = [];
  for (const s of SEEDS_ID) { tasks.push([s, "id", "id"]); for (const a of ALPHA) tasks.push([`${s} ${a}`, "id", "id"]); }
  for (const s of SEEDS_EN) { tasks.push([s, "en", "us"]); for (const a of ALPHA) tasks.push([`${s} ${a}`, "en", "us"]); }
  for (const [q, hl, gl] of tasks) {
    const got = await suggest(q, hl, gl);
    for (const g of got) (hl === "id" ? out.id : out.en).add(g);
    await sleep(90);
  }
  fs.writeFileSync(".tmp-kw/suggest.json", JSON.stringify({ id: [...out.id], en: [...out.en] }, null, 1));
  console.log("id:", out.id.size, "en:", out.en.size);
})();
