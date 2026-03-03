# 🎯 Superhaptic

A lightweight, zero-dependency library for haptic feedback on the web. Bring mobile-like tactile experiences to your web applications!

## Features

- 🎮 **Simple API** - Easy to use, intuitive methods
- 📱 **Mobile-like haptics** - Pre-defined patterns mimicking iOS and Android
- 🔊 **Audio Feedback** - Sound feedback when vibration isn't supported
- 🎨 **Custom patterns** - Create your own vibration patterns
- 🪶 **Lightweight** - Zero dependencies, tiny bundle size
- 🔧 **TypeScript support** - Full type definitions included
- 🌐 **Universal** - Works with npm, pnpm, yarn, and bun

## Installation

```bash
# npm
npm install superhaptic

# pnpm
pnpm add superhaptic

# yarn
yarn add superhaptic

# bun
bun add superhaptic
```

## Quick Start

```typescript
import superhaptic from 'superhaptic';

// Use preset patterns (with automatic audio fallback)
superhaptic.preset('light');    // Light tap (vibrates OR plays sound)
superhaptic.preset('success');  // Success feedback
superhaptic.preset('error');    // Error feedback

// Custom vibration pattern
superhaptic.vibrate(50);        // Single vibration for 50ms
superhaptic.vibrate([10, 50, 10]); // Pattern: vibrate, pause, vibrate

// Control
superhaptic.stop();             // Stop vibration
superhaptic.disable();          // Disable all feedback
superhaptic.enable();           // Re-enable feedback
```

### 🔊 Audio Fallback

Superhaptic automatically uses **audio feedback** when vibration isn't supported! Users on desktop or browsers without vibration support get tactile-like click sounds instead. It just works!

## API Reference

### Preset Patterns

```typescript
import { preset, HapticPresets } from 'superhaptic';

preset('light');        // 10ms - Subtle feedback
preset('medium');       // 20ms - Standard feedback
preset('heavy');        // 40ms - Strong feedback
preset('success');      // Two short taps
preset('warning');      // Medium then light
preset('error');        // Three short taps
preset('selection');    // 5ms - Very light
preset('doubleTap');    // Double tap pattern
preset('tripleTap');    // Triple tap pattern
preset('notification'); // Escalating pattern
preset('longPress');    // 50ms sustained
```

### Custom Patterns

```typescript
import { vibrate } from 'superhaptic';

// Single vibration (in milliseconds)
vibrate(100);

// Pattern: [vibrate, pause, vibrate, pause, ...]
vibrate([50, 100, 50, 100, 50]);
```

### Instance Methods

```typescript
import { Superhaptic } from 'superhaptic';

const haptic = new Superhaptic({
  enabled: true,
  audioFallback: true     // Enable audio when vibration unavailable
});

haptic.vibrate(pattern);       // Trigger vibration/audio
haptic.preset('success');      // Use preset
haptic.stop();                 // Stop vibration
haptic.enable();               // Enable feedback
haptic.disable();              // Disable feedback
haptic.toggle();               // Toggle on/off
haptic.isSupported();          // Check browser vibration support
haptic.isEnabled();            // Check if enabled
```

### Functional API

```typescript
import {
  vibrate,
  preset,
  stop,
  enable,
  disable,
  toggle,
  isSupported,
  isEnabled
} from 'superhaptic';
```

## Usage Examples

### Button Feedback

```typescript
import { preset } from 'superhaptic';

button.addEventListener('click', () => {
  preset('light');
  // Your click handler
});
```

### Form Validation

```typescript
import { preset } from 'superhaptic';

if (isValid) {
  preset('success');
  submitForm();
} else {
  preset('error');
  showErrors();
}
```

### Toggle Switch

```typescript
import { vibrate } from 'superhaptic';

toggle.addEventListener('change', (e) => {
  vibrate(e.target.checked ? 20 : 10);
});
```

### User Preferences

```typescript
import superhaptic from 'superhaptic';

// Let users control haptics
const hapticsEnabled = localStorage.getItem('haptics') === 'true';
if (!hapticsEnabled) {
  superhaptic.disable();
}

// Settings toggle
settingsToggle.addEventListener('change', (e) => {
  superhaptic.toggle();
  localStorage.setItem('haptics', superhaptic.isEnabled().toString());
});
```

## Browser Support

The Vibration API is supported in:
- Chrome/Edge 32+
- Firefox 16+
- Safari 13+ (iOS Safari requires user interaction)
- Opera 19+
- Android Browser 4.4+

On unsupported browsers, the library fails silently by default.

## TypeScript

Full TypeScript support included:

```typescript
import type { HapticPattern, HapticOptions, HapticPresetName } from 'superhaptic';
```

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

## Author

Created with ❤️ for better web experiences
