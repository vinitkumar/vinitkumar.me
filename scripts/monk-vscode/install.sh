#!/bin/sh

set -eu

fail() {
  printf 'monk-vscode: %s\n' "$1" >&2
  exit 1
}

VARIANT=${MONK_VARIANT:-light}
case "$VARIANT" in
  light)
    default_profile_name=Monk
    default_settings_url=https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/05202fb9db9e6eda315105f6a7cfc25d4e0e9735/settings.json
    default_settings_sha256=4f01f930f388d8544672c40108a5752b136477f97eaf11331a68bae965e05856
    ;;
  dark)
    default_profile_name='Monk Dark'
    default_settings_url=https://gist.githubusercontent.com/vinitkumar/0a6940afafc25b1f905516dfb4b41dbd/raw/settings-dark.json
    default_settings_sha256=cc817e791be1fecaf6616df9303fad89dd887e01f6dd404d2a8f0ae3fac82fbf
    ;;
  *) fail "unknown variant: $VARIANT (expected light or dark)" ;;
esac

PROFILE_NAME=${MONK_PROFILE_NAME:-$default_profile_name}
SETTINGS_URL=${MONK_SETTINGS_URL:-$default_settings_url}
SETTINGS_SHA256=${MONK_SETTINGS_SHA256:-$default_settings_sha256}

for command_name in code curl sqlite3 awk; do
  command -v "$command_name" >/dev/null 2>&1 || fail "missing required command: $command_name"
done

case "$PROFILE_NAME" in
  ''|*[!A-Za-z0-9._\ -]*) fail "profile name may contain only letters, numbers, spaces, dots, underscores, and hyphens" ;;
esac

if [ -n "${MONK_CODE_USER_HOME:-}" ]; then
  code_user_home=$MONK_CODE_USER_HOME
else
  case "$(uname -s)" in
    Darwin) code_user_home="$HOME/Library/Application Support/Code/User" ;;
    Linux) code_user_home="${XDG_CONFIG_HOME:-$HOME/.config}/Code/User" ;;
    *) fail "automatic installation currently supports macOS and Linux" ;;
  esac
fi

profile_window_opened=0
if ! code --profile "$PROFILE_NAME" --list-extensions >/dev/null 2>&1; then
  printf 'Opening VS Code once to create the %s profile...\n' "$PROFILE_NAME"
  code --profile "$PROFILE_NAME" --new-window >/dev/null 2>&1
  profile_window_opened=1

  attempt=0
  while ! code --profile "$PROFILE_NAME" --list-extensions >/dev/null 2>&1; do
    attempt=$((attempt + 1))
    [ "$attempt" -lt 30 ] || fail "VS Code did not create the $PROFILE_NAME profile"
    sleep 1
  done
fi

printf 'Installing VSCodeVim in the %s profile...\n' "$PROFILE_NAME"
code --profile "$PROFILE_NAME" --install-extension vscodevim.vim --force >/dev/null

storage_json="$code_user_home/globalStorage/storage.json"
attempt=0
while [ ! -f "$storage_json" ] && [ "$attempt" -lt 15 ]; do
  sleep 1
  attempt=$((attempt + 1))
done
[ -f "$storage_json" ] || fail "VS Code did not create its profile registry at $storage_json"

profile_id=$(
  awk -v wanted="$PROFILE_NAME" '
    /"userDataProfiles"[[:space:]]*:/ { in_profiles = 1; next }
    in_profiles && /^[[:space:]]*\]/ { exit }
    in_profiles && /"location"[[:space:]]*:/ {
      location = $0
      sub(/^.*"location"[[:space:]]*:[[:space:]]*"/, "", location)
      sub(/".*$/, "", location)
    }
    in_profiles && /"name"[[:space:]]*:/ {
      name = $0
      sub(/^.*"name"[[:space:]]*:[[:space:]]*"/, "", name)
      sub(/".*$/, "", name)
      if (name == wanted) {
        print location
        exit
      }
    }
  ' "$storage_json"
)

case "$profile_id" in
  ''|*[!A-Za-z0-9._-]*) fail "could not safely resolve the $PROFILE_NAME profile directory" ;;
esac

profile_dir="$code_user_home/profiles/$profile_id"
settings_file="$profile_dir/settings.json"
state_dir="$profile_dir/globalStorage"
state_db="$state_dir/state.vscdb"
timestamp=$(date +%Y%m%d%H%M%S)
temporary_settings=$(mktemp "${TMPDIR:-/tmp}/monk-vscode.XXXXXX")
trap 'rm -f "$temporary_settings"' EXIT HUP INT TERM

curl -fsSL "$SETTINGS_URL" -o "$temporary_settings"

if command -v shasum >/dev/null 2>&1; then
  downloaded_sha=$(shasum -a 256 "$temporary_settings" | awk '{ print $1 }')
else
  downloaded_sha=$(sha256sum "$temporary_settings" | awk '{ print $1 }')
fi
[ "$downloaded_sha" = "$SETTINGS_SHA256" ] || fail "settings checksum did not match"

mkdir -p "$profile_dir" "$state_dir"
if [ -f "$settings_file" ]; then
  cp "$settings_file" "$settings_file.backup.$timestamp"
fi
install -m 600 "$temporary_settings" "$settings_file"

if [ -f "$state_db" ]; then
  cp "$state_db" "$state_db.backup.$timestamp"
fi

disabled_extensions='[{"id":"github.copilot-chat"},{"id":"ms-vscode.js-debug"},{"id":"ms-vscode.js-debug-companion"},{"id":"ms-vscode.vscode-js-profile-table"},{"id":"vscode.configuration-editing"},{"id":"vscode.css-language-features"},{"id":"vscode.debug-auto-launch"},{"id":"vscode.debug-server-ready"},{"id":"vscode.emmet"},{"id":"vscode.extension-editing"},{"id":"vscode.git"},{"id":"vscode.git-base"},{"id":"vscode.github"},{"id":"vscode.github-authentication"},{"id":"vscode.grunt"},{"id":"vscode.gulp"},{"id":"vscode.html-language-features"},{"id":"vscode.ipynb"},{"id":"vscode.jake"},{"id":"vscode.json-language-features"},{"id":"vscode.markdown-language-features"},{"id":"vscode.markdown-math"},{"id":"vscode.media-preview"},{"id":"vscode.merge-conflict"},{"id":"vscode.mermaid-markdown-features"},{"id":"vscode.microsoft-authentication"},{"id":"vscode.npm"},{"id":"vscode.php-language-features"},{"id":"vscode.references-view"},{"id":"vscode.search-result"},{"id":"vscode.simple-browser"},{"id":"vscode.terminal-suggest"},{"id":"vscode.theme-abyss"},{"id":"vscode.theme-defaults"},{"id":"vscode.theme-kimbie-dark"},{"id":"vscode.theme-monokai"},{"id":"vscode.theme-monokai-dimmed"},{"id":"vscode.theme-red"},{"id":"vscode.theme-solarized-dark"},{"id":"vscode.theme-solarized-light"},{"id":"vscode.theme-tomorrow-night-blue"},{"id":"vscode.tunnel-forwarding"},{"id":"vscode.typescript-language-features"}]'

if [ "$VARIANT" = dark ]; then
  disabled_extensions=$(printf '%s' "$disabled_extensions" | sed 's/,{"id":"vscode.theme-defaults"}//')
fi

sqlite3 "$state_db" <<SQL
CREATE TABLE IF NOT EXISTS ItemTable (key TEXT UNIQUE ON CONFLICT REPLACE, value BLOB);
INSERT OR REPLACE INTO ItemTable (key, value) VALUES ('extensionsIdentifiers/disabled', '$disabled_extensions');
SQL

printf 'Installed Monk in %s\n' "$profile_dir"
printf 'Backups use the suffix .backup.%s when prior files existed.\n' "$timestamp"

if [ "${MONK_NO_OPEN:-0}" != "1" ] && [ "$profile_window_opened" = "0" ]; then
  code --profile "$PROFILE_NAME" --new-window >/dev/null 2>&1 &
fi
