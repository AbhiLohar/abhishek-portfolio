// 8-Bit Web Audio API Synthesizer (Zero External Audio Dependencies)
class RetroAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicPlaying = false;
    this.musicInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
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
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // UI Sound Effects
  playClick() {
    this.playTone(850, 0.04, 'square', 0.04);
  }

  playOpen() {
    if (this.isMuted) return;
    this.init();
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.07, 'triangle', 0.06), idx * 45);
    });
  }

  playClose() {
    if (this.isMuted) return;
    this.init();
    [783.99, 659.25, 523.25].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.06, 'sawtooth', 0.04), idx * 40);
    });
  }

  playMaximize() {
    if (this.isMuted) return;
    this.init();
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.08, 'sine', 0.07), idx * 35);
    });
  }

  playBoot() {
    if (this.isMuted) return;
    this.init();
    const chord = [261.63, 329.63, 392.00, 523.25];
    chord.forEach(freq => this.playTone(freq, 0.9, 'triangle', 0.06));
  }

  playSnakeEat() {
    this.playTone(987.77, 0.08, 'sine', 0.08);
    setTimeout(() => this.playTone(1318.51, 0.12, 'sine', 0.08), 50);
  }

  playGameOver() {
    this.playTone(330, 0.15, 'sawtooth', 0.08);
    setTimeout(() => this.playTone(220, 0.25, 'sawtooth', 0.09), 120);
    setTimeout(() => this.playTone(110, 0.45, 'sawtooth', 0.1), 320);
  }

  playBeep() {
    this.playTone(440, 0.1, 'square', 0.06);
  }

  // Ambient 8-Bit Melody Sequencer for RetroPlayer
  startMusic(onBeat) {
    if (this.isMuted) return;
    this.init();
    this.stopMusic();
    this.musicPlaying = true;
    
    // Pentatonic ambient scale in A minor
    const notes = [220, 261.63, 293.66, 329.63, 392.00, 440, 523.25];
    let step = 0;

    this.musicInterval = setInterval(() => {
      if (!this.musicPlaying || this.isMuted) return;
      const note = notes[step % notes.length];
      const bassNote = notes[(step % 4) * 2] / 2;
      
      this.playTone(bassNote, 0.18, 'triangle', 0.05);
      if (step % 2 === 0) {
        this.playTone(note, 0.14, 'sine', 0.04);
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
