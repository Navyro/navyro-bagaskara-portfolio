// Extract the text layer of every certificate PDF under TENTANG SAYA/.
// Output: .ux-logs/certs/raw.json  { file, pages, text, chars }
// PDFs with chars === 0 are image-only and need a vision fallback.
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const ROOT = path.join(process.cwd(), "TENTANG SAYA");
const OUT = path.join(process.cwd(), ".ux-logs", "certs");
fs.mkdirSync(OUT, { recursive: true });

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.pdf$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

(async () => {
  const files = walk(ROOT).sort();
  const rows = [];
  for (const f of files) {
    const rel = path.relative(ROOT, f).replace(/\\/g, "/");
    try {
      const buf = fs.readFileSync(f);
      const data = await pdf(buf);
      const text = (data.text || "")
        .replace(/\u0000/g, "")
        .split(/\r?\n/)
        .map((l) => l.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join("\n");
      rows.push({ file: rel, pages: data.numpages, chars: text.length, text });
    } catch (err) {
      rows.push({ file: rel, pages: 0, chars: -1, text: "", error: String(err.message) });
    }
  }
  fs.writeFileSync(path.join(OUT, "raw.json"), JSON.stringify(rows, null, 2));
  for (const r of rows) {
    console.log(`${String(r.chars).padStart(5)} chars  ${r.file}`);
  }
})();
