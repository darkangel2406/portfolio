/**
 * Web Audio API Acoustic Sound Synthesis Engine
 * Provides distinct, tactile, zero-asset interactive sounds for every button and link type.
 * Zero external audio files required - works 100% offline in browser and exported single-file HTML.
 */

let sharedAudioCtx = null;

function getAudioContext() {
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Play synthesized sound tailored to the element type:
 * - 'nav': Crisp mechanical click for Next/Prev/Arrows/Sliders
 * - 'link': Soft crystalline dual-tone chime for hyperlinks & social links
 * - 'chapter': Warm hollow woodblock/marimba tap for tabs, pills, chapters
 * - 'action': Modern punchy UI pop for primary buttons, downloads, submit
 * - 'util': Subtle micro-tick for toggles, copy buttons, filters
 */
export function playInteractionSound(type = 'action') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'nav') {
      // Crisp mechanical navigation click with subtle pitch sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.038);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);

    } else if (type === 'link') {
      // Crystalline dual-tone harmonic chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(1174.66, now); // D6
      osc2.frequency.setValueAtTime(1760.00, now); // A6

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.19);
      osc2.stop(now + 0.19);

    } else if (type === 'chapter') {
      // Warm hollow marimba / woodblock tap
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.065);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(460, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);

    } else if (type === 'action') {
      // Modern punchy digital UI pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.045);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

    } else {
      // Subtle micro-tick / snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.022);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    }
  } catch (err) {
    // Graceful silent fallback if audio context is blocked
  }
}

/**
 * Attach global event delegation listener to play appropriate sound for any clicked button / link
 */
export function initGlobalButtonSoundListener() {
  if (typeof window === 'undefined') return;

  const handleGlobalClick = (e) => {
    // Check if target is or is within a button or link
    const el = e.target.closest('button, a, [role="button"], [data-jump-page], input[type="button"], input[type="submit"]');
    if (!el) return;

    // Detect interaction type
    if (el.hasAttribute('data-jump-page') || el.classList.contains('tab') || el.classList.contains('pill') || el.getAttribute('role') === 'tab') {
      playInteractionSound('chapter');
    } else if (
      el.id?.includes('prev') || el.id?.includes('next') ||
      el.classList.contains('book-stage-nav-btn') ||
      el.title?.toLowerCase().includes('turn') || el.title?.toLowerCase().includes('page') ||
      el.getAttribute('aria-label')?.toLowerCase().includes('previous') || el.getAttribute('aria-label')?.toLowerCase().includes('next')
    ) {
      playInteractionSound('nav');
    } else if (el.tagName === 'A' || el.getAttribute('href') || el.title?.toLowerCase().includes('link') || el.classList.contains('social-link')) {
      playInteractionSound('link');
    } else if (el.classList.contains('btn-primary') || el.classList.contains('bg-primary') || el.title?.toLowerCase().includes('download') || el.innerText?.toLowerCase().includes('download')) {
      playInteractionSound('action');
    } else {
      playInteractionSound('util');
    }
  };

  document.addEventListener('click', handleGlobalClick, true);
  return () => {
    document.removeEventListener('click', handleGlobalClick, true);
  };
}

