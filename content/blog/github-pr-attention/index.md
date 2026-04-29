---
title: "Github PR Attention: A Terminal UI for Taming the PR Inbox"
date: "2026-04-29"
featured: true
description: "Why I built github-pr-attention, a fast, vim-friendly TUI in Go for triaging, reviewing, and merging GitHub pull requests without leaving the terminal."
---

I spend most of my day in a terminal. Editor in one pane, shell in another, maybe a Slack window if I have to. The one thing that constantly pulled me back into a browser tab was GitHub. Specifically: pull requests. Triaging them, reviewing them, leaving a comment, approving, merging. Each of those is a few clicks and a page load away, and across a busy day it adds up to a real tax on attention.

So I wrote a tool that scratches that itch. It's called [github-pr-attention](https://github.com/vinitkumar/github-pr-attention), and it's a small terminal UI written in Go that turns your GitHub PR inbox into something that behaves a lot like a mail client, with vim keys and no mouse required.

## The Problem

GitHub's web UI is fine, but it is optimized for one PR at a time. If you have ten PRs waiting on you across a few repositories, the workflow looks roughly like:

1. Open the notifications page.
2. Click into a PR.
3. Wait for the page to load.
4. Read the description, scroll through the diff.
5. Approve, comment, or merge.
6. Hit back, repeat.

For maintainers and reviewers who already live in the terminal, that's a lot of context switching just to keep the queue moving.

I wanted something where the loop is: see the list, pick one, act on it, move on, in keystrokes only.

## What It Does

`github-pr-attention` is a TUI that:

- Lists the PRs that need your attention.
- Lets you filter the list with `/`.
- Opens a detail view with the PR description and changed files.
- Lets you comment, approve, request changes, merge with a squash, or close, all from the keyboard.
- Supports a bulk squash merge across the whole filtered list when you really want to clear the queue.

The full keymap is intentionally small and vim-flavored:

```
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

If you've ever used mutt, aerc, or any of the Charm-style TUIs, this should feel immediately familiar.

## The Stack

The whole thing is Go, leaning hard on the [Charm](https://charm.sh/) ecosystem:

- [`bubbletea`](https://github.com/charmbracelet/bubbletea) for the Elm-style update loop.
- [`bubbles`](https://github.com/charmbracelet/bubbles) for the list, viewport, and text input components.
- [`lipgloss`](https://github.com/charmbracelet/lipgloss) for styling.
- [`glamour`](https://github.com/charmbracelet/glamour) to render the PR description's markdown nicely in the terminal.

That stack is honestly the reason this project was fun to write. Bubbletea's `Model` / `Update` / `View` pattern keeps state changes explicit, and Glamour means a markdown-heavy PR description doesn't end up as a wall of raw asterisks and backticks.

```diagram
╭──────────────╮     ╭─────────────────╮     ╭────────────╮
│ GitHub API   │────▶│ bubbletea Model │────▶│ Terminal   │
│ (PRs, diffs) │     │  list / detail  │     │  (lipgloss)│
╰──────────────╯     ╰────────┬────────╯     ╰────────────╯
                              │
                              ▼
                       ╭────────────╮
                       │  glamour   │
                       │ markdown   │
                       ╰────────────╯
```

## Design Choices

A few opinions baked into the tool:

**Squash merge is the default.** Almost every team I work with uses squash merges as the boring, sensible default. If you want a different merge strategy, the tool tries to stay out of your way and you can fall back to `o` to open in a browser. I'd rather make the common case one keystroke than make every case configurable.

**No daemon, no background sync.** The tool fetches when you start it and when you press `r`. That's it. It's a tool you open, use, close. It does not need a tray icon, a notification daemon, or your CPU.

**Two views, one flow.** A list view and a detail view. The detail view has two panels you can flip between with `tab`: the description and the changed files. You don't get a full inline diff viewer, because at that point you should probably be in your editor. The tool's job is to get you to "I'm done with this PR" as quickly as possible, not to replace your IDE.

**Compose mode is modal.** When you hit `c` to comment, you drop into a text input. `ctrl+s` submits, `esc` cancels. No accidental send if you bump enter. This is the kind of thing that sounds boring but matters when you're using something every day.

## Why I Like Building TUIs

There's something honest about a TUI. There's no design system to argue about, no responsive breakpoints, no CSS specificity wars. You have a grid of cells and a keyboard. Every interaction has to earn its keystroke.

It also forces a kind of clarity in the model. With bubbletea, every state transition is a message. You can't sneak a side effect into a render path. That constraint maps surprisingly well to GitHub's API surface, which is itself just a bunch of message-shaped operations: comment, approve, merge, close.

And selfishly: a tool that opens in 50ms, runs entirely in my terminal, and lets me close ten PRs in two minutes is just nicer to use than a browser tab.

## Where It Goes Next

A few things on my list, in no particular order:

- Configurable merge strategy per repo (rebase / merge commit), still squash by default.
- Better handling of draft PRs and PRs blocked on CI.
- Smarter "needs your attention" filtering, beyond what GitHub's review-requested filter gives you.
- Persisted filters, so I can have a saved view per project.

If any of that sounds useful, or you just want a faster way to clear your PR queue, the repo is here: [vinitkumar/github-pr-attention](https://github.com/vinitkumar/github-pr-attention). Issues and PRs welcome, ideally reviewed using the tool itself.
