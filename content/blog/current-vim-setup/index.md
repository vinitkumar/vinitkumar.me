---
title: My Current Vim Setup in Terminal and GUI
date: "2025-03-11"
description: "A detailed look at my Vim configuration for both terminal and GUI environments"
---

# My Current Vim Setup in Terminal and GUI

As a long-time Vim user, I've carefully curated my Vim configuration to create a powerful and efficient development environment. My setup works seamlessly in both terminal Vim and GVim (GUI Vim), providing flexibility depending on my needs. Let me walk you through the key components and explain why I chose them.

## Essential Plugins

My plugin setup is minimal but powerful, managed by vim-plug. Here are the core plugins I use:

```vim
call plug#begin('~/.vim/plugged')
  Plug 'tpope/vim-commentary'
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'junegunn/fzf.vim'
  Plug 'neoclide/coc.nvim', {'branch': 'master'}
  Plug 'tpope/vim-fugitive'
  Plug 'github/copilot.vim'
  Plug 'vimwiki/vimwiki'
call plug#end()
```

Each plugin serves a specific purpose:
- **vim-commentary**: Quick code commenting
- **fzf & fzf.vim**: Lightning-fast fuzzy file finding and searching
- **coc.nvim**: Modern LSP support for intelligent code completion
- **vim-fugitive**: Git integration
- **copilot.vim**: AI-powered code suggestions
- **vimwiki**: Personal note-taking and wiki system

## Smart Environment Detection

One of the interesting features of my setup is automatic theme switching based on macOS's appearance settings:

```vim
function! ChangeBackground()
  set termguicolors
  hi LineNr ctermbg=NONE guibg=NONE
  if system("defaults read -g AppleInterfaceStyle") =~ '^Dark'
    set background=dark
    if has('gui_running')
        colorscheme solarized
        set guifont=Source\ Code\ Pro:h16
    else
        colorscheme base16-bright
    endif
  else
    colorscheme rosepine
    set background=light
  endif
endfunction
```

This function automatically switches between light and dark themes based on my system preferences. In GVim, it uses Solarized theme with Source Code Pro font, while in terminal it uses different themes optimized for each environment.

## File-specific Settings

I use autocommands to set specific configurations based on file types:

```vim
augroup filetypedetect
  autocmd BufNewFile,BufRead *.md set filetype=markdown sts=4 shiftwidth=4
  autocmd BufReadPost,BufNewFile *.md,*.txt,COMMIT_EDITMSG set wrap linebreak nolist spell spelllang=en_us complete+=kspell
  autocmd FileType javascript setlocal expandtab sw=2 ts=2 sts=2
  autocmd FileType typescript setlocal expandtab sw=2 ts=2 sts=2
  " ... more file types
augroup END
```

This ensures consistent formatting across different file types and enables features like spell checking for markdown and text files.

## Keyboard Mappings

My configuration includes carefully chosen keyboard mappings for efficiency:

- `,` as the leader key
- Quick file navigation with `Ctrl-p` for file search
- Buffer management with `Ctrl-b`
- Git commit browsing with `Ctrl-c`
- Split window navigation with `Ctrl-h/j/k/l`

## GUI vs Terminal Usage

When I need seamless system clipboard integration or want a different visual experience, I use GVim. My configuration detects the GUI environment and applies specific settings:

```vim
if has('gui_running')
    colorscheme solarized
    set guifont=Source\ Code\ Pro:h16
endif
```

The GUI version offers advantages like:
- Better system clipboard integration
- Custom font rendering with Source Code Pro
- No terminal color limitations
- Easy menu access for less-used commands

## Quality of Life Features

Some notable features in my configuration:

1. **Automatic Trailing Space Removal**:
```vim
autocmd BufWritePre * :call StripTrailingWhitespace()
```

2. **Custom Status Line**:
I use a lightweight custom status line configuration instead of heavy plugins:
```vim
set statusline=
set statusline +=%1*\ %n\ %*            "buffer number
set statusline +=%5*%{&ff}%*            "file format
set statusline +=%3*%y%*                "file type
" ... more status line components
```

3. **Auto-reload Files**:
```vim
autocmd FocusGained,BufEnter,CursorHold,CursorHoldI *
    \ if mode() !~ '\v(c|r.?|!|t)' && getcmdwintype() == '' | checktime | endif
```
This ensures files are automatically reloaded when changed externally.

## Code Intelligence with CoC

The configuration includes comprehensive CoC (Conquer of Completion) settings for modern IDE-like features:
- Code navigation (go to definition, references)
- Intelligent auto-completion
- Real-time diagnostics
- Code actions and quick fixes

## My Neovim Setup

I also maintain a modern Neovim configuration written in Lua, which provides similar functionality with some modern improvements. Here's a detailed breakdown of my Neovim setup:

### Plugin Management with Packer

My Neovim configuration uses Packer as the plugin manager, with a carefully selected set of plugins:

- Core plugins like `fzf` and `fzf.vim` for fuzzy finding
- `coc.nvim` for LSP support and intelligent code completion
- `vim-commentary` for quick commenting
- `copilot.vim` for AI-assisted coding
- Theme-related plugins including `tinted-vim` and `solarized-osaka.nvim`

### Modern Editing Features

The configuration includes numerous modern editing features:

1. **Smart Indentation and Formatting**:
- Auto-indentation
- Smart tab behavior
- Language-specific formatting rules
- Proper UTF-8 encoding support

2. **Advanced Folding**:
- Indent-based folding
- Starts with all folds open
- Custom fold text display

3. **Enhanced UI Elements**:
- Line numbers with relative numbering
- Custom listchars for whitespace visualization
- Modern terminal colors support
- Cursor line highlighting

### Solarized Osaka Theme Configuration

I use a customized version of the Solarized Osaka theme with specific settings:

- Transparent background support
- Custom styling for comments and keywords
- Adaptive brightness for day/night usage
- Special handling for sidebars and floating windows

### Smart Background Switching

Similar to my Vim configuration, the Neovim setup includes automatic theme switching based on macOS's appearance settings:

```lua
function SwitchBackgroundAndColorScheme()
  local mac_ui_mode = vim.fn.system('defaults read -g AppleInterfaceStyle')
  mac_ui_mode = mac_ui_mode:gsub('%s+', '')
  if mac_ui_mode == 'Dark' then
    vim.opt.background = 'dark'
    vim.cmd("colorscheme solarized-osaka")
  else
    vim.opt.background = 'light'
    vim.cmd("colorscheme solarized-osaka-day")
  end
end
```

### Advanced Auto Commands

The Neovim configuration includes a comprehensive set of auto commands using the modern Lua API:

- File type-specific settings for various languages
- Automatic spell checking for documentation files
- Special theme handling for markdown and wiki files
- Automatic saving for TypeScript files
- Custom handling for YAML files

### Intelligent Key Mappings

The configuration includes carefully thought-out key mappings:

- Leader key set to `,`
- File navigation with `Ctrl-p`
- Buffer management with `Ctrl-b`
- Git integration with `Ctrl-g`
- Advanced CoC integration for code navigation
- Split window management
- Tab navigation

### CoC Integration

The Neovim setup includes sophisticated CoC integration with:

- Tab completion
- Intelligent backspace handling
- Enhanced enter key behavior
- Automatic popup menu navigation

## Conclusion

This Vim a nd Neovim setup provides a powerful development environment that works seamlessly in both terminal and GUI environments. The configuration focuses on:
- Fast file navigation and search
- Modern code completion and intelligence
- Git integration
- Automatic environment adaptation
- Consistent code formatting
- Efficient keyboard mappings

Whether I'm working in the terminal or need the convenience of GUI features, this setup ensures I have all the tools I need for efficient coding.

Here is my current config files for vim: https://github.com/vinitkumar/.vim/raw/refs/heads/master/vimrc

Here is my current Neovim Config: https://github.com/vinitkumar/nvim/raw/refs/heads/main/init.lua

Feel free to use it or borrow some parts.

- Fin
