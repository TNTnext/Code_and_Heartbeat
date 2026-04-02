'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DialogueBoxProps {
  speaker: string;
  text: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'angry' | 'shy' | 'blush' | 'focused' | 'tsundere';
  expression?: string;
  isTyping: boolean;
}

export function DialogueBox({ speaker, text, emotion, expression, isTyping }: DialogueBoxProps) {
  // 获取情绪图标
  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'angry':
        return '😠';
      case 'shy':
      case 'blush':
        return '😳';
      case 'focused':
        return '🤔';
      case 'tsundere':
        return '😏';
      default:
        return '';
    }
  };
  
  return (
    <Card className="bg-black/80 backdrop-blur-md border-2 border-white/20 shadow-2xl">
      {/* 说话者名称 */}
      {speaker && (
        <div className="px-6 pt-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white drop-shadow-lg">
              {speaker}
            </span>
            <span className="text-xl">{getEmotionIcon(emotion)}</span>
          </div>
        </div>
      )}
      
      {/* 对话内容 */}
      <div className="px-6 py-4 min-h-[120px]">
        <p className={cn(
          "text-xl leading-relaxed text-white drop-shadow-lg",
          "whitespace-pre-wrap",
          isTyping && "after:content-['|'] after:animate-pulse after:text-white/70"
        )}>
          {text}
        </p>
        
        {/* 表情描述 */}
        {expression && (
          <p className="mt-3 text-sm text-white/70 italic">
            {expression}
          </p>
        )}
      </div>
    </Card>
  );
}
