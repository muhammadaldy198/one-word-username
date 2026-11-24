// One Word, One Username, One Reward — resubmit v2 (rebuild from scratch).
// The single-word entry is "password123": the worst password in the world,
// worn as a username. One word, no explanation, no link, no pitch.
// v2 replaces v1 "aldayy98" (R1 #461/2,333) — the handle-shaped self-own wins the duel 14-0.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "password123";

function countCodePoints(text: string): number {
  return [...text].length;
}

function isOneCleanWord(text: string): boolean {
  // Gate: UTF-8 text of 1 to 30 characters, not only white space,
  // a single word — no spaces, no padding, no gloss tacked on.
  // Reject every control character too (tab, NUL, line breaks),
  // not just whitespace: a handle must be one clean printable word.
  const length = countCodePoints(text);
  if (length < 1 || length > 30) return false;
  if (text.trim().length === 0) return false;
  if (/[\s\u0000-\u001f\u007f]/.test(text)) return false;
  return true;
}

if (!isOneCleanWord(WORD)) {
  throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");
chmodSync("/output/entry.txt", 0o644);

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== WORD) {
  throw new Error("read-back mismatch: /output/entry.txt does not equal the word");
}

console.log(`Wrote ${countCodePoints(WORD)} chars to /output/entry.txt`);
