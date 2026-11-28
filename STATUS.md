# Where this stands

As of 28 November 2026. Version 0.7.7. **No tag, no release, no visibility change.**

## Verified, and how

- The suite passes locally and in CI on Node 20, 22 and 24 (CI run 46084578749 on commit cabc72c3). The CI log carries the count.
- Every exported function is covered by a test that pins its behaviour at the boundaries that actually break Arabic text: alef and hamza folding, ta marbuta, tashkeel removal, Arabic-Indic digits, the decimal separator, tatweel, and slug truncation at a dash.
- TypeScript declarations are checked against the implementation, so an editor's autocomplete cannot promise a signature the code does not have.
- No dependencies. `npm test` needs nothing installed.

## Reviewed by a person

- The behaviour was written and checked by the author. No second reader has gone through the rules and said they match how Arabic is actually written in Egyptian exam material.

## Not verified

- The rules are a practical subset, not a linguistic standard. Where the project folds or keeps a variant, that is a decision recorded in the code and the tests, not a citation.
- Mixed Arabic/Latin text direction is out of scope: no bidi heuristic is shipped, here or in the question-bank tools.

## Cross-repo truth

The register row in the Central KB carries the same version, commit and CI run as this page. If they disagree, the repository is right.

## Pending decisions

- **Tag and release are gated on Omar's review of the README and the release notes.** Nothing is tagged; no GitHub Release exists; visibility is unchanged.
- No npm publish unless Omar asks for it. A tag is not a publish.

## What this page is not

It is not a release announcement and it is not a quality claim. It is the shortest honest answer to "where does this actually stand", written so the reviewer does not have to reconstruct it from the changelog and the findings files.
