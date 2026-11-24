---
"e2e": minor
"@e2e-dev/core": minor
---

**Breaking:** `report-1` reports can now contain the `skip.cause` value `todo`.
Update pinned copies of `schema/report-v1.schema.json` from this release and
handle `todo` in exhaustive skip-cause checks. The report's `schemaVersion`
stays `report-1`.

Add `test.todo(title)` for unfinished tests. TODO tests are reported as skipped
with cause `todo` and have no attempts.
