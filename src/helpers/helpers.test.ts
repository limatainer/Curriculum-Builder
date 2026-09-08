import assert from "node:assert/strict";
import test from "node:test";
import { fitWithin } from "./image.ts";
import { mergeStored } from "./mergeStored.ts";

const FALLBACK = { name: "Joao", fontSizePt: 10, languages: [{ id: "a", name: "PT" }] };

test("mergeStored falls back when input is not a plain object", () => {
  assert.deepEqual(mergeStored(null, FALLBACK), FALLBACK);
  assert.deepEqual(mergeStored("corrupt", FALLBACK), FALLBACK);
  assert.deepEqual(mergeStored([], FALLBACK), FALLBACK);
});

test("mergeStored fills keys missing from an older stored shape", () => {
  const merged = mergeStored({ name: "Mariana" }, FALLBACK);
  assert.equal(merged.name, "Mariana");
  assert.equal(merged.fontSizePt, FALLBACK.fontSizePt);
  assert.deepEqual(merged.languages, FALLBACK.languages);
});

test("mergeStored keeps a stored empty array instead of restoring the fallback", () => {
  assert.deepEqual(mergeStored({ languages: [] }, FALLBACK).languages, []);
});

test("fitWithin only shrinks, and preserves aspect ratio", () => {
  assert.deepEqual(fitWithin(300, 200, 512), { width: 300, height: 200 });
  assert.deepEqual(fitWithin(2048, 1024, 512), { width: 512, height: 256 });
  assert.deepEqual(fitWithin(1024, 4096, 512), { width: 128, height: 512 });
});
