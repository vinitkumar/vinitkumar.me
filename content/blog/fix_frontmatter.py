#!/usr/bin/env python3
import os
import re
from pathlib import Path

def fix_frontmatter_spacing(content):
    """Fix missing newline after frontmatter closing ---"""
    lines = content.split('\n')
    
    if len(lines) > 2 and lines[0].strip() == '---':
        # Find the end of frontmatter
        end_idx = -1
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                end_idx = i
                break
        
        if end_idx > 0 and end_idx + 1 < len(lines):
            # Check if the line immediately after --- is not empty
            if lines[end_idx + 1].strip() != '':
                # Insert a blank line after the closing ---
                lines.insert(end_idx + 1, '')
                return '\n'.join(lines)
    
    return content

def process_all_index_files():
    """Process all index.md files in all folders"""
    current_dir = Path('.')
    
    # Get all directories (excluding hidden ones)
    post_dirs = [d for d in current_dir.iterdir() if d.is_dir() and not d.name.startswith('.')]
    
    for post_dir in sorted(post_dirs):
        index_file = post_dir / 'index.md'
        if index_file.exists():
            print(f"Processing {post_dir.name}/index.md...")
            
            # Read the file
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix frontmatter spacing
            fixed_content = fix_frontmatter_spacing(content)
            
            # Write back if changed
            if fixed_content != content:
                with open(index_file, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                print(f"  ✓ Fixed frontmatter spacing in {post_dir.name}")
            else:
                print(f"  - Already correct in {post_dir.name}")

if __name__ == "__main__":
    process_all_index_files()
    print("\nAll index.md files processed!") 