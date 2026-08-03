---
title: "Automatically Organizing My Markdown Notes By Date"
date: "2026-08-04"
description: "A small cron job that keeps my Markdown notes organized."
---

I love writing in Markdown because it is simple. I don't need to open a particular application, choose a template, or think about formatting. I can create a file in my home directory and start writing immediately.

The problem comes later. After a few days, the home directory fills up with random Markdown files. The writing is easy, but tracking when I wrote something becomes unnecessarily difficult.

I wanted to keep the easy part while automatically organizing every file inside `notes/YYYY-MM-DD`, based on its creation date.

This is the script I use:

```zsh
#!/bin/zsh
set -eu
setopt NULL_GLOB

source="$HOME"
notes="$HOME/notes"

for file in "$source"/*(DN.); do
  extension="${file:e:l}"
  [[ "$extension" == md || "$extension" == markdown ]] || continue

  day=$(stat -f '%SB' -t '%Y-%m-%d' "$file")
  directory="$notes/$day"
  mkdir -p "$directory"

  name="${file:t}"
  destination="$directory/$name"
  sequence=2

  while [[ -e "$destination" ]]; do
    destination="$directory/${name:r}-$sequence.${name:e}"
    (( sequence += 1 ))
  done

  mv "$file" "$destination"
done
```

I saved it as `~/bin/organize-home-markdown` and added this cron entry:

```cron
*/10 * * * * /Users/vinitkumar/bin/organize-home-markdown
```

Now I can write a Markdown file directly in my home directory and forget about organization. Within ten minutes, it moves into the correct date folder. Simple input, predictable storage, and one less tiny decision to make every day.
