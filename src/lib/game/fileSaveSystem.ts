import { GameState, SaveSlot } from './types';
import { formatDistanceToNow } from 'date-fns';

const SAVE_FILE_PREFIX = 'galgame_save_';
const SAVE_FILE_EXTENSION = '.json';

/**
 * 将游戏状态转换为可保存的数据
 */
const prepareSaveData = (name: string, gameState: GameState): any => {
  return {
    id: `save_${Date.now()}`,
    name,
    gameState: {
      ...gameState,
      flags: Array.from(gameState.flags),
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

/**
 * 下载存档文件
 */
export const downloadSaveFile = (name: string, gameState: GameState) => {
  const saveData = prepareSaveData(name, gameState);
  const dataStr = JSON.stringify(saveData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${SAVE_FILE_PREFIX}${name}_${Date.now()}${SAVE_FILE_EXTENSION}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 读取上传的存档文件
 */
export const readSaveFile = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const saveData: SaveSlot = JSON.parse(content);

        // 转换 flags 回 Set
        if (Array.isArray(saveData.gameState.flags)) {
          saveData.gameState.flags = new Set(saveData.gameState.flags);
        }

        // 更新时间戳
        saveData.updatedAt = Date.now();

        resolve(saveData);
      } catch (error) {
        reject(new Error('存档文件格式错误'));
      }
    };

    reader.onerror = () => {
      reject(new Error('读取文件失败'));
    };

    reader.readAsText(file);
  });
};

/**
 * 验证存档文件
 */
export const validateSaveFile = (file: File): boolean => {
  if (!file.name.endsWith(SAVE_FILE_EXTENSION)) {
    return false;
  }
  if (file.size > 1024 * 1024) { // 最大1MB
    return false;
  }
  return true;
};

/**
 * 格式化存档时间
 */
export const formatSaveTime = (timestamp: number): string => {
  return formatDistanceToNow(timestamp, { addSuffix: true });
};

/**
 * 生成存档截图（简化版，使用当前场景背景）
 */
export const generateSaveScreenshot = (background?: string): string => {
  // 简化版：返回背景图路径
  // 实际实现可以使用 canvas 截取当前游戏画面
  return background || '/bg-dorm.jpg';
};

/**
 * 获取存档描述信息
 */
export const getSaveDescription = (save: any): string => {
  const state = save.gameState;
  const playTime = Math.floor(state.playTime / 1000); // 秒

  const hours = Math.floor(playTime / 3600);
  const minutes = Math.floor((playTime % 3600) / 60);
  const seconds = playTime % 60;

  const timeStr = hours > 0
    ? `${hours}小时${minutes}分钟`
    : `${minutes}分${seconds}秒`;

  return `${timeStr} · 好感度 ${state.affinity}`;
};
