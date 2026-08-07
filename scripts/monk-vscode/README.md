# Monk VS Code profile

A deliberately plain VS Code profile: Quiet Light, an 18 px editor font, Vim motions, a white status bar, and almost everything else switched off.

## Install

Read the script first, then run it:

```sh
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | less
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | sh
```

The installer supports macOS and Linux. It requires `code`, `curl`, and `sqlite3`. It creates or updates only a profile named `Monk`, installs VSCodeVim in that profile, copies the complete `settings.json`, and disables the built-in IDE and color-theme extensions listed in the script. Existing Monk settings and state databases are backed up before replacement.

Set `MONK_PROFILE_NAME` to use another profile name:

```sh
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | MONK_PROFILE_NAME=Quiet sh
```

The font stack falls back to Menlo, Monaco, or monospace when Berka Mono Instrument is unavailable.

Window transparency is not included. It requires patching VS Code's Electron shell through a separate extension, survives outside the profile, and is commonly reset by VS Code updates. Keeping that out of a `curl | sh` installer is intentional.
