# GitHub Setup & Installation Guide

This guide explains how to push your code to GitHub and how users can install from both npm and GitHub.

---

## 🚀 Part 1: Push Your Code to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in the details:
   - **Repository name**: `superhaptic` (or any name you prefer)
   - **Description**: "Haptic feedback library for the web"
   - **Visibility**: Public (so users can install from it)
   - **DON'T** initialize with README (you already have files)
4. Click **"Create repository"**

### Step 2: Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

### Step 3: Create .gitignore File

Before pushing, let's create a `.gitignore` to exclude unnecessary files:

```bash
# I'll create this for you automatically
```

The `.gitignore` should contain:
```
node_modules/
dist/
*.log
.DS_Store
.env
.vscode/
.idea/
*.tgz
```

### Step 4: Add Your GitHub Remote

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/superhaptic.git
```

Verify it was added:
```bash
git remote -v
```

### Step 5: Build, Commit, and Push

```bash
# Build the package first
npm run build

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: @superhaptic/core - Haptic feedback library for the web"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📦 Part 2: How Users Can Install Your Package

Once your code is on GitHub, users have **THREE** ways to install:

### Option 1: From npm (After Publishing)

After you publish to npm with `npm publish --access public`:

```bash
npm install @superhaptic/core
```

### Option 2: Directly from GitHub

Users can install directly from your GitHub repo **WITHOUT** publishing to npm:

```bash
# Install from GitHub main branch
npm install github:YOUR_USERNAME/superhaptic

# Or with specific syntax
npm install YOUR_USERNAME/superhaptic

# Install from a specific branch
npm install github:YOUR_USERNAME/superhaptic#develop

# Install from a specific commit
npm install github:YOUR_USERNAME/superhaptic#abc1234

# Install from a specific tag/release
npm install github:YOUR_USERNAME/superhaptic#v0.1.0
```

### Option 3: From a GitHub Release (Recommended for Production)

1. Create a release on GitHub
2. Users install a specific version:

```bash
npm install github:YOUR_USERNAME/superhaptic#v0.1.0
```

---

## ⚙️ Important: Preparing for GitHub Installation

When users install from GitHub, npm runs these steps:

1. Downloads your repository
2. Runs `npm install` (installs dependencies)
3. Runs the **`prepare`** script (if defined)

### Add a Prepare Script

Update your `package.json` to build automatically:

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "prepare": "npm run build"
  }
}
```

The `prepare` script runs automatically when someone installs from GitHub!

---

## 🔄 Workflow: GitHub vs npm

### Recommended Workflow:

```
1. Development
   ↓
2. Push to GitHub (version control)
   ↓
3. Build & Test
   ↓
4. Publish to npm (for production use)
   ↓
5. Users install from npm OR GitHub
```

### When Users Should Use Each:

| Install Method | Use Case |
|---------------|----------|
| **npm** | Production use, stable releases |
| **GitHub** | Testing latest changes, contributing, or when package isn't on npm yet |

---

## 📝 Update package.json Repository Info

Update your `package.json` with your actual GitHub info:

```json
{
  "name": "@superhaptic/core",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/superhaptic.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/superhaptic/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/superhaptic#readme"
}
```

**Remember to replace `YOUR_USERNAME`!**

---

## 🎯 Quick Start Commands

### First Time Setup:

```bash
# 1. Create .gitignore (see content above)
# 2. Initialize git
git init

# 3. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/superhaptic.git

# 4. Build
npm run build

# 5. Commit and push
git add .
git commit -m "Initial commit: @superhaptic/core"
git branch -M main
git push -u origin main
```

### For Future Updates:

```bash
# 1. Make changes
# 2. Build
npm run build

# 3. Commit
git add .
git commit -m "Update: describe your changes"

# 4. Push to GitHub
git push

# 5. (Optional) Publish to npm
npm version patch  # or minor/major
npm publish --access public
```

---

## 🏷️ Creating GitHub Releases

To let users install specific versions from GitHub:

### Via GitHub Website:

1. Go to your repo → **"Releases"** → **"Create a new release"**
2. Click **"Choose a tag"** → Type `v0.1.0` → **"Create new tag"**
3. **Release title**: `v0.1.0 - Initial Release`
4. **Description**: Describe the features
5. Click **"Publish release"**

### Via Command Line:

```bash
# Create and push a tag
git tag v0.1.0
git push origin v0.1.0

# Then create release on GitHub UI
```

Now users can install with:
```bash
npm install github:YOUR_USERNAME/superhaptic#v0.1.0
```

---

## 💡 Pro Tips

### 1. Add a GitHub Actions Workflow

Automatically build and test on every push:

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test
```

### 2. Add Badges to README

```markdown
[![npm version](https://badge.fury.io/js/@superhaptic%2Fcore.svg)](https://www.npmjs.com/package/@superhaptic/core)
[![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/superhaptic)](https://github.com/YOUR_USERNAME/superhaptic)
```

### 3. Keep GitHub and npm in Sync

Always:
1. Push to GitHub first
2. Test everything
3. Create a GitHub release
4. Then publish to npm with the same version

---

## 🔧 Troubleshooting

### "Permission denied" when pushing to GitHub

```bash
# Use HTTPS with personal access token
# Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### Users can't install from GitHub

Make sure:
- ✅ Repository is public
- ✅ `prepare` script is in package.json
- ✅ `dist/` folder is NOT in .gitignore (it needs to be built)

### Build fails when installing from GitHub

The `prepare` script runs automatically. Make sure:
- All `devDependencies` needed for building are installed
- The build script works: `npm run build`

---

## 📚 Summary

### Your Setup Steps:
1. ✅ Create GitHub repository
2. ✅ Add `.gitignore`
3. ✅ Update `package.json` with GitHub URLs
4. ✅ Add `prepare` script to `package.json`
5. ✅ Push code to GitHub
6. ✅ Optionally publish to npm

### User Installation:
```bash
# From npm (after you publish)
npm install @superhaptic/core

# From GitHub (works immediately after you push)
npm install github:YOUR_USERNAME/superhaptic

# From GitHub release (recommended)
npm install github:YOUR_USERNAME/superhaptic#v0.1.0
```

**Both methods work!** GitHub is great for development/testing, npm is better for production use.
