---
title: "How Not To Install LazyGit on Ubuntu"
date: "2025-07-29"
description: "Experience installing Lazygit on Ubuntu"
tags: ["git", "version-control", "productivity"]
---

I am working on an Ubuntu Linux VM at work. So while setting up the project repository, I naturally wanted to install
`lazygit` which is a wonderful TUI for git.

When I got to install it. The normal recommendation was to install using snap with this command:

`sudo snap install lazygit` which installed it successfully, but was for some reason sandboxed. which means I got errors
like this:


```log

vinit in 🌐 vinit in demo on  feat/implement-feat [$?] via 🐹 v1.24.5
❯ sudo chown -R vinit:vinit /home/vinit/demo/.git

vinit in 🌐 vinit in demo on  feat/implement-feat [$?] via 🐹 v1.24.5
❯ lazygit
2025/07/29 06:13:16 An error occurred! Please create an issue at: https://github.com/jesseduffield/lazygit/issues


*fs.PathError open /home/vinit/demo/.git/packed-refs: permission denied
/build/lazygit/parts/lazygit/build/main.go:145 (0x969f74)
/snap/go/9416/src/runtime/proc.go:250 (0x437178)
/snap/go/9416/src/runtime/asm_arm64.s:1259 (0x464d44)
```

Which is not what you expect to see.

An easy solution was to remove the snap version and install it from `go` itself.

This is how I fixed it

```log
sudo snap remove lazygit
go install github.com/jesseduffield/lazygit@latest
# Make sure Go binaries are in PATH
export PATH="$PATH:$(go env GOPATH)/bin"
```

And then it just worked!
