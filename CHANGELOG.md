# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-03-03

### Added
- Initial release of Superhaptic
- Vibration API support with 11 preset patterns
- Audio fallback using Web Audio API
- TypeScript support with full type definitions
- ESM and CommonJS builds
- Mobile device detection
- Enable/disable controls
- Zero dependencies

### Features
- `preset()` - 11 pre-defined haptic patterns (light, medium, heavy, success, error, warning, etc.)
- `vibrate()` - Custom vibration patterns
- `enable()` / `disable()` - Control haptic feedback
- `isSupported()` - Check browser support
- Automatic audio fallback on desktop browsers

[Unreleased]: https://github.com/yourusername/superhaptic/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/superhaptic/releases/tag/v0.1.0
