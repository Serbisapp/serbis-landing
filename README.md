# Serbis Landing (Standalone)

This folder is an isolated landing-page app, separate from the main Serbis platform code.

## Run locally

```bash
cd landing-page
npm install
npm run dev
```

## Build

```bash
cd landing-page
npm run build
```

## Deploy to GitHub Pages

When deploying to GitHub Pages, set the base path to your repository name:

```bash
cd landing-page
VITE_BASE_PATH=/<YOUR_REPO_NAME>/ npm run build
```

Then publish the generated `landing-page/dist` folder to GitHub Pages.

If your repo is `serbis-landing`, use:

```bash
VITE_BASE_PATH=/serbis-landing/ npm run build
```
