// news-image-20261124 — entry program (Node 22, standard library only).
// The entry image is the entry.png beside this file; the program copies it
// byte-for-byte to $MAKEFUN_OUTPUT_DIR/entry.png (default /output).
// Deterministic: no network, no randomness, no clock.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const target = join(outDir, 'entry.png');

// Validate the source image before copying anything.
if (!existsSync(source)) {
  console.error('entry.png is missing next to main.ts');
  process.exit(1);
}
const png = readFileSync(source);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (png.length < 8 || !png.subarray(0, 8).equals(PNG_MAGIC)) {
  console.error('entry.png is not a PNG file (bad magic bytes)');
  process.exit(1);
}
if (png.length > 1048576) {
  console.error(`entry.png is ${png.length} bytes, over the 1 MiB limit`);
  process.exit(1);
}
// IHDR chunk: width at bytes 16-19, height at bytes 20-23 (big-endian).
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  console.error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
  process.exit(1);
}
// A complete PNG ends with the 12-byte IEND trailer.
const IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (png.length < 12 || !png.subarray(png.length - 12).equals(IEND)) {
  console.error('entry.png is truncated or corrupted (no IEND trailer)');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy: re-read the output and compare its sha256 with the source.
import { createHash } from 'node:crypto';
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const written = readFileSync(target);
if (sha256(written) !== sha256(png)) {
  console.error('entry.png copy failed: output sha256 does not match the source');
  process.exit(1);
}
