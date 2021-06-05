---
title: Moving from Vim to NeoVim
date: "2021-06-05"
---

# Why Move?

Neovim has made significant progress in last 6 months (I am using 0.5-dev branch as my daily driver for more than 6 months now).
There has been a significant number of good plugins (e.g. Telescope) and many others (some of them are just lua based).

At present, I have a pretty great Vim setup and a nice NeoVim setup too. However, my neovim config is vim script based, but I want to use Lua for config. For this, I will start porting my `init.vim` to `init.lua` and switch completely to lua for all my vim config needs.
Lua is a nice little language, and it would be fun getting good at it and at the same time have good fun.

I want to get the autocomplete story in Neovim better or at par with what I have vim (COC.nvim and Vim). I could just use COC in neovim too, but I want to use the native LSP in Neovim for this purpose. My goal is to ultimately reduce the config to a minimum and settle on a small list of plugins which I can go with zone whenever I open my editor.

I'm also experimenting with terminal apps at the moment. I use iTerm2 (most convenient), but also Alacritty and Kitty (It is pretty great except it sucks with SSH, and its author doesn't want to work on that; hence I uninstalled it). Furthermore, I would  prefer not to change the terminal just to SSH.

## Following are the requirements and goals for this port

Requirements for port:
- autocomplete works and is always fast.

Ideal Neovim Setup:

- Config written in lua
- Modular, programmable setup
- Be able to use the latest goodness
- Ability to write custom plugins
- Learn Lua

