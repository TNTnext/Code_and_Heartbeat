import { GameSettings } from './types';

const SETTINGS_KEY = 'galgame_settings';

// 默认设置
export const DEFAULT_SETTINGS: GameSettings = {
  textSpeed: 7,
  autoPlay: false,
  autoPlayDelay: 3000,
  skipSeen: false,
  fontSize: 16,
  soundEnabled: true,
  musicEnabled: true,
  soundVolume: 70,
  musicVolume: 50,
  fullscreen: false,
};

// 获取设置
export const getSettings = (): GameSettings => {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_SETTINGS };
  }
  
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return { ...DEFAULT_SETTINGS };
    
    const settings: Partial<GameSettings> = JSON.parse(saved);
    return { ...DEFAULT_SETTINGS, ...settings };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return { ...DEFAULT_SETTINGS };
  }
};

// 保存设置
export const saveSettings = (settings: GameSettings): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

// 重置设置
export const resetSettings = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  } catch (error) {
    console.error('Failed to reset settings:', error);
  }
};

// 更新单个设置
export const updateSetting = <K extends keyof GameSettings>(
  key: K,
  value: GameSettings[K]
): void => {
  const current = getSettings();
  const updated = { ...current, [key]: value };
  saveSettings(updated);
};

// 获取文字显示速度（毫秒）
export const getTextSpeed = (speed: number): number => {
  // speed 1-10，转换为延迟 100-50ms
  return 150 - (speed * 10);
};
