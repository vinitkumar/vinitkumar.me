#!/usr/bin/env python3
import os
import re
import sys
import concurrent.futures
import requests
from urllib.parse import urlparse, unquote

def is_valid_url(url):
    """Check if URL is valid."""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def check_url(url):
    """Check if a URL is accessible."""
    try:
        # Decode URL-encoded characters
        decoded_url = unquote(url)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.head(decoded_url, allow_redirects=True, timeout=10, headers=headers)
        if response.status_code == 404:
            return False, decoded_url, response.status_code
        elif response.status_code >= 400:
            # Try GET request for URLs that don't support HEAD
            response = requests.get(decoded_url, timeout=10, headers=headers)
            if response.status_code >= 400:
                return False, decoded_url, response.status_code
        return True, decoded_url, response.status_code
    except Exception as e:
        return False, decoded_url, str(e)

def read_file_content(file_path):
    """Try to read file content with different encodings."""
    encodings = ['utf-8', 'latin1', 'cp1252', 'iso-8859-1']
    
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
        except Exception as e:
            print(f"Error reading {file_path}: {str(e)}")
            return ""
    
    print(f"Warning: Could not read {file_path} with any of the attempted encodings")
    return ""

def extract_urls_from_file(file_path):
    """Extract URLs from a markdown file."""
    content = read_file_content(file_path)
    if not content:
        return []
    
    # Match markdown links [text](url) and direct URLs
    markdown_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
    direct_pattern = r'(?<![\(\[])(https?://[^\s\)<>]+)(?![\)\]])'
    
    urls = []
    
    # Extract markdown links
    for match in re.finditer(markdown_pattern, content):
        url = match.group(2)
        if is_valid_url(url):
            urls.append((url, file_path))
    
    # Extract direct URLs
    for match in re.finditer(direct_pattern, content):
        url = match.group(1)
        if is_valid_url(url):
            urls.append((url, file_path))
    
    return urls

def main():
    broken_links = []
    all_urls = []
    
    # Find all markdown files
    for root, _, files in os.walk('.'):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                urls = extract_urls_from_file(file_path)
                all_urls.extend(urls)
    
    print(f"Found {len(all_urls)} URLs to check...")
    
    # Check URLs in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(check_url, url): (url, file_path) 
                        for url, file_path in all_urls}
        
        for future in concurrent.futures.as_completed(future_to_url):
            url, file_path = future_to_url[future]
            is_valid, decoded_url, status = future.result()
            if not is_valid:
                broken_links.append((decoded_url, file_path, status))
    
    # Print results
    if broken_links:
        print("\nBroken links found:")
        for url, file_path, status in broken_links:
            print(f"\nFile: {file_path}")
            print(f"URL: {url}")
            print(f"Status/Error: {status}")
    else:
        print("\nNo broken links found!")

if __name__ == '__main__':
    main() 