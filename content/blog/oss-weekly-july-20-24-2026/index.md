---
title: "Seven Merges and Five Reviews: My Open Source Week"
date: "2026-07-24"
description: "A week of shipping editor tooling, simplifying systems code, improving accessibility, strengthening CI, and reviewing changes across the django CMS ecosystem."
tags: ["open-source", "neovim", "django-cms", "python", "c"]
featured: true
---

Some weeks are about starting work. This one was about finishing it.

Between July 20 and 24, I merged seven pull requests across five public repositories. I also reviewed five pull requests in the django CMS ecosystem.

The raw diff covered 52 files, with 1,571 additions and 1,548 deletions. The numbers are not the point, but they show the range: editor UX, C23, accessibility, CI, packaging, and project maintenance.

## Making `fff-plus.nvim` feel complete

The largest change was [fff-plus.nvim PR #7](https://github.com/vinitkumar/fff-plus.nvim/pull/7). It closed the most useful gaps between my extension pickers and the `fzf.vim` workflows I have relied on for years.

The pickers gained ranked fuzzy matching, correct long-list viewports, multi-select actions, quickfix support, fullscreen layouts, safe Git path parsing, and useful diff previews.

The important part was not the feature count. Shared matching, selection, viewport, layout, and Git-source modules now give future pickers a stronger foundation.

I wrote a separate deep dive, [Closing the fzf.vim Gaps in fff-plus.nvim](/fff-plus-fzf-vim-parity/), and published it through [vinitkumar.me PR #160](https://github.com/vinitkumar/vinitkumar.me/pull/160).

## Simplifying instead of accumulating

In [chatbot PR #11](https://github.com/vinitkumar/chatbot/pull/11), I removed the Zig implementation and standardized the project on C23.

That change removed more than 800 net lines while leaving the project with one portable implementation, cross-platform build artifacts, simpler benchmarks, and a smaller maintenance surface.

This is the kind of change I enjoy more as I gain experience. A project does not become better only by gaining features. Sometimes the best improvement is choosing one direction and deleting the rest.

## Treating accessibility as engineering

[vinitkumar.me PR #161](https://github.com/vinitkumar/vinitkumar.me/pull/161) rebuilt the reading palette around stable, theme-aware surfaces instead of tag colors.

I also tightened typography, link contrast, keyboard focus, metadata, code blocks, filters, and TIL cards. Tag colors still provide identity, but they no longer carry the responsibility for readability.

The final audit reported zero axe violations across 22 light and dark theme-page combinations. The mobile pass held a comfortable 17px prose size without horizontal overflow.

Accessibility work is often described as polish. It is closer to correctness: the interface should remain readable and operable across content, themes, input methods, and screen sizes.

## Keeping mature projects healthy

Two `json2xml` changes focused on the less glamorous work that keeps a project dependable.

[PR #355](https://github.com/vinitkumar/json2xml/pull/355) integrated tested dependency and GitHub Actions updates while respecting the repository's linear-history rules.

[PR #356](https://github.com/vinitkumar/json2xml/pull/356) added automated pytest flakiness reporting and narrowed the workflow permissions needed for it.

I also reduced my [GitHub profile README](https://github.com/vinitkumar/vinitkumar/pull/3) from a long project catalogue to a concise statement of what I build and maintain.

Small maintenance changes do not make dramatic demos. They make the next release, contribution, and debugging session less surprising.

## The seven merged pull requests

- [fff-plus.nvim #7: Implement feasible fzf.vim parity improvements](https://github.com/vinitkumar/fff-plus.nvim/pull/7)
- [chatbot #11: Remove Zig and standardize on C23](https://github.com/vinitkumar/chatbot/pull/11)
- [vinitkumar.me #161: Improve reading accessibility and color contrast](https://github.com/vinitkumar/vinitkumar.me/pull/161)
- [vinitkumar.me #160: Publish the fff-plus.nvim parity update](https://github.com/vinitkumar/vinitkumar.me/pull/160)
- [json2xml #355: Integrate pending dependency updates](https://github.com/vinitkumar/json2xml/pull/355)
- [json2xml #356: Add automated flakiness reporting](https://github.com/vinitkumar/json2xml/pull/356)
- [vinitkumar #3: Sharpen the profile README](https://github.com/vinitkumar/vinitkumar/pull/3)

## Review is open source work too

Writing code was only half of the week. I reviewed five upstream changes across `django-cms` and `djangocms-versioning`; four have already merged.

The largest was [django CMS PR #8730](https://github.com/django-cms/django-cms/pull/8730), which changed page URL reachability, descendant propagation, and per-site uniqueness.

It combined model logic, a data migration, database constraints, admin behavior, documentation, and tests. I [reviewed and approved it](https://github.com/django-cms/django-cms/pull/8730#pullrequestreview-4731395974).

I also reviewed [localized plugin rendering](https://github.com/django-cms/django-cms/pull/8739) and asked whether an internal plugin list could be empty.

The answer clarified that the update path always contains at least one plugin. That kind of small question is useful because it turns an assumption in the code into an explicit invariant.

The other approvals covered:

- [wheel-content hardening](https://github.com/django-cms/django-cms/pull/8734#pullrequestreview-4747590145), preventing tests and stray files from entering releases;
- [sideframe behavior](https://github.com/django-cms/djangocms-versioning/pull/580#pullrequestreview-4774435286), backed by expanded admin-action tests;
- and [Bootstrap Icons licensing](https://github.com/django-cms/django-cms/pull/8737#pullrequestreview-4747582575) in distributed builds.

Reviews are not background work. They are part of how an open source project protects its users, spreads context, and keeps difficult changes moving.

## What I am taking from the week

The common thread was not a language or repository. It was reducing friction.

Better pickers reduce navigation friction. One C23 implementation reduces maintenance friction. Accessible reading surfaces reduce user friction. Stronger CI and careful reviews reduce release friction.

That is a satisfying kind of open source week: ship useful things, delete unnecessary things, and help other maintainers land their work with confidence.
