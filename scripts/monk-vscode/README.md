# Monk VS Code profiles

Deliberately plain VS Code profiles with an 18 px editor font, Vim motions, and almost everything else switched off. `Monk` uses Quiet Light; `Monk Dark` uses Dark Modern.

## Install

Read the script first, then run it:

```sh
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | less
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | sh
```

To install the dark-only variant as a separate `Monk Dark` profile:

```sh
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | MONK_VARIANT=dark sh
```

The installer supports macOS and Linux. It requires `code`, `curl`, and `sqlite3`. It creates or updates only the selected Monk profile, installs VSCodeVim there, copies the matching settings, and disables the built-in IDE and unused color-theme extensions listed in the script. Existing settings and state databases for that profile are backed up before replacement.

On the first run, the installer deliberately opens an empty VS Code window. VS Code creates a missing profile only when it opens a window or folder with that profile; extension-management commands cannot create it. Leave the window open while the installer finishes. Later runs can update the existing profile without this creation step.

Set `MONK_PROFILE_NAME` to use another profile name with either variant:

```sh
curl -fsSL https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/install.sh | MONK_PROFILE_NAME=Quiet sh
```

The font stack falls back to Menlo, Monaco, or monospace when Berka Mono Instrument is unavailable.

Window transparency is not included. It requires patching VS Code's Electron shell through a separate extension, survives outside the profile, and is commonly reset by VS Code updates. Keeping that out of a `curl | sh` installer is intentional.
