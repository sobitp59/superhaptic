# Contributing to Superhaptic

Thank you for your interest in contributing to Superhaptic! 🎉

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/superhaptic.git
   cd superhaptic
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Test Locally**
   ```bash
   npm run dev  # Watch mode
   ```

## Code Style

- We use **ESLint** and **Prettier** for code formatting
- Run `npm run lint` before committing
- TypeScript strict mode is enabled

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add haptic intensity customization"
git commit -m "fix: resolve audio context initialization bug"
git commit -m "docs: update README with new examples"
```

## Pull Request Process

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run tests: `npm test`
4. Build: `npm run build`
5. Commit with conventional commit message
6. Push and create PR

## Testing

- Add tests for new features
- Ensure all tests pass: `npm test`
- Maintain or improve code coverage

## Questions?

- Open an [issue](https://github.com/yourusername/superhaptic/issues)
- Start a [discussion](https://github.com/yourusername/superhaptic/discussions)

Thank you for contributing! ❤️
