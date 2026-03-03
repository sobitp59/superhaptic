/**
 * Superhaptic - Haptic feedback for the web
 */

// Extend Window interface to include vendor-prefixed AudioContext
interface WindowWithWebkit extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export type HapticPattern = number | number[] | readonly number[];

export interface HapticOptions {
  /**
   * Enable or disable haptic feedback
   * @default true
   */
  enabled?: boolean;

  /**
   * Enable audio feedback as fallback when vibration unavailable
   * @default true
   */
  audioFallback?: boolean;
}

/**
 * Pre-defined haptic patterns
 */
export const HapticPresets = {
  /** Light tap - 10ms */
  light: 10,

  /** Medium tap - 20ms */
  medium: 20,

  /** Heavy tap - 40ms */
  heavy: 40,

  /** Success pattern - two short taps */
  success: [10, 50, 10],

  /** Warning pattern - medium then light */
  warning: [20, 50, 10],

  /** Error pattern - three short taps */
  error: [15, 30, 15, 30, 15],

  /** Selection - very light tap */
  selection: 5,

  /** Double tap pattern */
  doubleTap: [15, 100, 15],

  /** Triple tap pattern */
  tripleTap: [10, 50, 10, 50, 10],

  /** Notification - escalating pattern */
  notification: [10, 50, 20, 50, 30],

  /** Long press - sustained vibration */
  longPress: 50,
} as const;

export type HapticPresetName = keyof typeof HapticPresets;

/**
 * Audio feedback engine using Web Audio API
 */
class AudioEngine {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;

    if (!this.audioContext) {
      try {
        const AudioContextClass = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      } catch {
        return null;
      }
    }
    return this.audioContext;
  }

  /**
   * Play a click sound based on intensity
   */
  playClick(intensity: 'light' | 'medium' | 'heavy' = 'medium'): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Different frequencies for different intensities
    const frequencies = { light: 800, medium: 600, heavy: 400 };
    const volumes = { light: 0.1, medium: 0.15, heavy: 0.2 };
    const durations = { light: 0.01, medium: 0.015, heavy: 0.025 };

    oscillator.frequency.value = frequencies[intensity];
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volumes[intensity], now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + durations[intensity]);

    oscillator.start(now);
    oscillator.stop(now + durations[intensity]);
  }

  /**
   * Play a pattern of sounds
   */
  async playPattern(pattern: HapticPattern): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;

    const delays = (Array.isArray(pattern) ? [...pattern] : [pattern]) as number[];

    for (let i = 0; i < delays.length; i++) {
      if (i % 2 === 0) {
        // Even indices are vibration durations
        const duration = delays[i];
        const intensity = duration < 15 ? 'light' : duration < 30 ? 'medium' : 'heavy';
        this.playClick(intensity);
        await new Promise(resolve => setTimeout(resolve, duration));
      } else {
        // Odd indices are pauses
        await new Promise(resolve => setTimeout(resolve, delays[i]));
      }
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

class Superhaptic {
  private enabled: boolean = true;
  private audioFallback: boolean = true;
  private audioEngine: AudioEngine;

  constructor(options: HapticOptions = {}) {
    this.enabled = options.enabled ?? true;
    this.audioFallback = options.audioFallback ?? true;
    this.audioEngine = new AudioEngine(this.audioFallback);
  }

  /**
   * Check if the Vibration API is supported
   */
  isSupported(): boolean {
    return 'vibrate' in navigator;
  }

  /**
   * Check if device likely has vibration hardware (mobile device)
   */
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window);
  }

  /**
   * Trigger haptic feedback with a custom pattern
   * @param pattern - Vibration duration in ms or pattern array
   * @returns true if vibration or audio feedback was triggered, false otherwise
   */
  vibrate(pattern: HapticPattern): boolean {
    if (!this.enabled) {
      return false;
    }

    let vibrateSuccess = false;
    const isMobile = this.isMobileDevice();

    // Try vibration if supported AND on mobile device
    if (this.isSupported() && isMobile) {
      try {
        // Convert readonly arrays to mutable arrays for navigator.vibrate()
        const vibratePattern = (Array.isArray(pattern) ? [...pattern] : pattern) as number | number[];
        vibrateSuccess = navigator.vibrate(vibratePattern);
      } catch (error) {
        // Vibration failed, will try audio fallback
      }
    }

    // Use audio fallback if vibration didn't work (or not on mobile) and fallback is enabled
    if (!vibrateSuccess && this.audioFallback && this.audioEngine.isEnabled()) {
      this.audioEngine.playPattern(pattern);
      return true;
    }

    return vibrateSuccess;
  }

  /**
   * Trigger haptic feedback using a preset pattern
   * @param preset - Name of the preset pattern
   */
  preset(preset: HapticPresetName): boolean {
    return this.vibrate(HapticPresets[preset]);
  }

  /**
   * Stop any ongoing vibration
   */
  stop(): boolean {
    if (!this.isSupported()) {
      return false;
    }

    return navigator.vibrate(0);
  }

  /**
   * Enable haptic feedback
   */
  enable(): void {
    this.enabled = true;
    this.audioEngine.setEnabled(this.audioFallback);
  }

  /**
   * Disable haptic feedback
   */
  disable(): void {
    this.enabled = false;
    this.audioEngine.setEnabled(false);
    this.stop();
  }

  /**
   * Toggle haptic feedback on/off
   */
  toggle(): boolean {
    this.enabled = !this.enabled;
    this.audioEngine.setEnabled(this.enabled && this.audioFallback);
    if (!this.enabled) {
      this.stop();
    }
    return this.enabled;
  }

  /**
   * Get current enabled state
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}

// Create and export default instance
const superhaptic = new Superhaptic();

export default superhaptic;
export { Superhaptic };

/**
 * Quick access functions using the default instance
 */
export const vibrate = (pattern: HapticPattern) => superhaptic.vibrate(pattern);
export const preset = (preset: HapticPresetName) => superhaptic.preset(preset);
export const stop = () => superhaptic.stop();
export const enable = () => superhaptic.enable();
export const disable = () => superhaptic.disable();
export const toggle = () => superhaptic.toggle();
export const isSupported = () => superhaptic.isSupported();
export const isEnabled = () => superhaptic.isEnabled();
