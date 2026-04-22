# Task Plan: Find unsynced Cowork "EEC" decisions

## Goal
Identify recent decisions made in Cowork "Encyclopedia of Emery County" that have NOT been reflected in `C:\Dev\emeryencyclopedia-site` (repo state or CLAUDE.md-level docs).

## Scope
- Review daily notes 2026-04-17 → 2026-04-22 for Cowork-EEC decision entries.
- Cross-check EEC_Hub / handoffs / EEC_Website_Deploy_Tasks for "decided/approved/changed" items.
- Compare against repo state (recent commits, CLAUDE.md, content/chapters.ts, site structure).
- Output: punch list of decisions present in vault but not yet landed in repo.

## Phases
- [x] Phase 1: Locate relevant vault sources (daily notes + EEC project dir).
- [x] Phase 2: Extract Cowork-tagged EEC decisions from daily notes (2026-04-17 → today).
- [x] Phase 3: Scan EEC_Hub, handoffs, EEC_Website_Deploy_Tasks for "DECISION"-style entries post-last-commit.
- [x] Phase 4: Cross-check against repo: recent commits, site config, CLAUDE.md.
- [x] Phase 5: Produce punch list of unsynced decisions. See answer in chat.

## Errors
(none yet)

## Notes
- Repo last activity: 2026-04-22 commit 19e66cd (ch15/16/17 final + chapters.ts + census rebuild).
- Cowork = Anthropic multi-person Claude sessions; decisions often logged to daily notes under `## Cowork` headers.
