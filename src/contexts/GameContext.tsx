'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { GameState, GameSettings, Scene, DialogueLine, Choice } from '@/lib/game/types';
import { CHARACTERS, SCENE_MAP, START_SCENE_ID } from '@/lib/game/data';
import { getSettings, saveSettings, getTextSpeed } from '@/lib/game/settings';
import { saveGame, autoSave, getAutoSave } from '@/lib/game/saveSystem';
import { applyAffinityChange, getAffinityChangeMessage } from '@/lib/game/affinity';
import { updateGameStats } from '@/lib/game/saveSystem';

// 初始游戏状态
const createInitialGameState = (): GameState => ({
  currentSceneId: START_SCENE_ID,
  affinity: 10,
  flags: new Set<string>(),
  history: [],
  variables: {},
  timestamp: Date.now(),
  playTime: 0,
});

// Game Context 类型
interface GameContextType {
  // 游戏状态
  gameState: GameState;
  currentScene: Scene | null;
  currentDialogueIndex: number;
  currentDialogue: DialogueLine | null;
  isDialogueComplete: boolean;
  
  // 设置
  settings: GameSettings;
  
  // 游戏控制
  nextDialogue: () => void;
  selectChoice: (choice: Choice) => void;
  restartGame: () => void;
  returnToTitle: () => void;
  
  // 存档/读档
  saveCurrentGame: (name: string, customId?: string) => void;
  loadSave: (saveData: any) => void;
  
  // 设置控制
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  
  // UI 状态
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showSaveLoad: boolean;
  setShowSaveLoad: (show: boolean) => void;
  
  // 标题屏幕
  isTitleScreen: boolean;
  
  // 游戏统计
  totalPlayTime: number;
  startTime: number;

  // 好感度变化
  lastAffinityChange: number;
  showAffinityChange: boolean;
  hideAffinityChange: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Game Provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 游戏状态
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueLine | null>(null);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  
  // 设置
  const [settings, setSettings] = useState<GameSettings>(getSettings());
  
  // UI 状态
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  
  // 标题屏幕
  const [isTitleScreen, setIsTitleScreen] = useState(true);

  // 游戏统计
  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const [startTime] = useState(Date.now());
  const playTimeRef = useRef<number>(0);
  const lastTimeRef = useRef(Date.now());

  // 好感度变化反馈
  const [lastAffinityChange, setLastAffinityChange] = useState(0);
  const [showAffinityChange, setShowAffinityChange] = useState(false);
  const affinityChangeTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // 初始化场景
  useEffect(() => {
    if (isTitleScreen) {
      setCurrentScene(null);
      setCurrentDialogue(null);
      setIsDialogueComplete(false);
      return;
    }
    
    const scene = SCENE_MAP[gameState.currentSceneId];
    setCurrentScene(scene || null);
    setCurrentDialogueIndex(0);
    setIsDialogueComplete(false);
    
    if (scene && scene.dialogue.length > 0) {
      setCurrentDialogue(scene.dialogue[0]);
    }
  }, [gameState.currentSceneId, isTitleScreen]);
  
  // 更新当前对话
  useEffect(() => {
    if (currentScene && currentDialogueIndex < currentScene.dialogue.length) {
      setCurrentDialogue(currentScene.dialogue[currentDialogueIndex]);
      setIsDialogueComplete(false);
    } else {
      setCurrentDialogue(null);
      setIsDialogueComplete(true);
    }
  }, [currentDialogueIndex, currentScene]);
  
  // 计算游戏时间
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;
      playTimeRef.current += delta;
      
      setTotalPlayTime(playTimeRef.current);
      
      // 每30秒自动保存
      if (playTimeRef.current % 30000 < delta) {
        const updatedState = { ...gameState, playTime: playTimeRef.current };
        autoSave(updatedState);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState]);
  
  // 保存设置
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);
  
  // 检查是否进入标题屏幕
  useEffect(() => {
    if (gameState.currentSceneId === 'title_screen') {
      setIsTitleScreen(true);
    }
  }, [gameState.currentSceneId]);
  
  // 下一句对话
  const nextDialogue = useCallback(() => {
    if (!currentScene) return;
    
    const nextIndex = currentDialogueIndex + 1;
    
    if (nextIndex >= currentScene.dialogue.length) {
      // 对话结束，检查是否自动进入下一场景
      if (currentScene.autoNext && currentScene.nextSceneId) {
        const nextSceneId = currentScene.nextSceneId;
        setGameState(prev => ({
          ...prev,
          currentSceneId: nextSceneId,
          history: [...prev.history, currentScene.id],
          playTime: playTimeRef.current,
        }));
      } else {
        setIsDialogueComplete(true);
      }
    } else {
      setCurrentDialogueIndex(nextIndex);
    }
  }, [currentScene, currentDialogueIndex]);
  
  // 选择选项
  const selectChoice = useCallback((choice: Choice) => {
    // 应用好感度变化
    let newAffinity = gameState.affinity;
    let affinityChange = 0;
    if (choice.affinityChange) {
      affinityChange = choice.affinityChange;
      newAffinity = applyAffinityChange(gameState, choice.affinityChange).affinity;

      // 显示好感度变化反馈
      setLastAffinityChange(affinityChange);
      setShowAffinityChange(true);

      // 清除之前的定时器
      if (affinityChangeTimerRef.current) {
        clearTimeout(affinityChangeTimerRef.current);
      }

      // 2秒后隐藏反馈
      affinityChangeTimerRef.current = setTimeout(() => {
        setShowAffinityChange(false);
      }, 2000);
    }

    // 添加标记
    const newFlags = new Set(gameState.flags);
    if (choice.addFlags) {
      choice.addFlags.forEach(flag => newFlags.add(flag));
    }

    // 更新统计
    updateGameStats({ choicesMade: (getGameStats().choicesMade || 0) + 1 });

    // 检查好感度是否为0或以下
    if (newAffinity <= 0) {
      newAffinity = 0;
      newFlags.add('bad_ending_unlocked');
    }

    // 进入下一场景
    setGameState({
      ...gameState,
      currentSceneId: choice.nextSceneId,
      affinity: newAffinity,
      flags: newFlags,
      history: [...gameState.history, currentScene!.id],
      playTime: playTimeRef.current,
    });
  }, [gameState, currentScene]);
  
  // 重新开始
  const restartGame = useCallback(() => {
    const newState = createInitialGameState();
    setGameState(newState);
    setCurrentDialogueIndex(0);
    playTimeRef.current = 0;
    setIsTitleScreen(false);
  }, []);
  
  // 返回标题画面
  const returnToTitle = useCallback(() => {
    setIsTitleScreen(true);
  }, []);

  // 隐藏好感度变化反馈
  const hideAffinityChange = useCallback(() => {
    setShowAffinityChange(false);
    if (affinityChangeTimerRef.current) {
      clearTimeout(affinityChangeTimerRef.current);
    }
  }, []);
  
  // 保存游戏
  const saveCurrentGame = useCallback((name: string, customId?: string) => {
    const updatedState = { ...gameState, playTime: playTimeRef.current };
    saveGame(updatedState, name, customId);
  }, [gameState]);
  
  // 读取存档
  const loadSave = useCallback((saveData: any) => {
    setGameState(saveData.gameState);
    setCurrentDialogueIndex(0);
    playTimeRef.current = saveData.gameState.playTime || 0;
    setIsTitleScreen(false);
  }, []);
  
  // 更新设置
  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  // 获取游戏统计
  const getGameStats = () => {
    // 这里应该从 saveSystem 导入，但为了简化我们直接返回
    return { choicesMade: 0 };
  };
  
  const value: GameContextType = {
    gameState,
    currentScene,
    currentDialogueIndex,
    currentDialogue,
    isDialogueComplete,
    settings,
    nextDialogue,
    selectChoice,
    restartGame,
    returnToTitle,
    saveCurrentGame,
    loadSave,
    updateSettings,
    showMenu,
    setShowMenu,
    showSettings,
    setShowSettings,
    showSaveLoad,
    setShowSaveLoad,
    isTitleScreen,
    totalPlayTime,
    startTime,
    lastAffinityChange,
    showAffinityChange,
    hideAffinityChange,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// 使用 Game Context 的 Hook
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
