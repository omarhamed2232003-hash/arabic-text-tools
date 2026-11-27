#!/usr/bin/env node
/**
 * CLI for tafqeet: print an amount in Arabic words.
 *
 *   node bin/tafqeet.js 1250.5        -> ألف ومئتان وخمسون جنيهًا وخمسون قرشًا فقط
 *   node bin/tafqeet.js --words 1234  -> ألف ومئتان وأربعة وثلاثون
 */
import { numberToArabicWords, tafqeetEgp } from '../src/tafqeet.js';

const args = process.argv.slice(2);
const wordsOnly = args[0] === '--words';
const raw = wordsOnly ? args[1] : args[0];

if (raw === undefined) {
  console.error('usage: tafqeet [--words] <number>');
  process.exit(2);
}

const value = Number(raw);
if (!Number.isFinite(value)) {
  console.error(`not a number: ${raw}`);
  process.exit(2);
}

try {
  console.log(wordsOnly ? numberToArabicWords(value) : tafqeetEgp(value));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
