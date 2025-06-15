# 🚀 GitHub Pages Deployment Troubleshooting Guide

## Quick Fix Checklist

### 1. **Repository Name Configuration**
The most common issue is incorrect repository name configuration. Update these files:

**In `vite.config.ts`:**
```typescript
const REPO_NAME = 'your-actual-repo-name'; // Change this!
```

**In `src/App.tsx`:**
```typescript
const basename = import.meta.env.PROD ? '/your-actual-repo-name' : ''; // Change this!
```

### 2. **GitHub Pages Settings**
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section  
3. Set Source to **"GitHub Actions"** (not "Deploy from a branch")
4. Save the settings

### 3. **Build and Deploy**
```bash
# Test locally first
npm install
npm run build:gh-pages
npm run preview

# If local preview works, push to GitHub
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

## Common Issues and Solutions

### Issue: Blank White Page

**Symptoms:** Page loads but shows nothing
**Causes:**
- Wrong repository name in config
- JavaScript errors preventing React from mounting
- Missing or incorrect base path

**Solutions:**
1. Open browser console (F12) and check for errors
2. Verify repository name matches config
3. Check that your GitHub Pages URL is: `https://username.github.io/repo-name/`

### Issue: 404 Not Found

**Symptoms:** GitHub shows 404 page
**Causes:**
- GitHub Pages not enabled
- Wrong source setting
- Build files not deployed

**Solutions:**
1. Check GitHub Actions tab for build/deploy status
2. Verify GitHub Pages is enabled in repository settings
3. Ensure you're using the correct URL format

### Issue: Resources Not Loading

**Symptoms:** Page loads but CSS/JS files return 404
**Causes:**
- Incorrect base path configuration
- Missing assets in build

**Solutions:**
1. Check that `base` in `vite.config.ts` matches your repo name
2. Verify all assets are included in the `dist` folder after build

## Testing Your Configuration

### 1. Test Locally
```bash
# Development mode (should work at http://localhost:8080/)
npm run dev

# Production mode (should work at http://localhost:4173/repo-name/)
npm run build:gh-pages
npm run preview
```

### 2. Check Built Files
After running `npm run build:gh-pages`, verify these files exist:
- `dist/index.html`
- `dist/404.html`
- `dist/.nojekyll`
- `dist/assets/` (folder with CSS/JS files)

### 3. Debug with Test Page
Visit `https://username.github.io/repo-name/test` to see debug information.

## GitHub Actions Troubleshooting

### Check Build Status
1. Go to your repository on GitHub
2. Click the "Actions" tab
3. Look for failed builds (red X) or successful ones (green checkmark)
4. Click on a workflow run to see detailed logs

### Common GitHub Actions Issues
- **Node.js version mismatch:** Update the workflow to use a compatible Node version
- **Missing dependencies:** Ensure `package.json` includes all required dependencies
- **Build fails:** Check the build logs for specific error messages

## Manual Deployment (Alternative)

If GitHub Actions isn't working, you can deploy manually:

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Build and deploy
npm run build:gh-pages
npm run deploy
```

## Verification Steps

1. **Local Test:** `npm run preview` should show your site at `localhost:4173/repo-name/`
2. **GitHub Actions:** Should show successful deployment in Actions tab
3. **Live Site:** `https://username.github.io/repo-name/` should load your site
4. **Console Check:** Browser console should show no errors

## Need More Help?

1. Run the debug script: `./debug-gh-pages.sh`
2. Check browser console for JavaScript errors
3. Visit the test page: `/test` route for debug information
4. Compare your configuration with the working local preview

## Repository Name Examples

If your GitHub repository URL is:
- `https://github.com/john/my-awesome-site` → Repository name is `my-awesome-site`
- `https://github.com/sarah/portfolio` → Repository name is `portfolio`
- `https://github.com/company/landing-page` → Repository name is `landing-page`

Update both `vite.config.ts` and `App.tsx` with your actual repository name!
