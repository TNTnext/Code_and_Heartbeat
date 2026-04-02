'use client';

import React, { useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, FolderOpen, Settings } from 'lucide-react';
import { getBackgroundMusic } from '@/lib/audio/BackgroundMusic';
import { SettingsPanel } from './SettingsPanel';
import { SaveLoadPanel } from './SaveLoadPanel';

export function TitleScreen() {
  const { restartGame, setShowSettings, setShowSaveLoad, showSettings, showSaveLoad, settings } = useGame();
  const bgMusicRef = useRef<ReturnType<typeof getBackgroundMusic> | null>(null);
  const musicStartedRef = useRef(false);

  // 启动背景音乐（非阻塞）
  const startMusic = () => {
    if (!musicStartedRef.current && bgMusicRef.current && settings.musicEnabled) {
      try {
        // 应用音量设置
        bgMusicRef.current.setVolume(settings.musicVolume / 100);
        bgMusicRef.current.play().catch(err => {
          console.log('Music play failed:', err);
        });
        musicStartedRef.current = true;
      } catch (error) {
        console.log('Music start error:', error);
      }
    }
  };

  const handleNewGame = () => {
    restartGame();
    startMusic(); // 先执行游戏逻辑，再启动音乐
  };

  const handleLoadGame = () => {
    setShowSaveLoad(true);
    startMusic(); // 先执行游戏逻辑，再启动音乐
  };

  const handleSettings = () => {
    setShowSettings(true);
    startMusic(); // 先执行游戏逻辑，再启动音乐
  };

  useEffect(() => {
    // 初始化背景音乐
    if (!bgMusicRef.current) {
      bgMusicRef.current = getBackgroundMusic();
    }

    // ESC键打开设置
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        startMusic();
        handleSettings();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-background via-background to-background">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* 主内容区域 */}
      <div className="relative h-full flex items-center justify-center p-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：游戏标题和按钮 */}
          <div className="flex flex-col items-start gap-8">
            {/* 游戏标题 */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
              <h1 className="text-6xl font-bold text-foreground mb-3 tracking-tight">
                Code and Heartbeat
              </h1>
              <p className="text-xl text-muted-foreground tracking-wide">
                基于 Web 的视觉小说游戏
              </p>
            </div>

            {/* 菜单按钮 */}
            <div className="w-full max-w-sm flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
              <Button
                size="lg"
                className="h-14 text-base gap-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                onClick={handleNewGame}
              >
                <Play className="h-5 w-5" />
                新游戏
              </Button>

              <Button
                size="lg"
                className="h-14 text-base gap-3 bg-card text-card-foreground hover:bg-card/90 transition-all hover:scale-105 shadow-lg border"
                onClick={handleLoadGame}
              >
                <FolderOpen className="h-5 w-5" />
                读取存档
              </Button>

              <Button
                size="lg"
                className="h-14 text-base gap-3 bg-card text-card-foreground hover:bg-card/90 transition-all hover:scale-105 shadow-lg border"
                onClick={handleSettings}
              >
                <Settings className="h-5 w-5" />
                设置
              </Button>
            </div>

            {/* 底部提示 */}
            <div className="text-sm text-muted-foreground animate-in fade-in duration-700 delay-500">
              按 ESC 键可打开设置
            </div>
          </div>

          {/* 右侧：简介卡片 */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            <Card className="bg-card/95 backdrop-blur-sm border shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
              <div className="space-y-6">
                {/* 游戏类型 */}
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-primary">
                    视觉小说
                  </span>
                </div>

                {/* 游戏简介 */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    关于游戏
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    一款关于成长、梦想与选择的视觉小说。
                    在这个数字时代，你将体验一段难忘的大学时光，
                    面对各种挑战与抉择。
                  </p>
                </div>

                {/* 特性列表 */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    游戏特色
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>多分支剧情，多个结局</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>丰富的角色互动</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>好感度系统影响剧情走向</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>精美立绘与背景</span>
                    </li>
                  </ul>
                </div>

                {/* 操作说明 */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">操作方式：</span>
                    <br />
                    鼠标点击按钮进行选择
                    <br />
                    使用 Enter 或 Space 继续
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 版权信息 */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-muted-foreground">
        <p>© 2032 Code and Heartbeat | All Rights Reserved</p>
      </div>

      {/* 弹窗层 */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
      
      {showSaveLoad && (
        <SaveLoadPanel onClose={() => setShowSaveLoad(false)} />
      )}
    </div>
  );
}
