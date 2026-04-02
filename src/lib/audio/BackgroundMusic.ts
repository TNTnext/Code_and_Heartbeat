/**
 * Background Music Generator using Web Audio API
 * 生成柔和的背景音乐，适合Galgame场景
 */

export class BackgroundMusic {
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private melodyNodes: OscillatorNode[] = [];
  private currentNoteIndex: number = 0;
  private melodyInterval: NodeJS.Timeout | null = null;

  // 柔和的旋律（C大调五声音阶）
  private melody = [
    { note: 261.63, duration: 1 }, // C4
    { note: 293.66, duration: 1 }, // D4
    { note: 329.63, duration: 1 }, // E4
    { note: 392.00, duration: 1 }, // G4
    { note: 440.00, duration: 1 }, // A4
    { note: 392.00, duration: 1 }, // G4
    { note: 329.63, duration: 1 }, // E4
    { note: 293.66, duration: 1 }, // D4
  ];

  // 和弦进行（C - Am - F - G）
  private chords = [
    [261.63, 329.63, 392.00], // C大调
    [220.00, 261.63, 329.63], // A小调
    [174.61, 220.00, 261.63], // F大调
    [196.00, 246.94, 293.66], // G大调
  ];
  private currentChordIndex: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.1; // 初始音量
    }
  }

  public async play(): Promise<void> {
    if (this.isPlaying || !this.audioContext) return;

    // 用户交互后恢复AudioContext
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.isPlaying = true;
    this.startMelody();
    this.startChords();

    // 淡入效果
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 2);
    }
  }

  public pause(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    // 淡出效果
    if (this.gainNode && this.audioContext) {
      this.gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);

      setTimeout(() => {
        this.stopAll();
      }, 500);
    } else {
      this.stopAll();
    }
  }

  public setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(volume, this.audioContext?.currentTime || 0);
    }
  }

  private stopAll(): void {
    // 停止旋律
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }

    // 停止所有音符
    this.melodyNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {
        // 忽略已经停止的节点
      }
    });
    this.melodyNodes = [];
  }

  private startMelody(): void {
    if (!this.isPlaying || !this.audioContext) return;

    this.playNote(this.melody[this.currentNoteIndex].note, 0.8);
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    this.melodyInterval = setInterval(() => {
      if (!this.isPlaying) return;

      this.playNote(this.melody[this.currentNoteIndex].note, 0.8);
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
    }, 1000);
  }

  private startChords(): void {
    if (!this.isPlaying || !this.audioContext) return;

    const playChord = () => {
      if (!this.isPlaying) return;

      const chord = this.chords[this.currentChordIndex];
      chord.forEach((freq, i) => {
        setTimeout(() => {
          this.playNote(freq, 0.3, 0.05);
        }, i * 100);
      });

      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    };

    playChord();
    setInterval(playChord, 4000);
  }

  private playNote(frequency: number, duration: number, volume: number = 0.1): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();

    oscillator.connect(noteGain);
    noteGain.connect(this.gainNode!);

    // 使用正弦波产生柔和的声音
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // ADSR包络
    const attack = 0.1;
    const decay = 0.2;
    const sustain = 0.7;
    const release = 0.3;

    noteGain.gain.setValueAtTime(0, this.audioContext.currentTime);
    noteGain.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + attack);
    noteGain.gain.linearRampToValueAtTime(volume * sustain, this.audioContext.currentTime + attack + decay);
    noteGain.gain.linearRampToValueAtTime(volume * sustain * 0.8, this.audioContext.currentTime + duration - release);
    noteGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);

    this.melodyNodes.push(oscillator);

    // 清理已完成的音符
    setTimeout(() => {
      const index = this.melodyNodes.indexOf(oscillator);
      if (index > -1) {
        this.melodyNodes.splice(index, 1);
      }
    }, duration * 1000 + 100);
  }

  public destroy(): void {
    this.pause();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// 单例模式
let bgMusicInstance: BackgroundMusic | null = null;

export const getBackgroundMusic = (): BackgroundMusic => {
  if (!bgMusicInstance) {
    bgMusicInstance = new BackgroundMusic();
  }
  return bgMusicInstance;
};
