'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogueBox } from './DialogueBox';
import { ChoiceCard } from './ChoiceCard';
import { AffinityDisplay } from './AffinityDisplay';
import { SettingsPanel } from './SettingsPanel';
import { SaveLoadPanel } from './SaveLoadPanel';
import { GameMenu } from './GameMenu';
import { getAffinityDescription, getAffinityPercentage } from '@/lib/game/affinity';
import { CHARACTERS, CHARACTER_SPRITES } from '@/lib/game/data';
import { getTextSpeed } from '@/lib/game/settings';
import { Menu, Settings, Save, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBackgroundMusic } from '@/lib/audio/BackgroundMusic';

export function GameScreen() {
  const {
    currentScene,
    currentDialogue,
    currentDialogueIndex,
    isDialogueComplete,
    settings,
    nextDialogue,
    selectChoice,
    restartGame,
    setShowMenu,
    showMenu,
    setShowSettings,
    showSettings,
    setShowSaveLoad,
    showSaveLoad,
    lastAffinityChange,
    showAffinityChange,
    hideAffinityChange,
    updateSettings,
  } = useGame();

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // 背景音乐状态
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const bgMusicRef = useRef<ReturnType<typeof getBackgroundMusic> | null>(null);
  const musicStartedRef = useRef(false);

  // 音量转换为 0-0.3 范围
  const musicVolume = settings.musicVolume / 333.33;
  
  // 打字机效果
  useEffect(() => {
    if (!currentDialogue) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }
    
    // 如果跳过已读，直接显示全部
    if (settings.skipSeen) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }
    
    // 清除之前的打字动画
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    const fullText = currentDialogue.text;
    const speed = getTextSpeed(settings.textSpeed);
    
    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
      }
    };
    
    // 立即开始打字第一个字符
    typeNextChar();
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentDialogue, settings.textSpeed, settings.skipSeen]);
  
  // 点击时完成打字或进入下一句
  const handleClick = () => {
    if (showMenu || showSettings || showSaveLoad) return;
    if (isDialogueComplete) return;
    
    if (isTyping) {
      // 完成打字
      if (currentDialogue) {
        setDisplayedText(currentDialogue.text);
        setIsTyping(false);
      }
    } else {
      // 进入下一句
      nextDialogue();
    }
  };
  
  // 快捷键
  useEffect(() => {
    // 只有在非标题画面时才添加快捷键监听器
    if (typeof window !== 'undefined') {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowMenu(!showMenu);
        }
        if (e.key === 'Enter' || e.key === ' ') {
          if (!showMenu && !showSettings && !showSaveLoad) {
            e.preventDefault();
            handleClick();
          }
        }
        // M键控制音乐播放/暂停
        if (e.key.toLowerCase() === 'm' && !showMenu && !showSettings && !showSaveLoad) {
          e.preventDefault();
          toggleMusic();
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showMenu, showSettings, showSaveLoad, isTyping, isDialogueComplete]);

  // 初始化背景音乐
  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = getBackgroundMusic();
    }
  }, []);

  // 首次点击时启动背景音乐（浏览器需要用户交互）
  useEffect(() => {
    const startMusicOnInteraction = () => {
      if (!musicStartedRef.current && bgMusicRef.current && settings.musicEnabled) {
        bgMusicRef.current.play();
        setIsMusicPlaying(true);
        musicStartedRef.current = true;
      }
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('keydown', startMusicOnInteraction);
    };

    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('keydown', startMusicOnInteraction);

    return () => {
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('keydown', startMusicOnInteraction);
    };
  }, [settings.musicEnabled]);

  // 根据设置控制音乐播放
  useEffect(() => {
    if (bgMusicRef.current) {
      if (settings.musicEnabled && musicStartedRef.current && !isMusicPlaying) {
        bgMusicRef.current.play();
        setIsMusicPlaying(true);
      } else if (!settings.musicEnabled && isMusicPlaying) {
        bgMusicRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  }, [settings.musicEnabled]);

  // 更新音乐音量
  useEffect(() => {
    if (bgMusicRef.current) {
      const volume = settings.musicVolume / 333.33;
      bgMusicRef.current.setVolume(volume);
    }
  }, [settings.musicVolume]);

  // 切换音乐播放/暂停
  const toggleMusic = () => {
    if (!bgMusicRef.current) return;

    if (isMusicPlaying) {
      bgMusicRef.current.pause();
      setIsMusicPlaying(false);
      updateSettings({ musicEnabled: false });
    } else {
      bgMusicRef.current.play();
      setIsMusicPlaying(true);
      musicStartedRef.current = true;
      updateSettings({ musicEnabled: true });
    }
  };

  // 处理音量变化
  const handleVolumeChange = (value: number) => {
    const newVolume = Math.round(value * 333.33); // 转换回 0-100
    updateSettings({ musicVolume: newVolume });
  };
  
  // 获取角色名称
  const getCharacterName = (speakerId: string): string => {
    const character = CHARACTERS.find(c => c.id === speakerId);
    return character?.displayName || speakerId;
  };
  
  // 获取角色立绘
  const getCharacterSprite = (speakerId: string, emotion?: string): string | null => {
    const sprites = CHARACTER_SPRITES[speakerId];
    if (!sprites) return null;
    
    // 根据情绪映射到不同的表情
    const emotionMap: Record<string, string> = {
      'shy': 'shy',
      'blush': 'shy',
      'happy': 'happy',
      'focused': 'focused',
      'normal': 'normal',
      'sad': 'sad',
      'angry': 'angry',
      'tsundere': 'tsundere',
    };
    
    const spriteKey = emotion ? emotionMap[emotion] || 'normal' : 'normal';
    return sprites[spriteKey] || null;
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* 主游戏区域 */}
      <div 
        className="relative h-full w-full"
        onClick={handleClick}
      >
        {/* 背景层 */}
        <div className="absolute inset-0">
          <img
            src={currentScene?.background || '/bg-dorm.jpg'}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* 角色立绘层 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {currentDialogue?.speaker === 'dingle' && (
            <div className="relative w-full max-w-2xl h-full flex items-end justify-center pb-32 animate-in fade-in zoom-in duration-500">
              <img
                src={getCharacterSprite('dingle', currentDialogue.emotion) || '/dingle-normal.jpg'}
                alt="丁乐"
                className="max-h-[70vh] object-contain drop-shadow-2xl"
              />
            </div>
          )}
        </div>
        
        {/* UI层 */}
        <div className="relative h-full flex flex-col pointer-events-none">
          {/* 右上角控制按钮 */}
          <div className="absolute top-4 right-4 flex gap-2 pointer-events-auto">
            {/* 音量控制 */}
            <div className="flex items-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMusic}
                className="text-white hover:bg-transparent h-8 w-8"
                title={isMusicPlaying ? '暂停音乐 (M)' : '播放音乐 (M)'}
              >
                {isMusicPlaying ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={musicVolume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                title="背景音乐音量"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMenu(true)}
              className="bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white"
              title="菜单 (ESC)"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          {/* 好感度显示（右上角） */}
          <div className="absolute top-4 left-4 pointer-events-auto">
            <AffinityDisplay />
          </div>
          
          {/* 主要内容区域 */}
          <div className="flex-1 flex items-end justify-center p-8 pb-12">
            <div className="w-full max-w-4xl pointer-events-auto">
              {/* 对话框 */}
              <DialogueBox
                speaker={currentDialogue ? getCharacterName(currentDialogue.speaker) : ''}
                text={displayedText}
                emotion={currentDialogue?.emotion}
                expression={currentDialogue?.expression}
                isTyping={isTyping}
              />
              
              {/* 选项区域 */}
              {isDialogueComplete && currentScene?.choices && currentScene.choices.length > 0 && (
                <div className="mt-6 space-y-3">
                  {currentScene.choices.map((choice) => (
                    <ChoiceCard
                      key={choice.id}
                      choice={choice}
                      onSelect={() => selectChoice(choice)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 弹窗层 */}
      {showMenu && (
        <GameMenu onClose={() => setShowMenu(false)} />
      )}
      
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
      
      {showSaveLoad && (
        <SaveLoadPanel onClose={() => setShowSaveLoad(false)} />
      )}
      
      {/* 好感度变化提示 */}
      {showAffinityChange && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-300">
          <Card className={cn(
            "px-6 py-4 text-center",
            lastAffinityChange > 0 ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
          )}>
            <p className={cn(
              "text-lg font-medium",
              lastAffinityChange > 0 ? "text-green-500" : "text-red-500"
            )}>
              {lastAffinityChange > 0 ? '+' : ''}{lastAffinityChange}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              好感度变化
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
