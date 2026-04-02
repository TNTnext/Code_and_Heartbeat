'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Settings, 
  Save, 
  FolderOpen, 
  RotateCcw, 
  X,
  Home
} from 'lucide-react';

interface GameMenuProps {
  onClose: () => void;
}

export function GameMenu({ onClose }: GameMenuProps) {
  const { 
    setShowMenu, 
    setShowSettings, 
    setShowSaveLoad, 
    restartGame,
    returnToTitle,
    gameState
  } = useGame();
  
  const handleSettings = () => {
    setShowMenu(false);
    setShowSettings(true);
  };
  
  const handleSave = () => {
    setShowMenu(false);
    setShowSaveLoad(true);
  };
  
  const handleLoad = () => {
    setShowMenu(false);
    setShowSaveLoad(true);
  };
  
  const handleRestart = () => {
    if (confirm('确定要重新开始吗？当前进度将会丢失。')) {
      restartGame();
      setShowMenu(false);
    }
  };
  
  const handleReturnToTitle = () => {
    if (confirm('确定要返回标题吗？')) {
      returnToTitle();
      setShowMenu(false);
    }
  };
  
  const handleResume = () => {
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
      <Card className="w-full max-w-md p-6 bg-card/95 backdrop-blur-md shadow-2xl animate-in zoom-in duration-200">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            游戏菜单
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* 游戏信息 */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between mb-2">
              <span>当前场景</span>
              <span className="text-foreground font-medium">
                {gameState.currentSceneId}
              </span>
            </div>
            <div className="flex justify-between">
              <span>好感度</span>
              <span className="text-foreground font-medium">
                {gameState.affinity}%
              </span>
            </div>
          </div>
        </div>
        
        {/* 菜单选项 */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleResume}
          >
            <Play className="h-5 w-5" />
            继续游戏
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleSettings}
          >
            <Settings className="h-5 w-5" />
            游戏设置
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleSave}
          >
            <Save className="h-5 w-5" />
            保存游戏
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleLoad}
          >
            <FolderOpen className="h-5 w-5" />
            读取存档
          </Button>
          
          <Separator className="my-4" />
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleRestart}
          >
            <RotateCcw className="h-5 w-5" />
            重新开始
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleReturnToTitle}
          >
            <Home className="h-5 w-5" />
            返回标题
          </Button>
        </div>
      </Card>
    </div>
  );
}
