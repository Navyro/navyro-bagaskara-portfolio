import fs from "node:fs";
import path from "node:path";

/**
 * Human-readable size of a file inside /public, resolved at build time.
 *
 * The download buttons used to hard-code "12 MB" as a literal, which silently drifted away
 * from the real file. Reading the file keeps the label honest without a manual step: replace
 * the PDF, rebuild, and the number follows.
 *
 * Returns null when the file is missing so the caller can drop the parenthetical entirely
 * rather than print a guess.
 */
export function publicFileSize(filename: string): string | null {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", filename)).size;
    const mb = bytes / 1024 / 1024;
    if (mb >= 10) return `${Math.round(mb)} MB`;
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return null;
  }
}
