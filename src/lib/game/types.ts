// 游戏核心类型定义

// 角色信息
export interface Character {
  id: string;
  name: string;
  displayName: string;
  avatar?: string;
  description?: string;
}

// 对话行
export interface DialogueLine {
  speaker: string; // 角色ID
  text: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'angry' | 'shy' | 'blush' | 'focused';
  expression?: string; // 表情描述
}

// 选项
export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  affinityChange?: number; // 好感度变化
  requiresAffinity?: number; // 需要的最低好感度
  flags?: string[]; // 需要的标记
  addFlags?: string[]; // 添加标记
}

// 场景
export interface Scene {
  id: string;
  title: string;
  background?: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  autoNext?: boolean; // 是否自动进入下一场景
  nextSceneId?: string; // 自动进入的下一场景ID
  flags?: string[]; // 场景触发标记
}

// 游戏设置
export interface GameSettings {
  textSpeed: number; // 文字显示速度 1-10
  autoPlay: boolean; // 自动播放
  autoPlayDelay: number; // 自动播放延迟（毫秒）
  skipSeen: boolean; // 跳过已读
  fontSize: number; // 字体大小 12-24
  soundEnabled: boolean; // 音效开关
  musicEnabled: boolean; // 背景音乐开关
  soundVolume: number; // 音效音量 0-100
  musicVolume: number; // 音乐音量 0-100
  fullscreen: boolean; // 全屏
}

// 游戏状态
export interface GameState {
  currentSceneId: string;
  affinity: number; // 好感度 0-100
  flags: Set<string>; // 已触发标记
  history: string[]; // 已读场景ID列表
  variables: Record<string, any>; // 自定义变量
  timestamp: number; // 最后更新时间
  playTime: number; // 游戏时间（毫秒）
}

// 存档
export interface SaveSlot {
  id: string;
  name: string;
  gameState: GameState;
  screenshot?: string; // 缩略图
  createdAt: number;
  updatedAt: number;
}

// 结局
export interface Ending {
  id: string;
  title: string;
  description: string;
  condition: (state: GameState) => boolean;
  cg?: string; // 结局CG
}

// 游戏统计
export interface GameStats {
  playCount: number;
  totalPlayTime: number;
  endingsUnlocked: string[];
  choicesMade: number;
}
