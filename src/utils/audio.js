// Ultra-Fast 8-Bit Web Audio API Synthesizer (Zero External Dependencies & Zero Latency)
class RetroAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicPlaying = false;
    this.musicInterval = null;
  }

  init() {
    if (this.isMuted) return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.stopMusic();
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  playTone(freq, duration, type = 'square', gainVal = 0.08) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio policy fallback
    }
  }

  // UI Sound Effects (Non-blocking)
  playClick() {
    if (this.isMuted) return;
    this.playTone(850, 0.03, 'square', 0.03);
  }

  playOpen() {
    if (this.isMuted) return;
    this.playTone(523.25, 0.05, 'triangle', 0.05);
    setTimeout(() => this.playTone(659.25, 0.05, 'triangle', 0.05), 30);
    setTimeout(() => this.playTone(783.99, 0.06, 'triangle', 0.05), 60);
  }

  playClose() {
    if (this.isMuted) return;
    this.playTone(783.99, 0.05, 'sawtooth', 0.03);
    setTimeout(() => this.playTone(523.25, 0.05, 'sawtooth', 0.03), 30);
  }

  playMaximize() {
    if (this.isMuted) return;
    this.playTone(440, 0.05, 'sine', 0.05);
    setTimeout(() => this.playTone(880, 0.06, 'sine', 0.05), 30);
  }

  playBoot() {
    if (this.isMuted) return;
    this.init();
    const chord = [261.63, 329.63, 392.00, 523.25];
    chord.forEach(freq => this.playTone(freq, 0.6, 'triangle', 0.05));
  }

  playSnakeEat() {
    if (this.isMuted) return;
    this.playTone(987.77, 0.06, 'sine', 0.07);
  }

  playGameOver() {
    if (this.isMuted) return;
    this.playTone(330, 0.12, 'sawtooth', 0.07);
    setTimeout(() => this.playTone(110, 0.3, 'sawtooth', 0.08), 100);
  }

  playBeep() {
    if (this.isMuted) return;
    this.playTone(440, 0.08, 'square', 0.05);
  }

  // Ambient 8-Bit Melody Sequencer for RetroPlayer
  startMusic(onBeat) {
    if (this.isMuted) return;
    this.init();
    this.stopMusic();
    this.musicPlaying = true;
    
    const notes = [220, 261.63, 293.66, 329.63, 392.00, 440, 523.25];
    let step = 0;

    this.musicInterval = setInterval(() => {
      if (!this.musicPlaying || this.isMuted) return;
      const note = notes[step % notes.length];
      const bassNote = notes[(step % 4) * 2] / 2;
      
      this.playTone(bassNote, 0.15, 'triangle', 0.04);
      if (step % 2 === 0) {
        this.playTone(note, 0.12, 'sine', 0.03);
      }
      if (onBeat) onBeat((step % 8) + 1);
      step++;
    }, 280);
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic(onBeat) {
    if (this.musicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(onBeat);
      return true;
    }
  }
}

export const soundFx = new RetroAudioEngine();
