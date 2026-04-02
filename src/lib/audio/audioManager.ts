'use client';

import { useEffect, useRef } from 'react';

export class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.5;
  private currentTrack: string = '';

  private constructor() {
    // 单例模式
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public play(src: string, loop: boolean = true): void {
    if (this.currentTrack === src && this.isPlaying) {
      return; // 已经在播放同一曲目
    }

    // 停止当前播放
    this.stop();

    this.audio = new Audio(src);
    this.audio.volume = this.volume;
    this.audio.loop = loop;
    
    this.audio.play().catch(err => {
      console.warn('Audio play failed:', err);
    });

    this.currentTrack = src;
    this.isPlaying = true;
  }

  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.isPlaying = false;
    this.currentTrack = '';
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  public resume(): void {
    if (this.audio) {
      this.audio.play().catch(err => {
        console.warn('Audio resume failed:', err);
      });
      this.isPlaying = true;
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isAudioPlaying(): boolean {
    return this.isPlaying;
  }
}

// React Hook for audio
export function useAudioManager() {
  const audioManager = useRef(AudioManager.getInstance());

  useEffect(() => {
    return () => {
      audioManager.current.stop();
    };
  }, []);

  return audioManager.current;
}
