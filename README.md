# Serbis - AI-Powered Service Marketplace

**URL**: https://lovable.dev/projects/b67f25eb-adf6-4286-adb1-2910721acf6e

A modern, AI-powered service marketplace connecting clients with verified professionals. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Deployment to GitHub Pages

### Quick Start
1. **Update Repository Name**: 
   - In `vite.config.ts`: Change `REPO_NAME = 'serbis-landing'` to your actual repo name
   - In `src/App.tsx`: Change `'/serbis-landing'` to `'/your-repo-name'`

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

### Local Testing
```bash
# Install dependencies
npm install

# Test development build
npm run dev
# → Should work at http://localhost:8080/

# Test production build (GitHub Pages simulation)
npm run build:gh-pages
npm run preview
# → Should work at http://localhost:4173/your-repo-name/
```

### Troubleshooting
- **Blank page?** Check `GITHUB_PAGES_TROUBLESHOOTING.md` for detailed solutions
- **404 errors?** Verify your repository name matches the configuration
- **Build fails?** Check the GitHub Actions tab for error logs

### Manual Deployment (Alternative)
```bash
npm run deploy
```

Your site will be available at: `https://yourusername.github.io/your-repo-name/`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b67f25eb-adf6-4286-adb1-2910721acf6e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b67f25eb-adf6-4286-adb1-2910721acf6e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
