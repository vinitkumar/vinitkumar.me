#!/bin/bash

# High-Quality Safari Screenshot Generator
# Usage: ./safari-screenshot.sh [urls_file] [output_directory]
# Example: ./safari-screenshot.sh urls.txt ./screenshots

set -e

# Configuration
DEFAULT_OUTPUT_DIR="/Users/vinitkumar/Pictures/screenshots"
DEFAULT_WAIT_TIME=5
RETINA_SCALE=2
# High quality settings
SCREENSHOT_FORMAT="png"
JPEG_QUALITY=100
PNG_COMPRESSION=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [urls_file] [output_directory] [wait_time]"
    echo ""
    echo "Arguments:"
    echo "  urls_file       File containing URLs (one per line) - defaults to stdin"
    echo "  output_directory Directory to save screenshots - defaults to /Users/vinitkumar/Pictures/screenshots"
    echo "  wait_time       Seconds to wait for page load - defaults to 3"
    echo ""
    echo "Examples:"
    echo "  $0 urls.txt /Users/vinitkumar/Pictures/screenshots 5"
    echo "  echo 'https://example.com' | $0"
    echo "  $0 < urls.txt"
    echo ""
    echo "URL file format (one URL per line):"
    echo "  https://example.com"
    echo "  https://another-site.com/page"
}

# Function to sanitize filename
sanitize_filename() {
    echo "$1" | sed 's/[^a-zA-Z0-9._-]/_/g' | sed 's/__*/_/g' | sed 's/^_*\|_*$//g'
}

# Function to extract domain from URL
extract_domain() {
    echo "$1" | sed -E 's|^https?://([^/]+).*|\1|'
}

# Function to take screenshot using AppleScript and screencapture
take_screenshot() {
    local url="$1"
    local output_file="$2"
    local wait_time="$3"
    
    print_status "Processing: $url"
    
    # AppleScript to control Safari
    osascript <<EOF
tell application "Safari"
    activate
    
    -- Create new window if none exists
    if (count of windows) = 0 then
        make new document
    end if
    
    -- Get the front window
    set frontWindow to front window
    set frontTab to current tab of frontWindow
    
    -- Navigate to URL
    set URL of frontTab to "$url"
    
    -- Wait for page to load
    delay $wait_time
    
    -- Wait for page to finish loading
    repeat while (do JavaScript "document.readyState" in frontTab) is not "complete"
        delay 0.5
    end repeat
    
    -- Additional wait for dynamic content
    delay 1
    
    -- Bring Safari to front
    activate
    delay 0.5
end tell
EOF

    # Capture screenshot with high quality settings
    # -T 0: Capture immediately without delay
    # -x: Do not play sounds
    # -R: Capture specific rectangle (we'll capture the Safari window)
    screencapture -T 0 -x -t png "$output_file"
    
    if [ $? -eq 0 ]; then
        print_success "Screenshot saved: $output_file"
    else
        print_error "Failed to capture screenshot for $url"
        return 1
    fi
}

# Function to get Safari window bounds for precise capture
get_safari_bounds() {
    osascript <<EOF
tell application "Safari"
    set frontWindow to front window
    return bounds of frontWindow
end tell
EOF
}

# Function to set Safari to full screen and maximize quality
setup_safari_for_hq_capture() {
    osascript <<EOF
tell application "Safari"
    activate
    
    if (count of windows) = 0 then
        make new document
    end if
    
    set frontWindow to front window
    
    -- Maximize window
    set bounds of frontWindow to {0, 0, 1920, 1080}
    
    -- Hide all UI elements for cleaner screenshot
    if (do JavaScript "document.documentElement.requestFullscreen" in current tab of frontWindow) then
        delay 0.5
    end if
    
    activate
    delay 0.5
end tell
EOF
}

# Function to take ultra high quality screenshot
take_ultra_hq_screenshot() {
    local url="$1"
    local output_file="$2"
    local wait_time="$3"
    
    print_status "Processing: $url (Ultra HQ Mode)"
    
    # Set up Safari for high quality capture
    setup_safari_for_hq_capture
    
    # Navigate to URL with enhanced settings
    osascript <<EOF
tell application "Safari"
    activate
    
    set frontWindow to front window
    set frontTab to current tab of frontWindow
    set URL of frontTab to "$url"
    
    -- Wait for initial load
    delay $wait_time
    
    -- Wait for complete page load
    repeat while (do JavaScript "document.readyState" in frontTab) is not "complete"
        delay 0.5
    end repeat
    
    -- Wait for additional resources (images, scripts, etc.)
    delay 2
    
    -- Scroll to ensure all content is loaded
    do JavaScript "window.scrollTo(0, document.body.scrollHeight);" in frontTab
    delay 1
    do JavaScript "window.scrollTo(0, 0);" in frontTab
    delay 1
    
    -- Ensure window is active and focused
    activate
    delay 0.5
end tell
EOF

    # Create a temporary high-res screenshot
    local temp_file="${output_file}.tmp.png"
    
    # Use multiple screenshot methods for best quality
    # Method 1: Precise window capture with maximum quality
    bounds=$(get_safari_bounds)
    if [ $? -eq 0 ]; then
        x1=$(echo "$bounds" | cut -d',' -f1 | tr -d ' ')
        y1=$(echo "$bounds" | cut -d',' -f2 | tr -d ' ')
        x2=$(echo "$bounds" | cut -d',' -f3 | tr -d ' ')
        y2=$(echo "$bounds" | cut -d',' -f4 | tr -d ' ')
        
        width=$((x2 - x1))
        height=$((y2 - y1))
        
        # Capture with maximum quality settings
        screencapture -T 0 -x -t png -S -R "$x1,$y1,$width,$height" "$temp_file"
    else
        # Fallback to window capture
        screencapture -T 0 -x -t png -w "$temp_file"
    fi
    
    if [ $? -eq 0 ]; then
        # Post-process for maximum quality
        enhance_image_quality "$temp_file" "$output_file"
        
        # Clean up temp file
        rm -f "$temp_file"
        
        print_success "Ultra HQ Screenshot saved: $output_file"
    else
        print_error "Failed to capture screenshot for $url"
        return 1
    fi
}

# Function to enhance image quality
enhance_image_quality() {
    local input_file="$1"
    local output_file="$2"
    
    if command -v sips >/dev/null 2>&1; then
        print_status "Enhancing image quality..."
        
        # Convert to highest quality with optimal settings
        sips -s format png \
             -s formatOptions normal \
             -s dpiHeight 300 \
             -s dpiWidth 300 \
             "$input_file" \
             --out "$output_file" >/dev/null 2>&1
        
        # If ImageMagick is available, further enhance
        if command -v convert >/dev/null 2>&1; then
            print_status "Applying ImageMagick enhancements..."
            
            # Create a backup
            cp "$output_file" "${output_file}.backup"
            
            # Apply high-quality filters
            convert "$output_file" \
                -quality 100 \
                -density 300 \
                -unsharp 0x0.5+0.5+0.05 \
                -colorspace sRGB \
                "$output_file" 2>/dev/null
            
            # Clean up backup if successful
            if [ $? -eq 0 ]; then
                rm -f "${output_file}.backup"
            else
                # Restore backup if ImageMagick failed
                mv "${output_file}.backup" "$output_file"
            fi
        fi
        
        # Final optimization with sips
        sips -s samplesPerPixel 3 \
             -s bitsPerSample 8 \
             "$output_file" >/dev/null 2>&1
    else
        # Fallback: just copy the file
        cp "$input_file" "$output_file"
    fi
}

# Function to take precise Safari window screenshot (enhanced)
take_precise_screenshot() {
    local url="$1"
    local output_file="$2"
    local wait_time="$3"
    
    # Use ultra HQ method for better quality
    take_ultra_hq_screenshot "$url" "$output_file" "$wait_time"
}

# Main function
main() {
    local urls_file=""
    local output_dir="$DEFAULT_OUTPUT_DIR"
    local wait_time="$DEFAULT_WAIT_TIME"
    
    # Parse arguments
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_usage
        exit 0
    fi
    
    if [ $# -ge 1 ] && [ "$1" != "-" ]; then
        urls_file="$1"
    fi
    
    if [ $# -ge 2 ]; then
        output_dir="$2"
    fi
    
    if [ $# -ge 3 ]; then
        wait_time="$3"
    fi
    
    # Validate wait time
    if ! [[ "$wait_time" =~ ^[0-9]+$ ]]; then
        print_error "Wait time must be a positive integer"
        exit 1
    fi
    
    # Create output directory
    mkdir -p "$output_dir"
    if [ $? -ne 0 ]; then
        print_error "Failed to create output directory: $output_dir"
        exit 1
    fi
    
    print_status "Output directory: $output_dir"
    print_status "Wait time: ${wait_time}s"
    
    # Check if Safari is available
    if ! osascript -e 'tell application "Safari" to activate' >/dev/null 2>&1; then
        print_error "Safari is not available or cannot be controlled"
        exit 1
    fi
    
    # Process URLs
    local url_count=0
    local success_count=0
    
    # Read URLs from file or stdin
    while IFS= read -r url; do
        # Skip empty lines and comments
        if [[ -z "$url" || "$url" =~ ^[[:space:]]*# ]]; then
            continue
        fi
        
        # Trim whitespace
        url=$(echo "$url" | xargs)
        
        # Skip if still empty
        if [[ -z "$url" ]]; then
            continue
        fi
        
        # Validate URL format
        if [[ ! "$url" =~ ^https?:// ]]; then
            print_warning "Skipping invalid URL: $url"
            continue
        fi
        
        url_count=$((url_count + 1))
        
        # Generate filename
        domain=$(extract_domain "$url")
        timestamp=$(date +"%Y%m%d_%H%M%S")
        safe_domain=$(sanitize_filename "$domain")
        filename="${safe_domain}_${timestamp}.png"
        output_file="$output_dir/$filename"
        
        # Take screenshot
        if take_precise_screenshot "$url" "$output_file" "$wait_time"; then
            success_count=$((success_count + 1))
        fi
        
        # Small delay between screenshots
        sleep 1
    done < "${urls_file:-/dev/stdin}"
    
    # Summary
    echo ""
    print_status "Screenshot session completed"
    print_status "Total URLs processed: $url_count"
    print_success "Successful screenshots: $success_count"
    
    if [ $success_count -lt $url_count ]; then
        print_warning "Failed screenshots: $((url_count - success_count))"
    fi
}

# Run main function
main "$@" 