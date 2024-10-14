---
title: "Fix Slow Shell ZSH"
date: "2024-07-02"
description: "How I found the slowness in my shell and fixed it"
type: "blog"
---

Lately, my shell (zsh) feels slow to use. Even booting it for the first time feels like
it is slow to render. It shouldn't happen as I am using a beefy MacBook Pro. I also don't
don't use any other zsh plugin other than git. So, I decided to investigate what is causing
the slowness.

A quick search on the internet led me to the `zsh` profiling feature. I can profile the shell using this:

Put the following code at the start and end of your `.zshrc` file:

```
zmodload zsh/zprof
# your zshrc file content here.
zprof
```

Save it and source the ~/.zshrc file. Now, you can see the profiling output by running `zprof`.

```

num  calls                time                       self            name
-----------------------------------------------------------------------------------
 1)    1        3886.43  3886.43   93.04%   3348.16  3348.16   80.15%  compinit
 2)  831         381.00     0.46    9.12%    381.00     0.46    9.12%  compdef
 3)    2         169.68    84.84    4.06%     98.30    49.15    2.35%  nvm
 4)    1          86.15    86.15    2.06%     86.15    86.15    2.06%  compdump
 5)    2          71.57    35.78    1.71%     71.57    35.78    1.71%  compaudit
 6)   22          77.67     3.53    1.86%     58.00     2.64    1.39%  _omz_source
 7)    1          62.61    62.61    1.50%     54.07    54.07    1.29%  nvm_ensure_version_installed
 8)    1         209.63   209.63    5.02%     39.95    39.95    0.96%  nvm_auto
 9)    1           8.54     8.54    0.20%      8.54     8.54    0.20%  nvm_is_version_installed
10)    1           8.33     8.33    0.20%      8.02     8.02    0.19%  nvm_die_on_prefix
11)    1           6.24     6.24    0.15%      6.24     6.24    0.15%  regexp-replace
12)    4           3.69     0.92    0.09%      3.69     0.92    0.09%  add-zsh-hook
13)    1           3.62     3.62    0.09%      3.62     3.62    0.09%  colors
14)    6           3.57     0.59    0.09%      3.57     0.59    0.09%  is-at-least
15)    1           2.99     2.99    0.07%      2.99     2.99    0.07%  zrecompile
16)    1           2.12     2.12    0.05%      2.12     2.12    0.05%  test-ls-args
17)    1           0.44     0.44    0.01%      0.44     0.44    0.01%  nvm_has
18)    2           0.31     0.16    0.01%      0.31     0.16    0.01%  is_plugin
19)    4           0.31     0.08    0.01%      0.31     0.08    0.01%  nvm_npmrc_bad_news_bears
20)    1           0.08     0.08    0.00%      0.04     0.04    0.00%  complete
21)    3           0.04     0.01    0.00%      0.04     0.01    0.00%  is_theme
22)    2           0.02     0.01    0.00%      0.02     0.01    0.00%  bashcompinit
23)    2           0.02     0.01    0.00%      0.02     0.01    0.00%  env_default
24)    1         209.65   209.65    5.02%      0.02     0.02    0.00%  nvm_process_parameters
25)    1           0.01     0.01    0.00%      0.01     0.01    0.00%  nvm_is_zsh

-----------------------------------------------------------------------------------

 1)    1        3886.43  3886.43   93.04%   3348.16  3348.16   80.15%  compinit
       1/2        71.57    71.57    1.71%      0.28     0.28             compaudit [5]
       1/1        86.15    86.15    2.06%     86.15    86.15             compdump [4]
     818/831     380.55     0.47    9.11%    380.55     0.47             compdef [2]

-----------------------------------------------------------------------------------

     818/831     380.55     0.47    9.11%    380.55     0.47             compinit [1]
      12/831       0.41     0.03    0.01%      0.41     0.03             _omz_source [6]
       1/831       0.04     0.04    0.00%      0.04     0.04             complete [20]
 2)  831         381.00     0.46    9.12%    381.00     0.46    9.12%  compdef

-----------------------------------------------------------------------------------

24)    1         209.65   209.65    5.02%      0.02     0.02    0.00%  nvm_process_parameters
       1/1       209.63   209.63    5.02%     39.95    39.95             nvm_auto [8]

-----------------------------------------------------------------------------------

       1/1       209.63   209.63    5.02%     39.95    39.95             nvm_process_parameters [24]
 8)    1         209.63   209.63    5.02%     39.95    39.95    0.96%  nvm_auto
       1/2       169.68   169.68    4.06%      4.92     4.92             nvm [3]

-----------------------------------------------------------------------------------

       1/2       169.68   169.68    4.06%      4.92     4.92             nvm_auto [8]
       1/2       164.76   164.76    3.94%     93.38    93.38             nvm [3]
 3)    2         169.68    84.84    4.06%     98.30    49.15    2.35%  nvm
       1/1         0.44     0.44    0.01%      0.44     0.44             nvm_has [17]
       1/1         8.33     8.33    0.20%      8.02     8.02             nvm_die_on_prefix [10]
       1/1        62.61    62.61    1.50%     54.07    54.07             nvm_ensure_version_installed [7]
       1/2       164.76   164.76    3.94%     93.38    93.38             nvm [3]

-----------------------------------------------------------------------------------

       1/1        86.15    86.15    2.06%     86.15    86.15             compinit [1]
 4)    1          86.15    86.15    2.06%     86.15    86.15    2.06%  compdump

-----------------------------------------------------------------------------------

 6)   22          77.67     3.53    1.86%     58.00     2.64    1.39%  _omz_source
       1/2         0.01     0.01    0.00%      0.01     0.01             bashcompinit [22]
       2/2         0.02     0.01    0.00%      0.02     0.01             env_default [23]
      12/831       0.41     0.03    0.01%      0.41     0.03             compdef [2]
       1/1         2.12     2.12    0.05%      2.12     2.12             test-ls-args [16]
       6/6         3.57     0.59    0.09%      3.57     0.59             is-at-least [14]
       1/1         3.62     3.62    0.09%      3.62     3.62             colors [13]
       4/4         3.69     0.92    0.09%      3.69     0.92             add-zsh-hook [12]
       1/1         6.24     6.24    0.15%      6.24     6.24             regexp-replace [11]

-----------------------------------------------------------------------------------

       1/2        71.57    71.57    1.71%      0.28     0.28             compinit [1]
       1/2        71.29    71.29    1.71%     71.29    71.29             compaudit [5]
 5)    2          71.57    35.78    1.71%     71.57    35.78    1.71%  compaudit
       1/2        71.29    71.29    1.71%     71.29    71.29             compaudit [5]

-----------------------------------------------------------------------------------

       1/1        62.61    62.61    1.50%     54.07    54.07             nvm [3]
 7)    1          62.61    62.61    1.50%     54.07    54.07    1.29%  nvm_ensure_version_installed
       1/1         8.54     8.54    0.20%      8.54     8.54             nvm_is_version_installed [9]

-----------------------------------------------------------------------------------

       1/1         8.54     8.54    0.20%      8.54     8.54             nvm_ensure_version_installed [7]
 9)    1           8.54     8.54    0.20%      8.54     8.54    0.20%  nvm_is_version_installed

-----------------------------------------------------------------------------------

       1/1         8.33     8.33    0.20%      8.02     8.02             nvm [3]
10)    1           8.33     8.33    0.20%      8.02     8.02    0.19%  nvm_die_on_prefix
       4/4         0.31     0.08    0.01%      0.31     0.08             nvm_npmrc_bad_news_bears [19]

-----------------------------------------------------------------------------------

       1/1         6.24     6.24    0.15%      6.24     6.24             _omz_source [6]
11)    1           6.24     6.24    0.15%      6.24     6.24    0.15%  regexp-replace

-----------------------------------------------------------------------------------

       4/4         3.69     0.92    0.09%      3.69     0.92             _omz_source [6]
12)    4           3.69     0.92    0.09%      3.69     0.92    0.09%  add-zsh-hook

-----------------------------------------------------------------------------------

       1/1         3.62     3.62    0.09%      3.62     3.62             _omz_source [6]
13)    1           3.62     3.62    0.09%      3.62     3.62    0.09%  colors

-----------------------------------------------------------------------------------

       6/6         3.57     0.59    0.09%      3.57     0.59             _omz_source [6]
14)    6           3.57     0.59    0.09%      3.57     0.59    0.09%  is-at-least

-----------------------------------------------------------------------------------

15)    1           2.99     2.99    0.07%      2.99     2.99    0.07%  zrecompile

-----------------------------------------------------------------------------------

       1/1         2.12     2.12    0.05%      2.12     2.12             _omz_source [6]
16)    1           2.12     2.12    0.05%      2.12     2.12    0.05%  test-ls-args

-----------------------------------------------------------------------------------

       1/1         0.44     0.44    0.01%      0.44     0.44             nvm [3]
17)    1           0.44     0.44    0.01%      0.44     0.44    0.01%  nvm_has

-----------------------------------------------------------------------------------

18)    2           0.31     0.16    0.01%      0.31     0.16    0.01%  is_plugin

-----------------------------------------------------------------------------------

       4/4         0.31     0.08    0.01%      0.31     0.08             nvm_die_on_prefix [10]
19)    4           0.31     0.08    0.01%      0.31     0.08    0.01%  nvm_npmrc_bad_news_bears

-----------------------------------------------------------------------------------

20)    1           0.08     0.08    0.00%      0.04     0.04    0.00%  complete
       1/831       0.04     0.04    0.00%      0.04     0.04             compdef [2]

-----------------------------------------------------------------------------------

21)    3           0.04     0.01    0.00%      0.04     0.01    0.00%  is_theme

-----------------------------------------------------------------------------------

       1/2         0.01     0.01    0.00%      0.01     0.01             _omz_source [6]
22)    2           0.02     0.01    0.00%      0.02     0.01    0.00%  bashcompinit

-----------------------------------------------------------------------------------

       2/2         0.02     0.01    0.00%      0.02     0.01             _omz_source [6]
23)    2           0.02     0.01    0.00%      0.02     0.01    0.00%  env_default

-----------------------------------------------------------------------------------

25)    1           0.01     0.01    0.00%      0.01     0.01    0.00%  nvm_is_zsh
```

If notice the output you would see the nvm showing prominently in it. It means it's the reason for the slowness.

Here is my ~/.zshrc file for reference:

```
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)
alias c='clear'
alias activate='source venv/bin/activate'
alias syncall='gco develop && ggpull && gco staging && ggpull && gco master && ggpull'
alias vim="nvim"
alias vi="nvim"
alias v="nvim"

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='mvim'
fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

eval "$(zoxide init zsh)"
. "$HOME/.cargo/env"
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

```

Now, NVM is an useful tool, but it doesn't need to be enabled all the time for my day to day development. So, I decided to just comment nvm for now and uncomment it as and when needed.

~Fin

Finally, my shell is back to normal speed. I hope this helps you too.
