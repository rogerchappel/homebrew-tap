# Homebrew Audit Notes

`brew audit --strict --online --new Formula/*.rb` is useful before releases, but this tap may intentionally differ from fully released core formulae while entries are HEAD-only.

Expected early warnings can include missing stable `url` or livecheck metadata. Unexpected failures include Ruby syntax errors, bad class names, broken dependencies, or invented checksums.
