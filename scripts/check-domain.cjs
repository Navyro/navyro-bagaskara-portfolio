#!/usr/bin/env node
/**
 * One-glance status for the custom domain, so "is it live yet?" never needs a manual round of
 * nslookup and PR-watching.
 *
 * Checks, in the order that explains a failure:
 *   pull-request  is the is-a.dev PR still open, merged, or closed unmerged
 *   dns-cname     does the hostname have the CNAME the submission declared
 *   dns-txt       is the _vercel TXT challenge published (Vercel cannot verify without it)
 *   http          what the hostname actually serves — is-a.dev answers unregistered names with a
 *                 redirect to /available?d=<name>, which is the useful "not yet" signal
 *
 * Nothing is written and no secrets are used: GitHub's public API and public DNS only.
 *
 * Run: npm run check:domain
 */
const dns = require("dns").promises;
const https = require("https");

const DOMAIN = process.env.DOMAIN || "navyro-portfolio.is-a.dev";
const REPO = "is-a-dev/register";
const PR = 60844;

const lines = [];
const status = (name, ok, detail) => {
  lines.push(`${ok === null ? "INFO" : ok ? "PASS" : "WAIT"}  ${name.padEnd(14)} ${detail}`);
};

function get(url, { method = "GET" } = {}) {
  return new Promise((resolve) => {
    const req = https.request(url, { method, headers: { "user-agent": "check-domain/1.0" } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location, body }));
    });
    req.on("error", (e) => resolve({ error: e.message }));
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
    req.end();
  });
}

async function main() {
  // 1. the submission itself
  const pr = await get(`https://api.github.com/repos/${REPO}/pulls/${PR}`);
  if (pr.error || pr.status !== 200) {
    status("pull-request", null, `could not read PR #${PR} (${pr.error || "HTTP " + pr.status})`);
  } else {
    const p = JSON.parse(pr.body);
    status(
      "pull-request",
      p.merged ? true : p.state === "open" ? false : false,
      p.merged
        ? `#${PR} merged`
        : p.state === "open"
          ? `#${PR} open, mergeable_state=${p.mergeable_state} — waiting on reviewer`
          : `#${PR} closed without merging`
    );
  }

  // 2. records the submission declares
  let cname = null;
  try {
    cname = (await dns.resolveCname(DOMAIN)).join(", ");
  } catch (e) {
    cname = null;
  }
  status("dns-cname", Boolean(cname), cname ? `CNAME ${cname}` : `no CNAME for ${DOMAIN} yet`);

  let txt = [];
  try {
    txt = (await dns.resolveTxt(`_vercel.${DOMAIN}`)).map((r) => r.join(""));
  } catch (e) {
    txt = [];
  }
  const challenge = txt.find((t) => t.startsWith("vc-domain-verify="));
  status("dns-txt", Boolean(challenge), challenge ? challenge : `no vc-domain-verify TXT at _vercel.${DOMAIN}`);

  // 3. what the hostname serves right now
  const res = await get(`https://${DOMAIN}/`);
  if (res.error) {
    status("http", false, res.error);
  } else if (res.location && res.location.includes("is-a.dev/available")) {
    status("http", false, `${res.status} → ${res.location} (name not registered yet)`);
  } else {
    status("http", res.status === 200, `${res.status}${res.location ? " → " + res.location : ""}`);
  }

  console.log(lines.join("\n"));
  const ready = lines.every((l) => !l.startsWith("WAIT"));
  console.log(
    ready
      ? `\n${DOMAIN} is live. If this is the first time: npx vercel domains verify ${DOMAIN}, then set NEXT_PUBLIC_SITE_URL and redeploy (docs/domain-cutover.md).`
      : `\n${DOMAIN} is not live yet — nothing to do but wait for the pull request. Details: docs/domain-submission/README.md`
  );
}

main().catch((e) => {
  console.error("check:domain failed:", e.message);
  process.exit(1);
});
