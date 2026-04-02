import { GameState } from './types';

// 获取好感度描述
export const getAffinityDescription = (affinity: number): string => {
  if (affinity >= 80) return '知己挚爱';
  if (affinity >= 60) return '亲密好友';
  if (affinity >= 40) return '友好相处';
  if (affinity >= 20) return '普通室友';
  return '萍水相逢';
};

// 获取好感度等级
export const getAffinityLevel = (affinity: number): number => {
  return Math.min(5, Math.floor(affinity / 20) + 1);
};

// 应用好感度变化
export const applyAffinityChange = (
  gameState: GameState,
  change: number
): GameState => {
  const newAffinity = Math.max(0, Math.min(100, gameState.affinity + change));
  
  return {
    ...gameState,
    affinity: newAffinity,
  };
};

// 检查是否达到某个好感度
export const checkAffinityRequirement = (
  gameState: GameState,
  requirement: number
): boolean => {
  return gameState.affinity >= requirement;
};

// 获取好感度百分比
export const getAffinityPercentage = (affinity: number): number => {
  return Math.round(affinity);
};

// 好感度变化反馈
export const getAffinityChangeMessage = (change: number): string => {
  if (change > 0) {
    if (change >= 10) return '好感度大幅提升！';
    if (change >= 5) return '好感度提升了';
    return '好感度微升';
  }
  if (change < 0) {
    if (change <= -10) return '好感度大幅下降...';
    if (change <= -5) return '好感度下降了';
    return '好感度微降';
  }
  return '';
};
