---
title: "Closing the fzf.vim Gaps in fff-plus.nvim"
date: "2026-07-20"
description: "How fff-plus.nvim gained fuzzy matching, correct Git pickers, multi-select actions, fullscreen layouts, and Git diff previews without growing beyond its extension-plugin role."
tags: ["neovim", "lua", "git", "open-source", "plugins"]
featured: true
---

Earlier this month, I wrote about why I moved my extra [`fff.nvim`](https://github.com/dmtrKovalenko/fff.nvim) pickers into a separate extension plugin: [`fff-plus.nvim`](https://github.com/vinitkumar/fff-plus.nvim). The architecture felt right, but the pickers still lacked some behavior I relied on in `fzf.vim`.

I have now closed the most important of those gaps in [fff-plus.nvim PR #7](https://github.com/vinitkumar/fff-plus.nvim/pull/7).

This update is less about adding a long list of new pickers and more about making the existing ones behave like complete daily tools. Buffers, colorschemes, tracked files, and Git status files now share fuzzy matching, correct long-list scrolling, better actions, and consistent layouts.

## See it in action

The demo shows tracked-file search, Git-status diff previews, multi-select and quickfix, and the fullscreen buffer picker.

<media-controller class="fff-plus-demo-player" aria-label="fff-plus.nvim picker usage demo">
  <video slot="media" playsinline preload="metadata" crossorigin>
    <source src="https://cdn.jsdelivr.net/gh/vinitkumar/fff-plus.nvim@59efd2fcb44146b84a0176b48fc42cffccf22c77/assets/fff-plus-usage.mp4" type="video/mp4" />
    Your browser cannot play this video. <a href="https://cdn.jsdelivr.net/gh/vinitkumar/fff-plus.nvim@59efd2fcb44146b84a0176b48fc42cffccf22c77/assets/fff-plus-usage.mp4">Open the MP4 directly.</a>
  </video>
  <media-play-button slot="centered-chrome" aria-label="Play demo"></media-play-button>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-seek-backward-button seekoffset="10"></media-seek-backward-button>
    <media-seek-forward-button seekoffset="10"></media-seek-forward-button>
    <media-time-display showduration></media-time-display>
    <media-time-range></media-time-range>
    <media-playback-rate-button rates="0.5 1 1.25 1.5 2"></media-playback-rate-button>
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
</media-controller>

## An audit before implementation

I started by comparing the combined `fff.nvim` and `fff-plus.nvim` experience with `fzf.vim`. That audit helped separate two kinds of missing work.

The first kind was new picker families: lines, marks, jumps, history, tags, commits, commands, and help. Those deserve a reusable extension-picker framework rather than a collection of one-off implementations.

The second kind was shared behavior missing from the pickers that already existed. This was the right scope for the current update:

- ranked fuzzy matching instead of literal substring filtering,
- a viewport that follows the selected item through long lists,
- correct tracked-file and Git-status semantics,
- multi-select, quickfix, paste, split, vertical split, and tab actions,
- fullscreen command layouts,
- existing-window jumps for buffers,
- and diff previews for changed Git files.

Fixing these foundations gives every current picker a better baseline and gives future pickers less behavior to reinvent.

## `:GFiles` now means tracked files

The old Git picker had a naming problem. `git_files()` used `git status -s`, while the optional `:GFiles` compatibility command suggested the `fzf.vim` behavior: files tracked by Git.

Those are different sources, so the plugin now exposes both explicitly:

| Workflow | Lua API | Command |
| --- | --- | --- |
| Tracked files | `require("fff_plus").tracked_files()` | `:FFFPlusGitFiles` |
| Changed files | `require("fff_plus").git_status()` | `:FFFPlusGitStatus` |

With legacy commands enabled, `:GFiles` now opens tracked files, matching `fzf.vim`. The older `git_files()` API and `:FFFPlusGFiles` command remain compatibility aliases for the Git-status picker, so existing configurations do not break immediately.

The Git source also moved to NUL-delimited parsing. That matters for filenames containing spaces, tabs, or other characters that line-oriented parsing can mishandle. Rename records are parsed explicitly instead of being guessed from display text.

## Shared actions across file-like pickers

The buffer and Git pickers now support the same practical actions as the upstream FFF picker defaults:

| Action | Default key |
| --- | --- |
| Toggle selection | `<Tab>` |
| Send selected or current entries to quickfix | `<C-q>` |
| Open in a horizontal split | `<C-s>` |
| Open in a vertical split | `<C-v>` |
| Open in a tab | `<C-t>` |
| Paste selected or current paths | `<A-CR>` |

Selection behavior lives in a shared module, which is important. Multi-select should not be subtly reimplemented by each picker. The buffer picker can also jump to a window that already displays the selected buffer:

```lua
require("fff_plus").buffers({
  jump_to_existing = true,
  keymaps = { paste = "<M-p>" },
})
```

## Better ranking and long-list behavior

The extension pickers previously used case-insensitive substring matching. That worked for small lists, but it did not feel like a fuzzy finder. They now use a shared ranked matcher, so non-contiguous queries produce useful results and stronger matches rise to the top.

The rendering code also has a real viewport now. Moving beyond the visible rows keeps the selected item on screen instead of advancing an invisible cursor. This sounds like a small detail, but it is the difference between a picker that works in a demo and one that works with a large repository or a long buffer list.

The same ranking is preserved whether the prompt is at the top or the bottom, with regression tests covering both layouts.

## Fullscreen layouts and useful Git previews

Adding `!` to an extension command now opens it fullscreen:

```vim
:FFFPlusBuffers!
:FFFPlusGitFiles!
:FFFPlusGitStatus!
```

The Git-status picker now previews the actual diff when it can. If a diff is not available, it falls back to file contents. That makes the picker useful for reviewing a working tree, not just navigating it.

## The extension stays deliberately small

This update adds a lot of capability, but it does not change the plugin boundary. Upstream `fff.nvim` still owns the Rust backend, file indexing, live grep, frecency, binary downloads, and releases. `fff-plus.nvim` remains a Lua extension for extra picker workflows.

The next architectural step is to extract a reusable extension-picker framework before adding the deferred picker families. That should make lines, history, marks, jumps, tags, commits, commands, and help easier to build without copying large picker implementations.

For now, the existing pickers are considerably closer to the `fzf.vim` workflows that inspired them.

You can read the full change in [PR #7](https://github.com/vinitkumar/fff-plus.nvim/pull/7), see the [current configuration and command reference](https://github.com/vinitkumar/fff-plus.nvim#readme), or start with my earlier post, [fff-plus.nvim: The Better Shape for My fff.nvim Picker Work](/fff-plus-nvim-extension/).
