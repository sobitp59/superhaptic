# Publishing @superhaptic/core to NPM

This guide will walk you through publishing your package to npm.

## Prerequisites

1. **Node.js and npm installed** (you already have this)
2. **An npm account** - Create one at [npmjs.com](https://www.npmjs.com/signup)
3. **Git repository** (optional but recommended)

## Step 1: Create an npm Account

If you don't have an npm account yet:

```bash
# Visit https://www.npmjs.com/signup
# Or create via CLI
npm adduser
```

## Step 2: Login to npm

Login to your npm account from your terminal:

```bash
npm login
```

You'll be prompted for:
- **Username**
- **Password**
- **Email** (public)
- **OTP** (if you have 2FA enabled)

Verify you're logged in:

```bash
npm whoami
```

## Step 3: Update Package Information

Before publishing, update these fields in `package.json`:

```json
{
  "name": "@superhaptic/core",
  "version": "0.1.0",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/superhaptic"
  },
  "bugs": {
    "url": "https://github.com/yourusername/superhaptic/issues"
  },
  "homepage": "https://github.com/yourusername/superhaptic#readme"
}
```

**Important:** Replace `yourusername` with your actual GitHub username!

## Step 4: Build Your Package

Before publishing, make sure to build the package:

```bash
npm run build
```

This will:
- Run ESLint checks
- Run TypeScript type checking
- Build the dist files (CJS, ESM, and type definitions)

## Step 5: Test the Package Locally (Optional but Recommended)

Test your package locally before publishing:

```bash
# In your superhaptic directory
npm pack
```

This creates a `.tgz` file. You can install it in a test project:

```bash
# In a test project directory
npm install /path/to/superhaptic-core-0.1.0.tgz
```

## Step 6: Publish to npm

### For Scoped Packages (like @superhaptic/core)

Since your package is scoped (`@superhaptic/core`), you need to decide if it will be public or private:

#### Option A: Publish as Public (Free)

```bash
npm publish --access public
```

#### Option B: Publish as Private (Requires paid npm account)

```bash
npm publish
```

### First Time Publishing Checklist

Before you run `npm publish`, verify:

- [ ] Package name is unique (check on [npmjs.com](https://www.npmjs.com))
- [ ] Version is correct (starts at `0.1.0` or `1.0.0`)
- [ ] All files are built (`dist` folder exists)
- [ ] README.md exists and is informative
- [ ] LICENSE file exists (MIT)
- [ ] Repository URL is correct
- [ ] `.npmignore` or `files` field in package.json is set correctly

## Step 7: Verify Publication

After publishing, verify your package:

1. Visit: `https://www.npmjs.com/package/@superhaptic/core`
2. Try installing it:

```bash
npm install @superhaptic/core
```

## Updating Your Package

When you want to publish updates:

### 1. Update the Version

Use semantic versioning:

```bash
# For bug fixes (0.1.0 -> 0.1.1)
npm version patch

# For new features (0.1.0 -> 0.2.0)
npm version minor

# For breaking changes (0.1.0 -> 1.0.0)
npm version major
```

### 2. Rebuild and Publish

```bash
npm run build
npm publish --access public
```

## Common Issues and Solutions

### Issue: "You do not have permission to publish"

**Solution:** Make sure you're logged in with the correct account:

```bash
npm whoami
npm login
```

### Issue: "Package name already exists"

**Solution:** The package name is taken. Choose a different name or use a scope (like `@yourname/packagename`).

### Issue: "402 Payment Required"

**Solution:** Scoped packages are private by default. Add `--access public`:

```bash
npm publish --access public
```

### Issue: "prepublishOnly script failed"

**Solution:** Your linting or type checking failed. Fix the errors and try again:

```bash
npm run lint:fix
npm run typecheck
npm run build
```

## Best Practices

1. **Always test locally first** using `npm pack`
2. **Use semantic versioning** (major.minor.patch)
3. **Keep a CHANGELOG.md** to track changes
4. **Write good README.md** with examples
5. **Add a .npmignore** to exclude unnecessary files
6. **Use git tags** for releases:
   ```bash
   git tag v0.1.0
   git push --tags
   ```

## Automation (Optional)

Consider using GitHub Actions to automate publishing:

1. Create `.github/workflows/publish.yml`
2. Publish automatically when you create a GitHub release
3. Or use services like [semantic-release](https://github.com/semantic-release/semantic-release)

## Quick Reference Commands

```bash
# Login
npm login

# Check who you're logged in as
npm whoami

# Build the package
npm run build

# Test locally
npm pack

# Publish (first time)
npm publish --access public

# Update version and publish
npm version patch
npm publish --access public

# View your package
npm view @superhaptic/core

# Unpublish (within 72 hours only!)
npm unpublish @superhaptic/core@0.1.0
```

## Support

- npm documentation: https://docs.npmjs.com/
- Package.json fields: https://docs.npmjs.com/cli/v10/configuring-npm/package-json
- Scoped packages: https://docs.npmjs.com/about-scopes

---

**Ready to publish?** Run:

```bash
npm run build
npm publish --access public
```

🎉 Your package will be live on npm!
