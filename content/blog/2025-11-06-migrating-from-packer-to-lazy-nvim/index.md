---
title: "Migrating from Packer to Lazy.nvim: A 15x Faster Startup and Why Packer is Dead"
date: "2025-11-06"
description: "Discover how switching from Packer to Lazy.nvim slashed my Neovim startup time from 1797ms to 115ms. Dive into the detailed migration process, lazy-loading optimizations, and why Packer is no longer viable for modern Neovim users."
---

In the ever-evolving world of Neovim plugins, staying current isn't just about features—it's about performance. My recent migration from Packer to Lazy.nvim didn't just modernize my setup; it transformed it, delivering a staggering 15x improvement in startup time. Let's unpack this migration, explore the nitty-gritty changes, and discuss why Packer, once a favorite, has become a relic of the past.

## The Packer Exodus: Why I Finally Made the Switch

For years, Packer served me well as my Neovim plugin manager. It was the go-to choice when I first embraced Lua-based configurations. But as the ecosystem matured, cracks began to appear:

- **Stagnation**: The repository has seen minimal activity, with pull requests languishing unmerged for months.
- **Maintenance Burden**: The maintainer has shifted focus, leaving users to fend for themselves with bugs and compatibility issues.
- **Performance Bottlenecks**: While functional, Packer lacks the optimizations that modern managers like Lazy offer.

Lazy.nvim, created by the same team behind some of Neovim's most popular plugins, emerged as the natural successor. It's not just faster—it's designed for the way we use Neovim today, with lazy-loading and performance-first architecture.

## Diving into the Migration: PR #8 in Detail

The migration captured in [PR #8](https://github.com/vinitkumar/nvim/pull/8) of my nvim config was more than a simple swap. It was a comprehensive overhaul that touched nearly every aspect of my configuration while maintaining the same single-file `init.lua` approach I prefer.

### Core Changes: From Packer to Lazy

The heart of the migration was replacing Packer's `startup` function with Lazy's declarative `setup`. Instead of:

```lua
packer.startup(function(use)
  use 'wbthomason/packer.nvim'
  -- plugins...
end)
```

Lazy uses a table-based approach:

```lua
require("lazy").setup({
  -- plugins as tables...
})
```

This change alone brought structural improvements, but the real magic happened in the optimizations.

### Lazy-Loading: The Performance Game-Changer

One of Lazy's killer features is its sophisticated lazy-loading system. In my config, I implemented multiple loading strategies:

- **Event-based loading**: Plugins like `fzf.vim` now load only when the `:Files` command is invoked
- **Keymap triggers**: `nvim-tree` loads when pressing `<C-n>`
- **Filetype loading**: Language-specific plugins load only for relevant file types
- **Command loading**: Plugins like Copilot activate only when needed

### Lualine Optimization: Cutting the Fat

Lualine, my statusline plugin, was a performance drain due to aggressive refresh settings. The PR removed expensive `CursorMoved` events and enabled the global statusline, reducing unnecessary redraws.

### Colorscheme Caching: Smart System Calls

A clever optimization cached colorscheme availability checks, eliminating redundant system calls that were happening on every startup.

### Deferred Setup: Non-Critical Plugins on Ice

Plugins like indent-blankline (`ibl`) and `nvim-tree` now load asynchronously, preventing them from blocking the main UI thread during startup.

### Code Cleanup: Removing Duplicates

The migration eliminated about 60 lines of duplicate autocmd definitions, streamlining the configuration without losing functionality.

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
