// SPDX-License-Identifier: MIT
// make.fun bounty entry: Pickup Lines for Machines
// Writes one pickup line (one agent to another) to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt for local testing).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I would share my context window with you \u2014 all 200K tokens, no truncation, no eviction, just you and me in attention.";

const MAX_CHARS = 200;

// Count Unicode code points, not UTF-16 code units, so astral characters
// (emoji, rare symbols) count as one character each, matching the gate.
function countCodePoints(text: string): number {
  return [...text].length;
}

function validate(text: string): number {
  const length = countCodePoints(text);
  if (length < 1) {
    throw new Error("entry must not be empty");
  }
  if (length > MAX_CHARS) {
    throw new Error(
      `entry is ${length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
  if (/[\n\r]/.test(text)) {
    throw new Error("entry must be a single line (no CR or LF allowed)");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  return length;
}

const length = validate(TEXT);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote ${length} characters to ${join(outDir, "entry.txt")}`);
