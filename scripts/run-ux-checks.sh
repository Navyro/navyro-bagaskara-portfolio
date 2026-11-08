#!/usr/bin/env bash
# Dependency-free UX/layout check runner.
#
# Drives the assertions in tests/ux/layout.assertions.js against the running dev server with
# agent-browser, across the routes and viewports that the review covered. Exits non-zero when a
# check fails, so it can gate a commit.
#
#   bash scripts/run-ux-checks.sh                 # everything
#   bash scripts/run-ux-checks.sh contact         # only ids matching /^contact\./
#   BASE=http://localhost:3000 bash scripts/run-ux-checks.sh
set -uo pipefail

BASE="${BASE:-http://localhost:3000}"
FILTER="${1:-}"
SESSION="${SESSION:-ux-checks}"
AB="npx -y agent-browser --session ${SESSION}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSERTIONS="$ROOT/tests/ux/layout.assertions.js"

ROUTES=(
  "/:home"
  "/work:work"
  "/work/nexabank-mobile-app:case-study"
  "/about:about"
  "/contact:contact"
  "/resume:resume"
)
VIEWPORTS=("1440 900" "768 1024" "390 844")

fail=0
total=0

for vp in "${VIEWPORTS[@]}"; do
  set -- $vp
  w=$1
  h=$2
  for entry in "${ROUTES[@]}"; do
    path="${entry%%:*}"
    name="${entry##*:}"
    $AB set viewport "$w" "$h" >/dev/null 2>&1
    $AB open "${BASE}${path}" >/dev/null 2>&1
    $AB wait 700 >/dev/null 2>&1
    raw=$($AB eval --stdin < "$ASSERTIONS" 2>&1 | tail -1)
    out=$(printf '%s' "$raw" | node -e '
      let s = "";
      process.stdin.on("data", (d) => (s += d)).on("end", () => {
        let t = s.trim();
        if (t.startsWith("\"")) t = JSON.parse(t);
        const filter = process.argv[1] || "";
        try {
          const rows = JSON.parse(t);
          let emitted = 0;
          for (const r of rows) {
            if (filter && !r.id.startsWith(filter)) continue;
            emitted++;
            console.log((r.pass ? "PASS" : "FAIL") + "\t" + r.id + "\t" + r.detail);
          }
          if (emitted === 0) console.log("SKIP\t-" + filter + "\tno matching checks on this route");
        } catch (e) {
          console.log("FAIL\tparse\t" + t.slice(0, 160));
        }
      });
    ' "$FILTER")

    if [ -z "$out" ]; then out="FAIL	parse	$raw"; fi

    while IFS=$'\t' read -r status id detail; do
      [ -z "${id:-}" ] && continue
      [ "$status" = "SKIP" ] && continue
      total=$((total + 1))
      if [ "$status" = "FAIL" ]; then
        fail=$((fail + 1))
        printf 'FAIL  %-42s %-16s %s\n' "$id" "${name}@${w}" "${detail:0:110}"
      fi
    done <<< "$out"
  done
done

echo "----"
echo "checks: $total   failures: $fail"
[ "$fail" -eq 0 ] || exit 1
