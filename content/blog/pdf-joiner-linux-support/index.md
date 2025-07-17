---
title: "PDF Joiner Now Supports Linux: Quick Setup Guide"
date: "2025-07-07"
featured: true
description: "PDF Joiner expands to Linux with automatic tool detection and installation. Simple setup guide for all major Linux distributions with the same intuitive interface as the macOS version."
---

PDF Joiner now supports Linux with automatic tool detection and installation. The tool works on all major Linux distributions and provides the same simple interface as the macOS version.

If you haven't read about PDF Joiner before, check out my [original post about the Mac version](/pdf-joiner/) where I explain the motivation behind creating this free command-line utility.

## Quick Setup

### 1. Check Your CPU Architecture

First, determine your system architecture:

```bash
uname -m
```

- If output is `x86_64` → use **amd64** binary
- If output is `aarch64` or `arm64` → use **arm64** binary

### 2. Download the Correct Binary

**For 64-bit Intel/AMD systems (x86_64):**
```bash
curl -L https://github.com/vinitkumar/pdf-joiner/releases/download/v1.2.9/pdf-joiner-linux-amd64 -o pdf-joiner
```

**For ARM64 systems (aarch64):**
```bash
curl -L https://github.com/vinitkumar/pdf-joiner/releases/download/v1.2.9/pdf-joiner-linux-arm64 -o pdf-joiner
```

### 3. Make It Executable

```bash
chmod +x pdf-joiner
```

### 4. Run It

```bash
./pdf-joiner file1.pdf file2.pdf file3.pdf
```

## First Run Setup

On first run, the tool automatically:
1. Detects your Linux distribution
2. Installs required PDF tools if missing
3. Asks for sudo permission to install dependencies

Example first run:
```bash
$ ./pdf-joiner file1.pdf file2.pdf
No PDF joining tools found. Attempting to install them...
Detected Linux distribution: ubuntu
Installing PDF tools for Ubuntu/Debian...
[sudo] password for user:
PDF tools installed successfully!
Successfully joined PDFs into: combined_20250625_143812.pdf
```

## Supported Linux Distributions

| Distribution | Package Manager | Auto-Install |
|--------------|----------------|--------------|
| Ubuntu/Debian | apt-get | ✅ |
| Fedora | dnf | ✅ |
| RHEL/CentOS | yum | ✅ |
| Arch Linux | pacman | ✅ |

## Usage Examples

**Basic joining:**
```bash
./pdf-joiner file1.pdf file2.pdf file3.pdf
```

**Custom output filename:**
```bash
./pdf-joiner -o combined_document.pdf file1.pdf file2.pdf file3.pdf
```

**Move to system PATH (optional):**
```bash
sudo mv pdf-joiner /usr/local/bin/
# Now you can run it from anywhere
pdf-joiner file1.pdf file2.pdf
```

## PDF Tools Used

The tool automatically selects the best available PDF backend:
1. **pdfunite** (fastest, preferred)
2. **ghostscript** (most compatible)
3. **qpdf** (alternative option)

## Troubleshooting

**Permission denied error:**
```bash
chmod +x pdf-joiner
```

**Tool not found after installation:**
```bash
# Reinstall PDF tools manually
sudo apt-get update && sudo apt-get install poppler-utils ghostscript  # Ubuntu/Debian
sudo dnf install poppler-utils ghostscript                              # Fedora
sudo yum install poppler-utils ghostscript                              # RHEL/CentOS
sudo pacman -S poppler ghostscript                                       # Arch Linux
```

## Build from Source (Optional)

```bash
git clone https://github.com/vinitkumar/pdf-joiner.git
cd pdf-joiner
go build -o pdf-joiner
./pdf-joiner file1.pdf file2.pdf
```

---

**GitHub Repository**: [vinitkumar/pdf-joiner](https://github.com/vinitkumar/pdf-joiner)
**Latest Release**: [v1.2.9](https://github.com/vinitkumar/pdf-joiner/releases/tag/v1.2.9)

The Linux support extends PDF Joiner's reach beyond macOS, making it accessible to developers across all major platforms while maintaining the same privacy-focused, local processing approach that makes it a reliable alternative to online PDF tools.
