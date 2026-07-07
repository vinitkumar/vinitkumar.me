---
title: "fff-plus.nvim: The Better Shape for My fff.nvim Picker Work"
date: "2026-07-07"
description: "Why I moved my fff.nvim picker additions from a full fork into fff-plus.nvim, a smaller extension plugin that keeps upstream fff.nvim in charge of the fast Rust backend."
tags: ["neovim", "lua", "rust", "open-source", "plugins"]
featured: true
---

I recently released [fff-plus.nvim](https://github.com/vinitkumar/fff-plus.nvim), a small extension plugin for [fff.nvim](https://github.com/dmtrKovalenko/fff.nvim).

This is the next version of an idea I wrote about earlier in [Why I Forked fff.nvim and Turned It Into a Complete Picker Ecosystem](/fff-nvim-fork/). That post was about my [old `fff.nvim` fork](https://github.com/vinitkumar/fff.nvim), where I added the picker workflows I missed from `fzf.vim`: buffers, git status files, and colorschemes.

The fork worked. It solved my problem. But after living with it for a while, I think `fff-plus.nvim` is the better idea.

## The fork proved the workflow

The original motivation has not changed. I like `fff.nvim` because the core file picker is fast. The Rust backend, file indexing, live grep, frecency scoring, preview support, and layout work are all excellent. When I moved more of my workflow to it, I did not want to keep another fuzzy finder around just for a few missing commands.

So I added the missing pieces:

- `:FFFBuffers` for switching between open buffers.
- `:Colors` for browsing colorschemes with live preview.
- `:GFiles` for searching the files from `git status -s`.

Those are small workflows, but they matter because they sit directly in daily editor muscle memory. I use them the way I used to use `:Buffers`, `:Colors`, and `:GFiles?` from `fzf.vim`.

The fork was a good first step because it let me move fast. I could reuse internal `fff.nvim` modules, shape the pickers against my real config, and make the picker set feel coherent.

But a fork comes with a cost.

## The problem with owning the whole fork

My picker additions are Lua code. They do not need to own the Rust backend. They do not need to publish binaries. They do not need to carry the downloader. They do not need to decide how upstream file search or live grep evolves.

That is the awkward part of a fork. Even if your actual change is small, you inherit responsibility for the whole surface area:

- keeping up with upstream changes,
- resolving merge drift,
- making releases from the fork,
- explaining to users whether they should install upstream or the fork,
- and carrying a social boundary that feels more competitive than additive.

None of that is the interesting part of this work. The interesting part is: can `fff.nvim` grow a picker ecosystem around its very fast core?

That question is better answered by an extension plugin.

## What fff-plus.nvim does

`fff-plus.nvim` depends on upstream `fff.nvim` and adds the extra pickers under its own namespace:

```lua
require("fff_plus").buffers()
require("fff_plus").colors()
require("fff_plus").git_files()
```

It also registers explicit commands:

```vim
:FFFPlusBuffers
:FFFPlusColors
:FFFPlusGFiles
```

The plugin currently includes the same practical picker workflows from my fork:

| Picker | What it is for |
| --- | --- |
| `buffers()` | Switch through listed buffers with preview and buffer deletion. |
| `colors()` | Browse colorschemes with live preview and restore on cancel. |
| `git_files()` | Browse files from `git status -s` with status indicators and preview. |

The installation shape is simple: install upstream `fff.nvim` first, then install `fff-plus.nvim` next to it.

```lua
{
  "dmtrKovalenko/fff.nvim",
  build = function()
    require("fff.download").download_or_build_binary()
  end,
  lazy = false,
},
{
  "vinitkumar/fff-plus.nvim",
  dependencies = { "dmtrKovalenko/fff.nvim" },
  opts = {
    legacy_commands = false,
  },
  keys = {
    { "<C-b>", function() require("fff_plus").buffers() end, desc = "FFF+ buffers" },
    { "<leader>c", function() require("fff_plus").colors() end, desc = "FFF+ colors" },
    { "<leader>g", function() require("fff_plus").git_files() end, desc = "FFF+ git files" },
  },
}
```

If you want the old command muscle memory, `legacy_commands = true` can also register aliases such as `:FFFBuffers`, `:Colors`, and `:GFiles`.

## Why this is a better idea

The best version of this plugin is not a permanent fork. It is a thin layer around upstream.

That has a few advantages.

First, upstream keeps owning the hard part. `fff.nvim` is fast because of the native backend and the core architecture around it. I do not want to duplicate that responsibility. With `fff-plus.nvim`, users can keep getting upstream improvements directly.

Second, the scope is honest. This plugin adds picker workflows. That is its job. It does not pretend to be a full replacement for the original project.

Third, the maintenance burden is much smaller. I can release Lua picker improvements without doing a full backend release dance. I can also delete compatibility code more easily if upstream eventually exposes a cleaner extension API.

Fourth, the social shape is cleaner. A fork says, "use my version instead." An extension says, "use the original, and add this if it helps." That feels closer to what I actually want.

Finally, it leaves room for an ecosystem. If `fff.nvim` becomes a fast core with extension points around it, then pickers do not all need to live in one repo. Buffers, git status, colorschemes, project symbols, recent files, diagnostics, commands, registers, and custom domain pickers can all be explored separately.

That is a healthier architecture than one plugin trying to absorb every workflow forever.

## The tradeoff

There is still a real tradeoff: `fff-plus.nvim` currently reuses some upstream internals.

That means an upstream refactor can break it even if `fff.nvim` itself is fine. I am okay with that for now because this is still the lightest maintenance model, but the long-term ideal is obvious: a small public picker-extension API in upstream `fff.nvim`.

Until then, `fff-plus.nvim` is deliberately modest. It adds the workflows I use every day, keeps the code separate, and lets upstream remain upstream.

## Try it

The plugin is here:

[github.com/vinitkumar/fff-plus.nvim](https://github.com/vinitkumar/fff-plus.nvim)

The older fork is still here for context:

[github.com/vinitkumar/fff.nvim](https://github.com/vinitkumar/fff.nvim)

And the original write-up about the fork is here:

[Why I Forked fff.nvim and Turned It Into a Complete Picker Ecosystem](/fff-nvim-fork/)

I still like the original idea: `fff.nvim` is a very fast foundation, and the missing picker workflows are worth building. I just think the extension plugin is the more honest, maintainable, and open-ended way to do it.
