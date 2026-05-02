# Security Policy

## Reporting

Please report security issues privately to Roger Chappel via the contact paths on his GitHub profile. Do not open public issues for vulnerabilities.

## Tap-specific safety

This tap treats install metadata as supply-chain sensitive:

- no invented release URLs;
- no guessed SHA256 values;
- no private repositories;
- no install steps that require secrets;
- no casks without notarization and uninstall notes.

The validator enforces the most important V1 checks, but reviewers should still inspect every formula diff.
