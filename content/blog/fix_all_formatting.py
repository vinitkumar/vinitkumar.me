#!/usr/bin/env python3
import os
import re
from pathlib import Path

def fix_formatting_issues(content):
    """Fix various formatting issues in markdown content"""
    
    # First, ensure proper frontmatter spacing
    lines = content.split('\n')
    
    if len(lines) > 2 and lines[0].strip() == '---':
        # Find the end of frontmatter
        end_idx = -1
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                end_idx = i
                break
        
        if end_idx > 0:
            # Check if content starts immediately after ---
            if end_idx + 1 < len(lines) and lines[end_idx + 1].strip() != '':
                # Insert blank line after frontmatter
                lines.insert(end_idx + 1, '')
    
    # Rejoin content
    content = '\n'.join(lines)
    
    # Fix common spacing issues
    content = re.sub(r'---\s*([A-Z])', r'---\n\n\1', content)  # Ensure newline after frontmatter
    content = re.sub(r'\s+\n', '\n', content)  # Remove trailing spaces
    content = re.sub(r'\n{3,}', '\n\n', content)  # Max 2 consecutive newlines
    
    # Fix URL spacing issues
    content = re.sub(r'HTTPS://([^\s]+)\s+', r'https://\1', content)
    content = re.sub(r'HTTP://([^\s]+)\s+', r'http://\1', content)
    content = re.sub(r'([a-zA-Z0-9])\.\s+([a-zA-Z0-9])', r'\1.\2', content)  # Fix broken URLs
    
    # Fix common word spacing
    content = re.sub(r'([a-z])\s+([a-z])\s+([a-z])', lambda m: f'{m.group(1)}{m.group(2)}{m.group(3)}' if len(m.group(2)) == 1 else m.group(0), content)
    
    # Fix broken sentences that got merged
    content = re.sub(r'([a-z])([A-Z][a-z])', r'\1. \2', content)
    content = re.sub(r'([.!?])([A-Z])', r'\1 \2', content)
    
    return content

def restore_from_original(post_name):
    """Restore content from original markdown file if it exists"""
    original_files = list(Path('.').glob(f'*{post_name.replace("-", "-")}*.md'))
    
    for original_file in original_files:
        if post_name.replace('-', '') in original_file.name.replace('-', '').lower():
            print(f"    Found original file: {original_file.name}")
            with open(original_file, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Extract date from filename
            date_match = re.match(r'(\d{4}-\d{2}-\d{2})', original_file.name)
            if date_match:
                date = date_match.group(1)
                
                # Add date to frontmatter if not present
                if original_content.startswith('---'):
                    lines = original_content.split('\n')
                    end_idx = -1
                    for i in range(1, len(lines)):
                        if lines[i].strip() == '---':
                            end_idx = i
                            break
                    
                    if end_idx > 0:
                        has_date = any(line.strip().startswith('date:') for line in lines[1:end_idx])
                        if not has_date:
                            lines.insert(1, f'date: {date}')
                            original_content = '\n'.join(lines)
            
            return original_content
    
    return None

def process_all_posts():
    """Process all posts and fix formatting issues"""
    current_dir = Path('.')
    
    # Get all post directories
    post_dirs = [d for d in current_dir.iterdir() if d.is_dir() and not d.name.startswith('.')]
    
    for post_dir in sorted(post_dirs):
        index_file = post_dir / 'index.md'
        if index_file.exists():
            print(f"Processing {post_dir.name}/index.md...")
            
            # Read current content
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if content looks malformed (all on one line after frontmatter)
            lines = content.split('\n')
            if len(lines) < 15:  # Suspiciously few lines
                print(f"  Content appears malformed, attempting to restore from original...")
                restored_content = restore_from_original(post_dir.name)
                if restored_content:
                    content = restored_content
                    print(f"  ✓ Restored from original file")
            
            # Apply formatting fixes
            fixed_content = fix_formatting_issues(content)
            
            # Write back
            with open(index_file, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            print(f"  ✓ Fixed formatting in {post_dir.name}")

if __name__ == "__main__":
    process_all_posts()
    print("\nAll posts processed!") 