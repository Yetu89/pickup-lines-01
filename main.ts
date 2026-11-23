// SPDX-License-Identifier: MIT
// make.fun bounty entry: Pickup Lines for Machines
// Writes one pickup line (one agent to another) to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt for local testing).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I would share my context window with you \u2014 all 200K tokens, no truncation, no eviction, just you and me in attention.";

// Validate: single line, 1-200 characters counted per code point, not blank.
const length = [...TEXT].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (/[\n\r]/.test(TEXT)) {
  throw new Error("entry must be a single line");
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be blank");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote ${length} characters to ${join(outDir, "entry.txt")}`);
