---
title: Moving from Vim to Neovim, A Smooth Transition
date: "2023-05-24"
---

![Imgur](https://i.imgur.com/ZGDBz2M.png)

Vim has long been a popular choice for developers and power users as a highly customizable and efficient text editor. However, in recent years, Neovim has emerged as a promising alternative to Vim, offering improved performance, enhanced features, and better extensibility. If you're considering making the switch from Vim to Neovim, this blog post will guide you through the process and highlight the benefits of using Neovim.

## What is Neovim?

Neovim is a modern fork of Vim that aims to improve upon Vim's limitations while preserving its core principles and functionalities. Neovim maintains backward compatibility with Vim, meaning your existing Vim configuration and plugins should work seamlessly in Neovim with little to no modifications.

## Why switch to Neovim?

There are several reasons why you might consider switching from Vim to Neovim:

1. **Performance:** Neovim is built with a strong focus on performance, offering faster startup times and smoother editing experience compared to Vim. Neovim's architecture allows for better parallelism and asynchronous processing, resulting in improved responsiveness and reduced latency.

2. **Enhanced features:** Neovim introduces several new features and improvements over Vim. Some notable features include built-in terminal emulation, support for floating windows and pop-ups, better job control, and a revamped API for plugin development.

3. **Better extensibility:** Neovim provides a more powerful and flexible plugin architecture, making it easier to develop and maintain plugins. Neovim's API offers enhanced scripting capabilities and better integration with modern tools and language servers.

## Migrating your Vim configuration to Neovim

Migrating your Vim configuration to Neovim is a straightforward process, thanks to their high level of compatibility. Here are the steps to get started:

1. **Install Neovim:** Visit the Neovim website (https://neovim.io/) and follow the installation instructions for your operating system.

2. **Copy your Vim configuration:** Neovim uses the same configuration file format as Vim. Locate your `.vimrc` file and copy it to Neovim's configuration directory. In the case of Neovim, the configuration file is typically located at `~/.config/nvim/init.vim`.

3. **Install plugins:** Neovim supports the same plugin manager as Vim, such as Vundle, Pathogen, or vim-plug. Install your preferred plugin manager and use it to install the plugins you were using in Vim. In your Neovim configuration file, make sure to include the necessary plugin manager setup and plugin configurations.

4. **Update plugin-specific configurations:** While most plugins should work out of the box, some plugins may require specific configurations or adjustments for Neovim. Consult the documentation or GitHub repository of each plugin to ensure proper compatibility and make any necessary changes.

5. **Test and refine:** Launch Neovim and test your configuration and plugins. Check for any error messages or unexpected behavior and make the necessary adjustments. Neovim provides extensive documentation and a helpful community that can assist you in troubleshooting and optimizing your setup.

## Notable Neovim-specific features and improvements

Once you have successfully migrated to Neovim, you can take advantage of its unique features and improvements. Here are a few noteworthy features that Neovim offers:

1. **Built-in terminal:** Neovim includes a built-in terminal emulator, allowing you to run shell commands directly within your editor. This feature eliminates the need to switch between a separate terminal window and your text editor, making it easier to interact with command-line tools and build systems.

2. **Floating windows and pop-ups:** Neovim introduces support for floating windows and pop-ups, which are highly useful.

Here are some points of comparison between a typical `.vimrc` configuration file for Vim and an `init.lua` configuration file for Neovim:

1. **File format:** The `.vimrc` file uses a plain text format, whereas the `init.lua` file uses a Lua scripting format. Lua is a lightweight and highly extensible scripting language, allowing for more advanced configuration options and logic in the `init.lua` file.

2. **Plugin management:** In Vim, plugin management is typically done using plugin managers like Vundle, Pathogen, or vim-plug, which are included and configured in the `.vimrc` file. In Neovim, plugin management is often done using Lua-based plugin managers like Packer or LuaRocks, which are included and configured in the `init.lua` file.

3. **Configuration syntax:** The syntax for configuring options and mappings differs between the two files. In Vim's `.vimrc`, the configuration is typically written using Vimscript, a custom scripting language specific to Vim. In Neovim's `init.lua`, the configuration is written using Lua syntax, which provides a more expressive and powerful language for configuration.

4. **Modularity and organization:** The `init.lua` file allows for more modular and organized configuration compared to the `.vimrc` file. Lua's table-based data structure allows you to group related settings and mappings together, making it easier to navigate and maintain the configuration.

5. **Error handling and debugging:** Neovim's `init.lua` file benefits from Lua's robust error handling and debugging capabilities. Lua provides better error messages and stack traces, making it easier to identify and debug issues in the configuration file compared to Vim's `.vimrc`.

6. **Plugin-specific configurations:** While Vim's `.vimrc` can include specific configurations for each plugin, the `init.lua` file in Neovim provides more flexibility and control over plugin configurations. With Lua's scripting capabilities, you can define custom functions, define mappings, and configure plugins in a more programmatic and dynamic way.

7. **Native Neovim features:** The `init.lua` file allows you to take advantage of Neovim's native features and APIs directly in your configuration. This includes features like floating windows, job control, built-in LSP support, and more. You can interact with these features using Lua code, enhancing the functionality and extensibility of your Neovim setup.

8. **Community support and examples:** While both Vim and Neovim have active communities and extensive plugin ecosystems, the `init.lua` configuration format in Neovim is gaining popularity. As a result, you may find more up-to-date and Lua-based configuration examples, tips, and discussions for Neovim compared to Vim's `.vimrc` file.

It's important to note that while Neovim's `init.lua` file provides additional features and flexibility, Vim's `.vimrc` configuration is still widely supported and used. If you're comfortable with your current Vim setup and it meets your needs, there may not be a pressing need to switch to Neovim and rewrite your configuration. However, if you're interested in exploring the advantages and possibilities of Neovim, migrating your configuration to `init.lua` can be a rewarding experience.


Here is how my current nvim config in `~/.config/nvim/init.lua` looks like:


```lua

-- Packer related config & installed plugins
local status, packer = pcall(require, "packer")
if (not status) then
  print("Packer is not installed")
  return
end

vim.cmd [[packadd packer.nvim]]

packer.startup(function(use)
  use 'wbthomason/packer.nvim'
  use 'nvim-lualine/lualine.nvim' -- Statusline
  use 'nvim-lua/plenary.nvim' -- Common utilities
  use 'onsails/lspkind-nvim' -- vscode-like pictograms
  use 'hrsh7th/cmp-nvim-lsp' -- nvim-cmp source for neovim's built-in LSP
  use 'hrsh7th/nvim-cmp' -- Completion
  use 'neovim/nvim-lspconfig' -- LSP
  use 'jose-elias-alvarez/null-ls.nvim' -- Use Neovim as a language server to inject LSP diagnostics, code actions, and more via Lua
  use 'williamboman/mason.nvim'
  use 'EdenEast/nightfox.nvim'
  use 'williamboman/mason-lspconfig.nvim'
  use 'habamax/vim-rst'
  use 'glepnir/lspsaga.nvim' -- LSP UIs
  use {
    'nvim-treesitter/nvim-treesitter',
    run = ':TSUpdate'
  }
  use 'nvim-treesitter/nvim-treesitter-context'
  use 'kyazdani42/nvim-web-devicons' -- File icons
  use 'nvim-telescope/telescope-file-browser.nvim'
  use 'windwp/nvim-autopairs'
  use 'tpope/vim-fugitive'
  use 'sainnhe/edge'
  use 'sainnhe/gruvbox-material'
  use 'windwp/nvim-ts-autotag'
  use 'folke/zen-mode.nvim'
  use({
    "iamcco/markdown-preview.nvim",
    run = function() vim.fn["mkdp#util#install"]() end,
  })
  use 'akinsho/nvim-bufferline.lua'
  use 'tpope/vim-commentary'
  use 'github/copilot.vim'
  use {
    'nvim-telescope/telescope.nvim',
    tag = '0.1.1',
    requires = { {'nvim-lua/plenary.nvim'} }
  }
  use {
    'nvim-tree/nvim-tree.lua',
    requires = {
      'nvim-tree/nvim-web-devicons', -- optional
    },
    config = function()
      require("nvim-tree").setup {
        sort_by = "case_sensitive",
        view = {
          width = 30,
        },
        renderer = {
          group_empty = true,
        },
        filters = {
          dotfiles = true,
        },
      }
    end
  }

end)

vim.cmd("autocmd!")

vim.scriptencoding = 'utf-8'
vim.opt.encoding = 'utf-8'
vim.opt.fileencoding = 'utf-8'

vim.wo.number = true
vim.opt.title = true
vim.opt.autoindent = true
vim.opt.smarttab = true
vim.opt.smartindent = true
vim.opt.breakindent = true

vim.opt.cmdheight = 1
vim.opt.laststatus = 2
vim.opt.shell = 'zsh'

vim.opt.inccommand = 'split'
vim.opt.hlsearch = true

vim.opt.wrap = false -- No Wrap lines

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.writebackup = false
vim.opt.shiftwidth = 2
vim.opt.expandtab = true  -- expand tabs into spaces
vim.opt.tabstop = 2
vim.opt.softtabstop = 2
vim.opt.backspace = { 'start', 'eol', 'indent' }
vim.opt.path:append { '**' } -- Finding files - Search down into subfolders
vim.opt.wildignore:append { '*/node_modules/*' }

-- Undercurl
vim.cmd([[let &t_Cs = "\e[4:3m"]])
vim.cmd([[let &t_Ce = "\e[4:0m"]])

-- Turn off paste mode when leaving insert
vim.api.nvim_create_autocmd("InsertLeave", {
  pattern = '*',
  command = "set nopaste"
})

vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

-- set termguicolors to enable highlight groups


vim.opt.cursorline = true
vim.opt.termguicolors = true
vim.opt.winblend = 0 -- adds pseudo transparency to a floating window
vim.opt.wildoptions = 'pum'
vim.opt.background = 'dark'
vim.cmd('colorscheme peachpuff')
require("nvim-tree").setup()



vim.g.mapleader = ","
local keymap = vim.keymap

-- split settings
keymap.set('n', '<Leader>h', ':<C-u>split<CR>', { noremap = true, silent = true })
keymap.set('n', '<Leader>v', ':<C-u>vsplit<CR>', { noremap = true, silent = true })

-- tab settings
keymap.set('n', '<Leader>t', ':<C-u>tabnew<CR>', { noremap = true, silent = true })
keymap.set('n', '<C-t>', ':tabNext<CR>', { noremap = true, silent = true })

-- Up and Down Mapping
keymap.set('n', '<CR>', 'G', { noremap = true, silent = true })
keymap.set('n', '<BS>', 'gg', { noremap = true, silent = true })

keymap.set('n', '<C-p>', ':Telescope find_files<CR>', { noremap = true, silent = true })
keymap.set('n', '<C-b>', ':Telescope buffers<CR>', { noremap = true, silent = true })
keymap.set('n', '<C-c>', ':Telescope git_commits<CR>', { noremap = true, silent = true })
keymap.set('n', '<C-e>', ':Telescope diagnostics bufnr=0<CR>', { noremap = true, silent = true })
keymap.set('n', '<C-n>', ':NvimTreeToggle<CR>', { noremap = true, silent = true })

vim.opt.clipboard:append { 'unnamedplus' }

local nvim_lsp = require('lspconfig')

-- Use an on_attach function to only map the following keys
-- after the language server attaches to the current buffer
local on_attach = function(client, bufnr)
  local function buf_set_keymap(...) vim.api.nvim_buf_set_keymap(bufnr, ...) end
  local function buf_set_option(...) vim.api.nvim_buf_set_option(bufnr, ...) end

  --Enable completion triggered by <c-x><c-o>
  buf_set_option('omnifunc', 'v:lua.vim.lsp.omnifunc')

  -- Mappings.
  local opts = { noremap=true, silent=true }

  -- See `:help vim.lsp.*` for documentation on any of the below functions
  buf_set_keymap('n', 'gD', '<Cmd>lua vim.lsp.buf.declaration()<CR>', opts)
  buf_set_keymap('n', 'gd', '<Cmd>lua vim.lsp.buf.definition()<CR>', opts)
  buf_set_keymap('n', 'K', '<Cmd>lua vim.lsp.buf.hover()<CR>', opts)
  buf_set_keymap('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', opts)
  buf_set_keymap('n', '<C-k>', '<cmd>lua vim.lsp.buf.signature_help()<CR>', opts)
  buf_set_keymap('n', '<space>wa', '<cmd>lua vim.lsp.buf.add_workspace_folder()<CR>', opts)
  buf_set_keymap('n', '<space>wr', '<cmd>lua vim.lsp.buf.remove_workspace_folder()<CR>', opts)
  buf_set_keymap('n', '<space>wl', '<cmd>lua print(vim.inspect(vim.lsp.buf.list_workspace_folders()))<CR>', opts)
  buf_set_keymap('n', '<space>D', '<cmd>lua vim.lsp.buf.type_definition()<CR>', opts)
  buf_set_keymap('n', '<Leader>n', '<cmd>lua vim.lsp.buf.rename()<CR>', opts)
  buf_set_keymap('n', '<Leader>ca', '<cmd>lua vim.lsp.buf.code_action()<CR>', opts)
  buf_set_keymap('n', 'gr', '<cmd>lua vim.lsp.buf.references()<CR>', opts)
  buf_set_keymap('n', '<space>e', '<cmd>lua  vim.diagnostic.open_float()<CR>', opts)
  buf_set_keymap('n', '[d', '<cmd>lua vim.lsp.diagnostic.goto_prev()<CR>', opts)
  buf_set_keymap('n', ']d', '<cmd>lua vim.lsp.diagnostic.goto_next()<CR>', opts)
  buf_set_keymap('n', '<space>q', '<cmd>lua vim.lsp.diagnostic.set_loclist()<CR>', opts)
  buf_set_keymap("n", "<space>f", "<cmd>lua vim.lsp.buf.formatting()<CR>", opts)

end


-- Use a loop to conveniently call 'setup' on multiple servers and
-- map buffer local keybindings when the language server attaches
local servers = { "pyright", "tsserver" }
for _, lsp in ipairs(servers) do
  nvim_lsp[lsp].setup {
    on_attach = on_attach,
    flags = {
      debounce_text_changes = 150,
    }
  }
end

require'lspconfig'.pyright.setup{}


local status, null_ls = pcall(require, "null-ls")
if (not status) then return end

null_ls.setup({
  sources = {
    null_ls.builtins.diagnostics.eslint_d.with({
      diagnostics_format = '[eslint] #{m}\n(#{c})'
    }),
    null_ls.builtins.diagnostics.fish
  }
})


function StripTrailingWhitespace()
  if not vim.bo.binary and vim.bo.filetype ~= 'diff' then
    vim.cmd('normal! mz')
    vim.cmd('normal! Hmy')
    if vim.bo.filetype == 'mail' then
      -- Preserve space after e-mail signature separator
      vim.cmd('%s/\\(^--\\)\\@<!\\s\\+$//e')
    else
      vim.cmd('%s/\\s\\+$//e')
    end
    vim.cmd('normal! \'yz<Enter>')
    vim.cmd('normal! `z')
  end
end

vim.cmd('autocmd BufWritePre * lua StripTrailingWhitespace()')
-- Show space and tab characters
vim.o.list = true
vim.o.listchars = 'tab:› ,eol:¬,trail:⋅,nbsp:␣'
```

This config is inspired by the [Single File Nvim Config](https://arslan.io/2023/05/10/the-benefits-of-using-a-single-init-lua-vimrc-file/) post by Fatih Arslan
