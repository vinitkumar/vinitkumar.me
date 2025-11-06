---
title: "Migrating from Packer to Lazy.nvim: A 15x Faster Startup and Why Packer is Dead"
date: "2025-11-06"
description: "Discover how switching from Packer to Lazy.nvim slashed my Neovim startup time from 1797ms to 115ms. Dive into the detailed migration process, lazy-loading optimizations, and why Packer is no longer viable for modern Neovim users."
---

![Neovim current setup](../../assets/nvim-current.png)

In the ever-evolving world of Neovim plugins, staying current isn't just about features—it's about performance. My recent migration from Packer to Lazy.nvim didn't just modernize my setup; it transformed it, delivering a staggering 15x improvement in startup time. Let's unpack this migration, explore the nitty-gritty changes, and discuss why Packer, once a favorite, has become a relic of the past.

## The Packer Exodus: Why I Finally Made the Switch

For years, Packer served me well as my Neovim plugin manager. It was the go-to choice when I first embraced Lua-based configurations. But as the ecosystem matured, cracks began to appear:

- **Stagnation**: The repository has seen minimal activity, with pull requests languishing unmerged for months.
- **Maintenance Burden**: The maintainer has shifted focus, leaving users to fend for themselves with bugs and compatibility issues.
- **Performance Bottlenecks**: While functional, Packer lacks the optimizations that modern managers like Lazy offer.

Lazy.nvim, created by the same team behind some of Neovim's most popular plugins, emerged as the natural successor. It's not just faster—it's designed for the way we use Neovim today, with lazy-loading and performance-first architecture.

## Diving into the Migration: PR #8 in Detail

This PR migrates the Neovim configuration from Packer to lazy.nvim, replacing the plugin manager while adding performance optimizations like lazy loading. The main file changed is `init.lua` (+42 additions, -98 deletions). Other files include `init.lua.back` (backup), `lazy-lock.json` (new lockfile), and `nvim.png` (likely an icon update).

### Core Changes: From Packer to Lazy

The heart of the migration was replacing Packer's `startup` function with Lazy's declarative `setup`. Instead of:

```lua
packer.startup(function(use)
  use 'wbthomason/packer.nvim'
  use 'junegunn/fzf'
  -- ... (all plugin 'use' calls)
end)
```

Lazy uses a table-based approach with bootstrap code:

```lua
-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- Setup lazy.nvim
require("lazy").setup({
  -- plugin specs here
})
```

### Lazy-Loading: The Performance Game-Changer

Migrated plugins with Lazy's sophisticated lazy-loading system, adding `event`, `cmd`, `keys`, `build`, and `dependencies` for performance.

**Example before (Packer):**
```lua
use {'neoclide/coc.nvim', branch = 'master', run = 'npm ci'}
use {'tpope/vim-commentary'}
use {'nvim-lualine/lualine.nvim', requires = { 'nvim-tree/nvim-web-devicons', opt = true }}
```

**After (lazy):**
```lua
{ 'neoclide/coc.nvim', branch = 'master', build = 'npm ci', event = 'BufReadPre' },
{ 'tpope/vim-commentary', keys = { { 'gc', mode = { 'n', 'v' } } } },
{
  'nvim-lualine/lualine.nvim',
  dependencies = { 'nvim-tree/nvim-web-devicons' },
  event = 'VeryLazy'
}
```

This implements multiple loading strategies:
- **Event-based loading**: Plugins like `fzf.vim` now load only when the `:Files` command is invoked
- **Keymap triggers**: `nvim-tree` loads when pressing `<C-n>`
- **Command loading**: Plugins like Copilot activate only when needed

### Lualine Optimization: Cutting the Fat

Updated lualine config to enable global statusline and remove expensive refresh events:

```lua
require('lualine').setup {
  -- ...
  globalstatus = true,  -- Changed from false
  refresh = {
    -- Removed 'CursorMoved' and 'CursorMovedI' events
    statusline = 1000,
    tabline = 1000,
    winbar = 1000,
    refresh_time = 16, -- ~60fps
    events = {
      'WinEnter',
      'BufEnter',
      'BufWritePost',
      'SessionLoadPost',
      'FileChangedShellPost',
      'VimResized',
      'Filetype',
      'ModeChanged',
    },
  },
}
```

### Deferred Setup: Non-Critical Plugins on Ice

Moved non-critical setups into `vim.defer_fn()` for startup performance:

```lua
-- Defer non-critical setup
vim.defer_fn(function()
  require("ibl").setup()
  require("nvim-tree").setup()
end, 0)
```

This prevents plugins like indent-blankline (`ibl`) and `nvim-tree` from blocking the main UI thread during startup.

### Code Cleanup: Removing Duplicates

Eliminated duplicate autocmd definitions and redundant code, such as multiple yaml filetype sets and a typescript callback that auto-saved files. Removed about 60 lines without losing functionality.

## The Numbers Don't Lie: Performance Gains

The results speak for themselves:

- **Before**: 1797ms startup time
- **After**: 115ms startup time
- **Improvement**: ~15x faster

That's the difference between waiting almost 2 seconds and having Neovim ready in under a tenth of a second. In practical terms, this means instant responsiveness when opening files, switching projects, or just launching the editor.

## Why Packer is Officially Dead

Let's be clear: Packer isn't just "less optimal"—it's effectively unmaintained:

- **Last meaningful update**: Over a year ago, with only minor patches since
- **Open PRs**: Hundreds of pull requests sit unmerged, including critical bug fixes and feature requests
- **Community shift**: The Neovim community has overwhelmingly moved to Lazy or other modern managers
- **Security concerns**: Unmaintained code is a liability in any setup

While Packer worked well during its prime, the lack of active development means missing out on performance optimizations, new Neovim features, and ecosystem advancements. If you're still using Packer, you're not just using outdated technology—you're actively choosing slower startup times and potential compatibility issues.

## Migration Tips for Fellow Neovim Users

If you're considering this migration:

1. **Start small**: Migrate one plugin at a time to understand Lazy's syntax
2. **Leverage lazy-loading**: Not just for performance, but for cleaner keymap management
3. **Profile first**: Use `:Lazy profile` to identify your biggest performance bottlenecks
4. **Preserve your workflow**: Lazy can replicate any Packer functionality with better performance

## Conclusion: The Future is Lazy

This migration wasn't just about faster startups—it was about embracing the future of Neovim plugin management. Lazy.nvim represents the next evolution, combining performance, maintainability, and modern features in a package that's actively developed and community-supported.

If your Neovim feels sluggish, it's worth the switch. The 15x improvement in my case might be the extreme end, but even conservative estimates show 3-5x improvements for most users. In the world of text editors, every millisecond counts, and Lazy delivers them in spades.

The code for this migration lives in my [nvim config repo](https://github.com/vinitkumar/nvim), and I'm happy to help if you're undertaking a similar journey. What's holding you back from making the switch?
