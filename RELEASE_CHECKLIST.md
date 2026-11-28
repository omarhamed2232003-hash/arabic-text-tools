# Release checklist — arabic-text-tools

## Before the tag

- [ ] **Omar reads the README and these release notes before anything is tagged or released.** This is a standing condition relayed by main, not something this file can grant or waive: nothing is tagged until he has read both.
- [ ] `package.json` version, `CHANGELOG.md` top entry and the tag name agree.
- [ ] CI is green on the default branch (`test.yml`, Node 20, 22 and 24).
- [ ] `npm test` passes locally on a clean clone.
- [ ] A read-through for personal data, secrets, API keys and copied or third-party content. Nothing of that kind ships: no author names, no addresses, no tokens, no scraped text.
- [ ] The scope statement below is still true, and the release notes say what the project does *not* do.
- [ ] No repository transfer, no visibility change, no GitHub Release draft. The Amberline move waits on Omar's per-repo approval.

## At the tag

- [ ] Annotated tag `vX.Y.Z` on the reviewed commit, message `vX.Y.Z: <one line>`.
- [ ] Release body is the text of `docs/RELEASE_NOTES_DRAFT.md` at that commit, unchanged except for the version.
- [ ] Check the published page once after creating it: title, tag, body, and that no attachment or asset was added by accident.

## After the tag

- [ ] No npm publish unless Omar asks for it. A tag is not a publish.
- [ ] Record the tag, the release URL and the CI run in the Central KB row.

## Specific to this repository

- [ ] The limits in the README and release notes are still true: normalisation is lossy, Franco is approximate, ordinals stop at ten.
- [ ] The Arabic and English sections say the same thing; this README is Arabic-first with an English summary, and the two must not drift.
- [ ] `npm test` passes, including the slug truncation boundary and the mixed Arabic/Latin case. The count in the CI log is the authority; do not write a number here.
- [ ] No npm publish unless Omar asks. If he does, the package name must be free and the README must match the published name.
