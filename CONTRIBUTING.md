# Contributing

Small, dependency-free helpers, so the bar is: one function, one test, no package added.

## Running things

```bash
npm test          # node --test, no dependencies
node bin/tafqeet.js --words 1250
```

## Adding or changing a helper

1. Put the function in the module that matches it (`src/normalize.js` for folding, `src/measure.js` for counting, and so on) and export it from `src/index.js`.
2. Add its signature to `src/index.d.ts`; `test/declarations.test.js` fails if an export and a declaration disagree.
3. Add tests that show the behaviour, including one that shows the limit. If a helper is lossy, say so in the JSDoc and in the README.
4. If the helper changes the README's "limits" section, change the README in the same commit.

## What will not be accepted

- A dependency. The point of the package is that it has none.
- A function that silently guesses: Arabic text has variants, and a helper that "fixes" spelling without saying so is worse than one that states its scope.
- Copied text or data from another project.

## Reporting a wrong output

Open an issue with the input, what you got and what you expected. An input that reproduces the bug is worth more than a description of it.
