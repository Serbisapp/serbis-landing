# 🌟 Custom Domain Setup Guide for serbis.app

## What I've Fixed

### ✅ 1. Custom Domain Configuration
- Updated `vite.config.ts` to use root path `/` instead of `/serbis-landing/`
- Updated `src/App.tsx` to remove the basename for custom domain
- Set `public/CNAME` to `serbis.app`
- Updated `404.html` to handle custom domain routing and exclude assets

### ✅ 2. Image Loading Fix
- Modified `404.html` to not redirect image/asset requests
- Images should now load properly from `/lovable-uploads/` directory

## Next Steps

### 1. Deploy the Changes
```bash
git add .
git commit -m "Configure for custom domain serbis.app"
git push origin main
```

### 2. Configure DNS (CRITICAL)
You need to set up DNS records for `serbis.app`:

**A Records** (point to GitHub Pages IPs):
```
185.199.108.153
185.199.109.153
185.199.110.153  
185.199.111.153
```

**OR CNAME Record** (if using www subdomain):
```
CNAME: www.serbis.app → Serbisapp.github.io
```

### 3. Update GitHub Pages Settings
1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `serbis.app`
3. Check "Enforce HTTPS" (after DNS propagates)
4. Save

### 4. Handle the Old Version at Root
To remove the old version from `serbis.app/` (root), you have a few options:

**Option A: Different Repository**
If the old version is from a different repository:
1. Go to that repository's Settings → Pages
2. Remove the custom domain or disable Pages
3. Or change its custom domain to something else

**Option B: Same Repository**
If it's from the same repository but different branch:
1. Go to Settings → Pages
2. Make sure Source is set to "GitHub Actions" (not a branch)

## Expected Results

After deployment and DNS propagation:
- ✅ `serbis.app` → Your new landing page (this repository)
- ✅ Images and assets will load properly
- ✅ No more `/serbis-landing/` in the URL
- ✅ Proper SPA routing for React Router

## Troubleshooting

### If Images Still Don't Load
1. Check browser console for 404 errors
2. Verify images exist in `public/lovable-uploads/`
3. Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

### If Custom Domain Doesn't Work
1. Check DNS propagation: `dig serbis.app` or use online DNS checker
2. Wait 24-48 hours for full DNS propagation
3. Verify CNAME file contains only `serbis.app`

### If Old Version Still Shows
1. Clear browser cache
2. Check which repository/branch is set as Pages source
3. Make sure only one repository has `serbis.app` as custom domain

## DNS Configuration Example

If you're using a DNS provider like Cloudflare, Namecheap, etc.:

```
Type: A
Name: @
Content: 185.199.108.153
TTL: Auto

Type: A  
Name: @
Content: 185.199.109.153
TTL: Auto

Type: A
Name: @
Content: 185.199.110.153
TTL: Auto

Type: A
Name: @
Content: 185.199.111.153
TTL: Auto
```

## Final Check
Once everything is deployed and DNS is configured:
- Visit `https://serbis.app` 
- Images should load
- No `/serbis-landing/` in URL
- Old version should be gone
