#!/bin/bash
# GitHub Pages Debug Script
# Run this script to test your GitHub Pages configuration

echo "🔍 GitHub Pages Debug Script"
echo "============================"
echo ""

# Get current directory name (likely your repo name)
REPO_NAME=$(basename "$PWD")
echo "📁 Current directory: $REPO_NAME"
echo "💡 If this doesn't match your GitHub repository name, update vite.config.ts and App.tsx"
echo ""

# Check if we're in a git repository
if [ -d ".git" ]; then
    # Try to get the remote repository name
    REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "No remote found")
    if [[ $REMOTE_URL == *"github.com"* ]]; then
        # Extract repo name from GitHub URL
        GITHUB_REPO=$(echo $REMOTE_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/\([^/.]*\).*/\2/p')
        echo "🐙 GitHub repository name: $GITHUB_REPO"
        if [ "$REPO_NAME" != "$GITHUB_REPO" ]; then
            echo "⚠️  WARNING: Directory name ($REPO_NAME) doesn't match GitHub repo name ($GITHUB_REPO)"
            echo "   Update REPO_NAME in vite.config.ts to: $GITHUB_REPO"
            echo "   Update basename in App.tsx to: /$GITHUB_REPO"
        else
            echo "✅ Directory name matches GitHub repo name"
        fi
    else
        echo "🤷 Could not determine GitHub repository name from remote URL: $REMOTE_URL"
    fi
else
    echo "⚠️  Not in a git repository. Make sure to initialize git and add your GitHub remote."
fi

echo ""
echo "🛠️  Quick Fixes:"
echo "1. Make sure your GitHub repo name matches the REPO_NAME in vite.config.ts"
echo "2. Enable GitHub Pages in your repository settings"
echo "3. Set GitHub Pages source to 'GitHub Actions'"
echo "4. Check browser console for JavaScript errors"
echo ""

# Check if built files exist
if [ -d "dist" ]; then
    echo "✅ Build directory exists"
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html exists in build"
    else
        echo "❌ index.html missing from build"
    fi
    
    if [ -f "dist/404.html" ]; then
        echo "✅ 404.html exists for SPA routing"
    else
        echo "❌ 404.html missing (needed for SPA routing)"
    fi
else
    echo "❌ Build directory missing. Run: npm run build:gh-pages"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm run build:gh-pages' to build for production"
echo "2. Run 'npm run preview' to test locally at http://localhost:4173/$REPO_NAME/"
echo "3. Push to GitHub and check GitHub Actions for deployment status"
echo "4. Your site should be at: https://yourusername.github.io/$REPO_NAME/"
