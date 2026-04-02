'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getAffinityDescription, getAffinityPercentage } from '@/lib/game/affinity';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AffinityDisplay() {
  const { gameState } = useGame();
  
  const affinity = gameState.affinity;
  const percentage = getAffinityPercentage(affinity);
  const description = getAffinityDescription(affinity);
  
  // 心形填充颜色
  const getHeartColor = (affinity: number) => {
    if (affinity >= 80) return 'text-pink-500';
    if (affinity >= 60) return 'text-red-400';
    if (affinity >= 40) return 'text-orange-400';
    if (affinity >= 20) return 'text-yellow-500';
    return 'text-gray-400';
  };
  
  return (
    <Card className="px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-3">
        {/* 心形图标 */}
        <Heart 
          className={cn(
            "h-4 w-4 transition-all duration-300",
            getHeartColor(affinity)
          )}
          fill={affinity > 0 ? "currentColor" : "none"}
        />
        
        {/* 好感度数值和描述 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white drop-shadow">
            {percentage}%
          </span>
          <span className="text-xs text-white/70 hidden sm:inline">
            {description}
          </span>
        </div>
      </div>
    </Card>
  );
}
