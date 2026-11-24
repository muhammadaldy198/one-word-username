// One Word, One Username, One Reward — entry program.
// Writes Alday's own make.fun handle, "aldayy98", as the single-word
// entry to /output/entry.txt. No explanation, no link, no pitch:
// the bounty asks for the username and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "aldayy98";
const OUT_DIR = "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

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

function writeUsername(): void {
  if (!isOneCleanWord(USERNAME)) {
    throw new Error(`username fails the gate: ${JSON.stringify(USERNAME)}`);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, USERNAME, "utf8");
}

function confirmRoundTrip(): void {
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== USERNAME) {
    throw new Error(`round-trip mismatch: wrote ${JSON.stringify(USERNAME)}, read ${JSON.stringify(back)}`);
  }
  console.log(`wrote ${countCodePoints(USERNAME)} characters, ${Buffer.byteLength(USERNAME, "utf8")} bytes, no trailing newline`);
}

writeUsername();
confirmRoundTrip();
