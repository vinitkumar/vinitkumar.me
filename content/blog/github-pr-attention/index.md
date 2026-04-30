---
title: "GitHub PR Attention: A Terminal UI for Taming the PR Inbox"
date: "2026-04-29"
featured: true
description: "Why I built github-pr-attention, a fast, vim-friendly TUI in Go for triaging, reviewing, and merging GitHub pull requests without leaving the terminal."
---

Most of my workday happens in a terminal. Editor in one pane, shell in another, logs somewhere nearby, and a browser tab lurking in the corner like it pays rent.

The browser tab is usually GitHub.

GitHub is good at a lot of things, but reviewing a queue of pull requests is still more browser-shaped than attention-shaped. Open notifications, click a PR, wait for the page, scan the description, jump to files, approve, merge, go back, repeat. None of those steps is hard. That is exactly why the cost is easy to miss. It is death by one thousand tiny context switches.

So I built [github-pr-attention](https://github.com/vinitkumar/github-pr-attention): a small terminal UI in Go for treating pull requests like an inbox. See what needs you, open the item, decide, act, move on. No mouse. No tab archaeology. No pretending the notifications page is a workflow.

[![asciicast](https://asciinema.org/a/yc2GopjUrsbSgD3b.svg)](https://asciinema.org/a/yc2GopjUrsbSgD3b)


## The Problem

GitHub's web UI is optimized around a single pull request. That makes sense for deep review, but it is clumsy when your real job is keeping a queue moving.

If you maintain a few repositories, a normal review loop can look like this:

1. Open GitHub notifications or a repository pull request page.
2. Click into a PR.
3. Wait for the page to load.
4. Read the description.
5. Check the changed files.
6. Approve, comment, request changes, merge, or close.
7. Go back and do it again.

This is fine once. It is annoying ten times. It is especially annoying when the actual decision is quick: "looks good", "needs a small change", "CI failed", "merge it".

I wanted the loop to be closer to email triage:

1. Show me the list.
2. Let me filter it.
3. Let me open the thing under the cursor.
4. Let me act with one or two keystrokes.
5. Put me back where I was.

That is the whole product philosophy. It is not trying to replace GitHub. It is trying to remove the browser from the boring, repetitive parts.

## What It Does

`github-pr-attention` gives you a focused PR inbox in the terminal:

- Lists pull requests that need your attention.
- Filters the list with `/`.
- Opens a detail view with the PR description and changed files.
- Lets you comment, approve, request changes, squash merge, or close from the keyboard.
- Supports bulk squash merge across the filtered list when the queue is clean and you want it gone.

The keymap is intentionally small and vim-flavored:

```text
j / k or arrows : move selection
/                : filter the PR list (enter to apply, ctrl+u to clear)
enter            : open PR details
tab              : switch between PR description and changed files
r                : refresh inbox
o                : open selected PR in a browser
c                : add an issue comment
a                : approve the PR
x                : request changes
m                : merge the PR with squash merge
M                : bulk merge all listed PRs with squash merge
d                : close the PR without merging
esc              : go back or cancel compose mode
ctrl+s           : submit compose mode
q                : quit
```

If you have used `mutt`, `aerc`, `lazygit`, or any Charm-style TUI, the shape should feel familiar: list on the left, detail on demand, actions close to your fingers.

## The Stack

The project is written in Go and built on the [Charm](https://charm.sh/) ecosystem:

- [`bubbletea`](https://github.com/charmbracelet/bubbletea) for the Elm-style update loop.
- [`bubbles`](https://github.com/charmbracelet/bubbles) for list, viewport, and text input components.
- [`lipgloss`](https://github.com/charmbracelet/lipgloss) for styling.
- [`glamour`](https://github.com/charmbracelet/glamour) for rendering PR markdown in the terminal.

That stack makes this kind of app pleasant to build. Bubbletea keeps state transitions explicit, Bubbles provides the boring UI primitives, Lipgloss makes the output readable, and Glamour saves PR descriptions from becoming raw markdown soup.

```diagram
╭──────────────╮     ╭─────────────────╮     ╭────────────╮
│ GitHub API   │────▶│ bubbletea Model │────▶│ Terminal   │
│ PRs, actions │     │  list / detail  │     │ lipgloss   │
╰──────────────╯     ╰────────┬────────╯     ╰────────────╯
                              │
                              ▼
                       ╭────────────╮
                       │  glamour   │
                       │ markdown   │
                       ╰────────────╯
```

The code follows the usual Bubbletea shape: fetch data, turn events into messages, update the model, render the current state. That structure matters because review tools have a lot of tiny edge cases. A comment can fail. A merge can be blocked. A filter can change while an item is selected. Keeping those transitions explicit makes the program easier to reason about than a pile of callbacks slowly gaining sentience.

## Design Choices

A few opinions are baked into the tool.

### Squash merge is the default

Almost every team I work with uses squash merges as the boring, sensible default. So the fast path is optimized for that. Press `m`, squash merge the selected PR. Press `M`, squash merge everything in the current filtered list.

If you need a rebase merge or a merge commit, you can still press `o` and open the PR in the browser. I would rather make the common case excellent than make every possible case equally mediocre.

### No daemon, no background sync

The tool fetches when it starts and when you press `r`. That is it.

It does not need a background service, a menu bar icon, a tray app, or a tiny process quietly eating CPU because it believes your pull requests are breaking news. Open it, clear the queue, close it.

### Two views, one flow

There is a list view and a detail view. The detail view lets you switch between the PR description and the changed files with `tab`.

There is deliberately no full inline diff viewer. At that point you probably want your editor, your test runner, and the repository checked out locally. This tool is for attention management and review actions, not for replacing the environment where serious code review happens.

### Compose mode is modal

When you press `c`, the app enters compose mode. `ctrl+s` submits. `esc` cancels.

That sounds like a tiny detail, but it matters. Enter should not accidentally fire a half-written comment at another human being. Computers already help us embarrass ourselves enough.

## Why a TUI?

TUIs are constrained in useful ways. You get a grid of cells, a keyboard, and no room for decorative nonsense. Every interaction has to justify its existence.

That constraint is perfect for a review queue. A PR inbox does not need a grand visual hierarchy. It needs speed, legibility, and predictable actions. It needs to preserve flow.

The terminal also has a nice property that browser tools rarely have: it is already part of the development loop. I can run tests, inspect a branch, open the PR inbox, approve something, and go back to coding without mentally changing rooms.

And yes, selfishly, a tool that opens quickly and lets me clear ten straightforward PRs in a couple of minutes is just nicer than click, wait, scroll, click, back, sigh.

## Where It Goes Next

The current version already covers the workflow I built it for, but a few things are on my list:

- Configurable merge strategy per repository, with squash remaining the default.
- Better handling for draft PRs and PRs blocked on CI.
- Smarter "needs your attention" filtering beyond GitHub's review-requested filter.
- Persisted filters, so each project can have its own saved view.
- A more useful changed-files view without turning the app into a full diff viewer.

If this sounds useful, the repo is here: [vinitkumar/github-pr-attention](https://github.com/vinitkumar/github-pr-attention).

Issues and PRs are welcome. Bonus points if you review them from inside the tool, because that is how we complete the tiny little productivity ouroboros.
