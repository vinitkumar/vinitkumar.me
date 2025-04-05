---
title: Simple PDF joiner to Join PDF Files on Mac
date: "2025-02-27"
featured: true
description: "A free command-line utility that leverages macOS's built-in PDF joining capabilities without privacy concerns or upselling. Installation and usage instructions provided for combining multiple PDF files simply and efficiently."
---

I have been quite busy in the last week or so and haven't had much time to write blog posts. However, today I want to share a simple utility I created to solve an annoying problem - joining PDF files on Mac.

## The Problem

Recently, I needed to combine multiple PDF files into a single document. Like many people, I started searching online for PDF joining tools. What I found was frustrating - most tools were either:

1. Web-based applications requiring file upload (privacy concerns)
2. Free tools with aggressive upselling tactics
3. Expensive commercial software with way more features than needed

Then I discovered something interesting - macOS actually has a built-in PDF joining utility! It's located at:


`/System/Library/Automator/Combine PDF Pages.action/Contents/MacOS/join`. What my utility does is that it adds a nice interface on top of it and you can just it like this:


## Source Code

You can browse the source code here: https://github.com/vinitkumar/pdf-joiner

## Installation

You can install it directly from Github Release be following the above steps. This assumes you have wget installed
on your local machine, if not please run `brew install wget`

```
cd /tmp
wget https://github.com/vinitkumar/pdf-joiner/releases/download/1.0.0/pdf-joiner
sudo chmod u+x pdf-joiner
sudo mv pdf-joiner /usr/local/bin
```

This should ensure that it is downloaded and is in path, so that you can run the commands below.

Join two PDF files:
```
pdf-joiner file1.pdf file2.pdf
```

Join multiple PDF files with a specific output path:
```
pdf-joiner -o merged.pdf file1.pdf file2.pdf file3.pdf
```

Join all PDF files in a directory:
```
pdf-joiner -o merged.pdf /path/to/directory/*.pdf
`-o`: Specify the output file path. If not provided, the output will be saved as `joined-pdf-YYYY-MM-DD-HHMMSS.pdf` in the current directory.
```


The latest binary can be downloaded from [here](https://github.com/vinitkumar/pdf-joiner/releases/download/1.0.0/pdf-joiner) and installed in `/usr/local/bin` and can be used as the examples above show the usage.

Hope this tool also helps you join as many PDF files you want without any issues and for free.


