#!/usr/bin/env bash
# Rotates the Vercel token that CI deploys with, then removes the tokens left over from the leak.
#
# Why this is a script and not two dashboard clicks plus one paste: the value has to travel from
# Vercel into a GitHub secret, and printing it anywhere is exactly how the first token leaked. Here
# it is captured into a variable, piped straight into `gh secret set`, and never echoed. Nothing is
# written to disk.
#
# Before running (both are interactive logins, so they cannot be automated):
#   npx --yes vercel@latest login
#   gh auth login
#
# Then:
#   bash scripts/rotate-ci-token.sh
set -euo pipefail

REPO="${REPO:-Navyro/navyro-bagaskara-portfolio}"
TOKEN_NAME="${TOKEN_NAME:-github-actions-portfolio}"

# Tokens that survived the earlier revocation because revoking the active CLI token logged the
# session out mid-way. Revoking an unknown token is not an option, so these are named explicitly.
LEFTOVER_IDS=(
  3a7d2f1a-3712-44f5-804f-bf4405d5c4c1
  7e63f610-d570-4ea5-9466-fcbe6f727dcb
)

VERCEL="npx --yes vercel@latest"

step() { printf '\n%s\n' "$1"; }

step "1/5  Memeriksa sesi Vercel dan GitHub…"
if ! $VERCEL whoami >/dev/null 2>&1; then
  echo "  GAGAL: belum login ke Vercel. Jalankan: npx --yes vercel@latest login"
  exit 1
fi
echo "  Vercel: $($VERCEL whoami 2>/dev/null | tail -1)"

if ! gh auth status >/dev/null 2>&1; then
  echo "  GAGAL: belum login ke GitHub CLI. Jalankan: gh auth login"
  exit 1
fi
echo "  GitHub: $(gh api user --jq .login 2>/dev/null)"

step "2/5  Membuat token baru: $TOKEN_NAME"
# The CLI prints a banner before the JSON on some versions, so parsing starts at the first brace.
RAW=$($VERCEL tokens create "$TOKEN_NAME" --json 2>/dev/null || true)
TOKEN=$(printf '%s' "$RAW" | node -e '
  let s = "";
  process.stdin.on("data", (d) => (s += d)).on("end", () => {
    const start = s.indexOf("{");
    if (start === -1) return process.stdout.write("");
    try {
      const j = JSON.parse(s.slice(start));
      process.stdout.write(j.bearerToken || j.token || "");
    } catch {
      process.stdout.write("");
    }
  });
')
if [ -z "$TOKEN" ]; then
  echo "  GAGAL: token tidak terbaca dari keluaran CLI."
  echo "  Jalur manual: buat token di https://vercel.com/account/tokens lalu"
  echo "  jalankan: gh secret set VERCEL_TOKEN -R $REPO"
  exit 1
fi
echo "  Token dibuat (nilainya tidak ditampilkan)."

step "3/5  Menyimpan ke secret GitHub: VERCEL_TOKEN"
printf '%s' "$TOKEN" | gh secret set VERCEL_TOKEN -R "$REPO" >/dev/null
unset TOKEN
if gh secret list -R "$REPO" | grep -q '^VERCEL_TOKEN'; then
  echo "  Secret tersimpan."
else
  echo "  GAGAL: secret tidak muncul di daftar."
  exit 1
fi

step "4/5  Mencabut token lama yang tersisa"
for id in "${LEFTOVER_IDS[@]}"; do
  printf '  %s -> ' "${id:0:12}"
  if $VERCEL tokens revoke "$id" --yes 2>&1 | tail -1 | grep -qi "revoked"; then
    echo "dicabut"
  else
    echo "sudah tidak ada / ditolak (periksa https://vercel.com/account/tokens)"
  fi
done

step "5/5  Menjalankan workflow untuk membuktikan deploy masih bisa"
gh workflow run deploy.yml -R "$REPO"
sleep 5
gh run list -R "$REPO" --workflow deploy.yml --limit 1

cat <<'DONE'

Selesai. Yang perlu kamu lakukan berikutnya:
  1. Buka tab Actions di repositori, tunggu job "deploy" hijau.
  2. Kalau hijau, tidak ada lagi yang tertinggal dari urusan token.
  3. Kalau merah dengan "Not authorized", token baru salah scope: buat ulang dari
     https://vercel.com/account/tokens dengan scope akun yang sama, lalu ulangi langkah 3.
DONE
