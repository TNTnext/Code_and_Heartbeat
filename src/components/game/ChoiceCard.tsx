'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Choice } from '@/lib/game/types';
import { cn } from '@/lib/utils';

interface ChoiceCardProps {
  choice: Choice;
  onSelect: () => void;
  disabled?: boolean;
}

export function ChoiceCard({ choice, onSelect, disabled = false }: ChoiceCardProps) {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
        "bg-black/70 backdrop-blur-md border-2 border-white/30 hover:border-white/50",
        "group relative overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={!disabled ? onSelect : undefined}
    >
      {/* 悬停效果背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      
      {/* 内容 */}
      <div className="relative">
        <p className="text-lg font-medium text-white drop-shadow-lg group-hover:text-white/90 transition-colors">
          {choice.text}
        </p>
        
        {/* 好感度变化提示 */}
        {choice.affinityChange !== undefined && choice.affinityChange !== 0 && (
          <div className={cn(
            "absolute right-0 top-0 text-sm font-medium",
            choice.affinityChange > 0 ? "text-green-400" : "text-red-400"
          )}>
            {choice.affinityChange > 0 ? '+' : ''}{choice.affinityChange}
          </div>
        )}
      </div>
    </Card>
  );
}
