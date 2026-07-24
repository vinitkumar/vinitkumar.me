---
title: "Seventeen Merges and Twelve Reviews: Two Weeks in Open Source"
date: "2026-07-24"
description: "Two weeks of performance work, django CMS query optimization, editor improvements, accessibility, project simplification, releases, and upstream reviews."
tags: ["open-source", "performance", "django-cms", "neovim", "python", "rust"]
featured: true
---

Two weeks can disappear without leaving much behind. These two left a trail.

Between July 13 and 24, I merged 17 pull requests across eight public repositories. I also reviewed 12 pull requests across the django CMS ecosystem.

That sounds like a story about volume. It was really a story about removing friction: faster serializers, fewer queries, quicker editors, safer input handling, simpler systems, better reading, and more dependable releases.

## Profiling `json2xml` instead of guessing

Eight of the pull requests moved `json2xml` forward.

I began with [PR #338](https://github.com/vinitkumar/json2xml/pull/338), removing dead code, duplicated benchmark helpers, ineffective ID logic, and dynamic dispatch in the Rust writer.

[PR #340](https://github.com/vinitkumar/json2xml/pull/340) followed the flamegraphs into the Python and Rust serializer hot paths.

Exact-type fast paths made the pure-Python serializer 31.1% faster on the measured workload. A hybrid `memchr` escape scanner improved the Rust accelerator by 6.23% while keeping dense inputs linear.

The work retained exact output, compatibility fallbacks, 100% Python statement coverage, and the Rust serializer's bounded-memory behavior.

I published the full measurements and before-and-after flamegraphs in [a separate article](/json2xml-flamegraph-optimization/) through [vinitkumar.me PR #159](https://github.com/vinitkumar/vinitkumar.me/pull/159).

The release path needed attention too. [PR #341](https://github.com/vinitkumar/json2xml/pull/341) restored macOS wheels for Python 3.10 after the release gate correctly caught a missing artifact.

[PR #339](https://github.com/vinitkumar/json2xml/pull/339) shipped 6.4.0, and [PR #342](https://github.com/vinitkumar/json2xml/pull/342) shipped 6.5.0 with the profiled improvements and Rust 0.4.2 accelerator.

Then [PR #343](https://github.com/vinitkumar/json2xml/pull/343) hardened remote JSON reads and XML serialization.

URL reads are now bounded, public-network-only by default, and protected against redirects, credentials, unsupported schemes, and unsafe destinations. Both serializers reject forbidden XML characters and escape attribute values safely.

Finally, [PR #355](https://github.com/vinitkumar/json2xml/pull/355) integrated tested dependency updates, while [PR #356](https://github.com/vinitkumar/json2xml/pull/356) added automated pytest flakiness reporting.

## Removing N+1 queries from django CMS

The upstream contribution I nearly left out of the first draft was one of the most important: [django CMS PR #8727](https://github.com/django-cms/django-cms/pull/8727).

Copying plugins between page languages queried source plugins and target state inside each placeholder loop. The work grew linearly with the number of placeholders before any plugin-copy cost was counted.

The fix loads source and target placeholders in batches, groups plugins in memory, batches target existence checks, and downcasts source plugins once.

A regression case with two populated placeholders had previously observed 38 queries. The new tests verify that source plugins are loaded with one batched query instead of one query per placeholder.

The change covered both the public API and admin copy-language paths, preserved missing-placeholder behavior, and merged upstream after 27 focused Django tests.

## Making Vim and Neovim start faster

I made both of my editors faster by moving work out of their startup paths.

[`.vim` PR #10](https://github.com/vinitkumar/.vim/pull/10) changed macOS appearance detection from a blocking `system()` call to a single-flight background job.

Average headless Vim startup dropped from 36.7 ms to 27.2 ms, an improvement of about 26%.

[`nvim` PR #18](https://github.com/vinitkumar/nvim/pull/18) lazy-loaded the finder, theme, and LSP stacks while preserving first-buffer OCaml LSP initialization.

Average headless Neovim startup dropped from 37.4 ms to 20.5 ms, about 45% faster. New integration tests protect startup budgets and the user-visible triggers that load each stack.

I also merged [fff-plus.nvim PR #7](https://github.com/vinitkumar/fff-plus.nvim/pull/7), closing the most useful gaps with my old `fzf.vim` workflows.

The extension gained ranked fuzzy matching, correct long-list viewports, multi-select actions, quickfix support, safe Git path parsing, fullscreen layouts, and diff previews.

I documented that work in [Closing the fzf.vim Gaps in fff-plus.nvim](/fff-plus-fzf-vim-parity/) through [vinitkumar.me PR #160](https://github.com/vinitkumar/vinitkumar.me/pull/160).

## Simplifying systems and improving the surface

In [chatbot PR #11](https://github.com/vinitkumar/chatbot/pull/11), I removed the Zig implementation and standardized the project on C23.

The project lost more than 800 net lines and gained one portable implementation, cross-platform build artifacts, simpler benchmarks, and a smaller maintenance surface.

[vinitkumar.me PR #161](https://github.com/vinitkumar/vinitkumar.me/pull/161) rebuilt the blog's reading palette around stable, theme-aware surfaces instead of tag colors.

The accessibility audit finished with zero axe violations across 22 light and dark theme-page combinations. Links, focus states, typography, filters, code, metadata, and TIL cards all became easier to read.

I also reduced my [GitHub profile README](https://github.com/vinitkumar/vinitkumar/pull/3) from a long catalogue to a concise statement of what I build and maintain.

## The 17 merged pull requests

- [json2xml #338: Desloppify the codebase](https://github.com/vinitkumar/json2xml/pull/338)
- [json2xml #339: Release json2xml 6.4.0](https://github.com/vinitkumar/json2xml/pull/339)
- [json2xml #340: Optimize Python and Rust serializer hot paths](https://github.com/vinitkumar/json2xml/pull/340)
- [json2xml #341: Restore macOS Python 3.10 release wheels](https://github.com/vinitkumar/json2xml/pull/341)
- [json2xml #342: Release json2xml 6.5.0](https://github.com/vinitkumar/json2xml/pull/342)
- [json2xml #343: Harden URL reads and XML serialization](https://github.com/vinitkumar/json2xml/pull/343)
- [json2xml #355: Integrate pending dependency updates](https://github.com/vinitkumar/json2xml/pull/355)
- [json2xml #356: Add automated flakiness reporting](https://github.com/vinitkumar/json2xml/pull/356)
- [django CMS #8727: Avoid N+1 queries during language copies](https://github.com/django-cms/django-cms/pull/8727)
- [.vim #10: Detect macOS appearance asynchronously](https://github.com/vinitkumar/.vim/pull/10)
- [nvim #18: Speed up Neovim startup](https://github.com/vinitkumar/nvim/pull/18)
- [fff-plus.nvim #7: Implement feasible fzf.vim parity improvements](https://github.com/vinitkumar/fff-plus.nvim/pull/7)
- [chatbot #11: Remove Zig and standardize on C23](https://github.com/vinitkumar/chatbot/pull/11)
- [vinitkumar.me #159: Document json2xml flamegraph optimizations](https://github.com/vinitkumar/vinitkumar.me/pull/159)
- [vinitkumar.me #160: Publish the fff-plus.nvim parity update](https://github.com/vinitkumar/vinitkumar.me/pull/160)
- [vinitkumar.me #161: Improve reading accessibility and color contrast](https://github.com/vinitkumar/vinitkumar.me/pull/161)
- [vinitkumar #3: Sharpen the profile README](https://github.com/vinitkumar/vinitkumar/pull/3)

## Review is open source work too

I reviewed 12 changes across `django-cms`, `djangocms-versioning`, and `djangocms-alias`. Eleven have merged; one remains open.

The most substantial reviews were part of django CMS's URL and versioning work.

I reviewed [persistent URL fields for page content](https://github.com/django-cms/django-cms/pull/8729#pullrequestreview-4728830413) and proposed a bounded, batched migration shape for large installations.

I approved [per-site URL uniqueness and reachability](https://github.com/django-cms/django-cms/pull/8730#pullrequestreview-4731395974).

The change covered model logic, descendant propagation, a data migration, database constraints, admin behavior, and tests.

I also approved [atomic publishing and PageContent slug support](https://github.com/django-cms/djangocms-versioning/pull/581#pullrequestreview-4730888893), which keeps versions and URLs consistent when publishing fails.

The remaining reviews covered a wide range of release and admin behavior:

- [GrouperAdmin `list_editable` support](https://github.com/django-cms/django-cms/pull/8722#pullrequestreview-4680742887);
- [correct ordering context in placeholder signals](https://github.com/django-cms/django-cms/pull/8723#pullrequestreview-4680744960);
- [clearer alias usage and delete views](https://github.com/django-cms/djangocms-alias/pull/377#pullrequestreview-4680748175);
- [pytest configuration and reusable test settings](https://github.com/django-cms/django-cms/pull/8718#pullrequestreview-4688002140);
- [safe `save_model` handling for editable admin lists](https://github.com/django-cms/django-cms/pull/8721#pullrequestreview-4680746068);
- [wheel-content hardening](https://github.com/django-cms/django-cms/pull/8734#pullrequestreview-4747590145);
- [sideframe behavior for non-frontend-editable objects](https://github.com/django-cms/djangocms-versioning/pull/580#pullrequestreview-4774435286);
- and [Bootstrap Icons licensing](https://github.com/django-cms/django-cms/pull/8737#pullrequestreview-4747582575).

On the still-open [localized plugin rendering fix](https://github.com/django-cms/django-cms/pull/8739#discussion_r3640020554), I asked whether an internal plugin list could be empty.

The answer clarified that the update path always contains at least one plugin. A small question turned an assumption in the code into an explicit invariant.

Reviews are not background work. They are how a project protects users, shares context, and lets difficult changes move forward with confidence.

## What I am taking from these two weeks

The common thread was reducing avoidable work.

Batch database queries instead of repeating them. Profile hot paths instead of guessing. Defer editor setup until it is needed. Delete a second implementation when one good implementation is enough.

The same idea applies to accessibility, CI, release checks, and reviews: build guardrails once so people do not have to rediscover the same failure later.

That is the kind of open source work I want to keep doing—measured, practical, and useful long after the pull request turns purple.
