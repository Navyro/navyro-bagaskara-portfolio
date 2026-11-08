/* Data integrity gate: prototype links and downloadable files.
   Runs in plain Node (no bundler) by reading the data files as text, so it cannot
   silently disagree with TypeScript about types — it only checks the strings. */
const fs = require("fs");
const path = require("path");

const projectsSrc = fs.readFileSync("data/projects.ts", "utf8");
const profileSrc = fs.readFileSync("data/profile.ts", "utf8");

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.log("FAIL " + msg);
};

/* Split the source per project by slug, then read that project's links. */
const slugs = [...projectsSrc.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
if (slugs.length === 0) fail("no projects found in data/projects.ts");

const seen = new Map();
for (let i = 0; i < slugs.length; i += 1) {
  const slug = slugs[i];
  const start = projectsSrc.indexOf(`slug: "${slug}"`);
  const end = i + 1 < slugs.length ? projectsSrc.indexOf(`slug: "${slugs[i + 1]}"`) : projectsSrc.length;
  const block = projectsSrc.slice(start, end);

  const url = block.match(/prototypeUrl:\s*\n?\s*"([^"]+)"/);
  const label = block.match(/prototypeLabel:\s*"([^"]+)"/);

  if (!url) {
    fail(`${slug}: no prototypeUrl`);
    continue;
  }
  if (!label) fail(`${slug}: no prototypeLabel`);

  const value = url[1];
  if (!/^https:\/\/www\.figma\.com\/(proto|design)\/[A-Za-z0-9]+\/[^?\s]+/.test(value)) {
    fail(`${slug}: prototypeUrl is not a figma proto/design URL`);
  }
  if (/\s/.test(value)) fail(`${slug}: prototypeUrl contains whitespace`);

  const kind = value.includes("/proto/") ? "proto" : "design";
  const labelText = label ? label[1] : "";
  if (kind === "design" && /Prototype/i.test(labelText)) {
    fail(`${slug}: label says "Prototype" but the URL is a /design file`);
  }
  if (kind === "proto" && !/Prototype|Figma/i.test(labelText)) {
    fail(`${slug}: label does not describe a prototype`);
  }
  if (kind === "proto" && !/\/(proto\/)?[^?]*node-id=|starting-point-node-id/.test(value)) {
    // informational only: prototypes are usually anchored to a node
    console.log(`note ${slug}: prototype URL has no node-id anchor`);
  }

  if (seen.has(value)) fail(`${slug}: duplicate URL, same as ${seen.get(value)}`);
  seen.set(value, slug);
}

/* Downloadable files referenced from profile data must exist in public/. */
for (const field of ["resumeFilename", "portfolioFilename"]) {
  const m = profileSrc.match(new RegExp(`${field}:\\s*"([^"]+)"`));
  if (!m) {
    fail(`profile: ${field} missing`);
    continue;
  }
  const file = path.join("public", m[1]);
  if (!fs.existsSync(file)) fail(`profile: ${field} points to missing file ${file}`);
  else console.log(`ok   ${field} -> ${file} (${Math.round(fs.statSync(file).size / 1024)} KB)`);
}

console.log(failures === 0 ? `\nlinks: all checks passed (${slugs.length} projects)` : `\nlinks: ${failures} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
