/**
 * Web Audio API synthesized cinematic ambient soundscape
 * Creates an atmospheric sub-bass drone with harmonic warmth and slow resonant filter sweep.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported in this browser.');
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Master volume gain with smooth fade in
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, now + 3);

    // Warm Low-pass filter for dark cinematic rumble
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(120, now);
    this.filter.Q.setValueAtTime(4.0, now);

    // Filter LFO for subtle breathing movement
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now); // very slow 12s cycle
    lfoGain.gain.setValueAtTime(40, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start(now);

    // Deep sub drone oscillator (C1 - 32.7Hz)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'triangle';
    this.osc1.frequency.setValueAtTime(32.7, now);

    // Detuned second oscillator for harmonic thickness (G1 - 49Hz)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(48.9, now);

    // Connect chain
    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.osc1.start(now);
    this.osc2.start(now);

    this.isPlaying = true;
  }

  public pause() {
    if (!this.isPlaying || !this.masterGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      this.cleanup();
    }, 1300);

    this.isPlaying = false;
  }

  private cleanup() {
    try {
      this.osc1?.stop();
      this.osc2?.stop();
      this.osc1?.disconnect();
      this.osc2?.disconnect();
      this.masterGain?.disconnect();
      this.filter?.disconnect();
    } catch {
      // ignore
    }
    this.osc1 = null;
    this.osc2 = null;
    this.masterGain = null;
    this.filter = null;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cinematicAudio = new CinematicAudioEngine();
