import { GameState, SaveSlot, GameStats } from './types';

const SAVE_KEY = 'galgame_saves';
const STATS_KEY = 'galgame_stats';
const AUTO_SAVE_KEY = 'galgame_autosave';

// 生成唯一ID
const generateId = (): string => {
  return `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有存档
export const getAllSaves = (): SaveSlot[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return [];
    
    const saves: SaveSlot[] = JSON.parse(saved);
    return saves.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Failed to load saves:', error);
    return [];
  }
};

// 获取单个存档
export const getSave = (id: string): SaveSlot | null => {
  const saves = getAllSaves();
  return saves.find(s => s.id === id) || null;
};

// 保存游戏（使用自定义名称）
export const saveGame = (
  gameState: GameState,
  name: string,
  customId?: string
): SaveSlot => {
  if (typeof window === 'undefined') {
    throw new Error('Cannot save in non-browser environment');
  }

  const now = Date.now();
  const saveId = customId || generateId();
  
  // 更新游戏状态
  const updatedState: GameState = {
    ...gameState,
    timestamp: now,
  };
  
  const saveSlot: SaveSlot = {
    id: saveId,
    name: name,
    gameState: updatedState,
    createdAt: customId ? getSave(customId)?.createdAt || now : now,
    updatedAt: now,
  };
  
  // 获取现有存档并更新
  const saves = getAllSaves();
  const existingIndex = saves.findIndex(s => s.id === saveId);
  
  if (existingIndex >= 0) {
    saves[existingIndex] = saveSlot;
  } else {
    saves.push(saveSlot);
  }
  
  // 保存到 localStorage
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
    return saveSlot;
  } catch (error) {
    console.error('Failed to save game:', error);
    throw new Error('保存失败：存储空间不足');
  }
};

// 删除存档
export const deleteSave = (id: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const saves = getAllSaves();
    const filtered = saves.filter(s => s.id !== id);
    localStorage.setItem(SAVE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete save:', error);
    return false;
  }
};

// 自动保存
export const autoSave = (gameState: GameState): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const autoSaveData: SaveSlot = {
      id: 'autosave',
      name: '自动存档',
      gameState: {
        ...gameState,
        timestamp: Date.now(),
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(autoSaveData));
  } catch (error) {
    console.error('Failed to auto save:', error);
  }
};

// 读取自动存档
export const getAutoSave = (): SaveSlot | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error('Failed to load auto save:', error);
    return null;
  }
};

// 导出存档为 JSON 文件
export const exportSave = (saveId: string): void => {
  const save = getSave(saveId);
  if (!save) {
    throw new Error('存档不存在');
  }
  
  const data = JSON.stringify(save, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `galgame_save_${save.name}_${saveId}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// 导入存档（返回自定义名称对话框）
export const importSave = (file: File): Promise<SaveSlot> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedSave: SaveSlot = JSON.parse(content);
        
        // 验证存档格式
        if (!importedSave.id || !importedSave.name || !importedSave.gameState) {
          throw new Error('无效的存档格式');
        }
        
        resolve(importedSave);
      } catch (error) {
        reject(new Error('导入失败：文件格式错误'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('导入失败：无法读取文件'));
    };
    
    reader.readAsText(file);
  });
};

// 获取游戏统计
export const getGameStats = (): GameStats => {
  if (typeof window === 'undefined') {
    return {
      playCount: 0,
      totalPlayTime: 0,
      endingsUnlocked: [],
      choicesMade: 0,
    };
  }
  
  try {
    const saved = localStorage.getItem(STATS_KEY);
    if (!saved) {
      return {
        playCount: 0,
        totalPlayTime: 0,
        endingsUnlocked: [],
        choicesMade: 0,
      };
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error('Failed to load stats:', error);
    return {
      playCount: 0,
      totalPlayTime: 0,
      endingsUnlocked: [],
      choicesMade: 0,
    };
  }
};

// 更新游戏统计
export const updateGameStats = (updates: Partial<GameStats>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const current = getGameStats();
    const updated = { ...current, ...updates };
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update stats:', error);
  }
};

// 清空所有存档
export const clearAllSaves = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(AUTO_SAVE_KEY);
  } catch (error) {
    console.error('Failed to clear saves:', error);
  }
};
