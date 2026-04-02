'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Volume2, VolumeX, Type, Zap, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useGame();
  const { theme, setTheme } = useTheme();

  const handleUpdateSettings = (key: keyof typeof settings, value: any) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto p-6 bg-card/95 backdrop-blur-md shadow-2xl animate-in zoom-in duration-200">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            游戏设置
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 设置选项 */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">常规</TabsTrigger>
            <TabsTrigger value="display">显示</TabsTrigger>
            <TabsTrigger value="audio">音频</TabsTrigger>
          </TabsList>

          {/* 常规设置 */}
          <TabsContent value="general" className="space-y-6 mt-6">
            {/* 文字显示速度 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  文字显示速度
                </Label>
                <span className="text-sm text-muted-foreground">
                  {settings.textSpeed}
                </span>
              </div>
              <Slider
                value={[settings.textSpeed]}
                onValueChange={(value) => handleUpdateSettings('textSpeed', value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                调整对话文字的显示速度，1为最慢，10为最快
              </p>
            </div>

            {/* 自动播放 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  自动播放
                </Label>
                <p className="text-xs text-muted-foreground">
                  自动播放对话
                </p>
              </div>
              <Switch
                checked={settings.autoPlay}
                onCheckedChange={(value) => handleUpdateSettings('autoPlay', value)}
              />
            </div>

            {/* 自动播放延迟 */}
            {settings.autoPlay && (
              <div className="space-y-3 ml-6">
                <div className="flex items-center justify-between">
                  <Label>自动播放延迟</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.autoPlayDelay / 1000}秒
                  </span>
                </div>
                <Slider
                  value={[settings.autoPlayDelay]}
                  onValueChange={(value) => handleUpdateSettings('autoPlayDelay', value[0])}
                  min={1000}
                  max={10000}
                  step={500}
                  className="w-full"
                />
              </div>
            )}

            {/* 跳过已读 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>跳过已读</Label>
                <p className="text-xs text-muted-foreground">
                  跳过已经读过的对话
                </p>
              </div>
              <Switch
                checked={settings.skipSeen}
                onCheckedChange={(value) => handleUpdateSettings('skipSeen', value)}
              />
            </div>
          </TabsContent>

          {/* 显示设置 */}
          <TabsContent value="display" className="space-y-6 mt-6">
            {/* 字体大小 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  字体大小
                </Label>
                <span className="text-sm text-muted-foreground">
                  {settings.fontSize}px
                </span>
              </div>
              <Slider
                value={[settings.fontSize]}
                onValueChange={(value) => handleUpdateSettings('fontSize', value[0])}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            {/* 全屏 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>全屏模式</Label>
                <p className="text-xs text-muted-foreground">
                  以全屏模式运行游戏
                </p>
              </div>
              <Switch
                checked={settings.fullscreen}
                onCheckedChange={(value) => {
                  handleUpdateSettings('fullscreen', value);
                  if (value) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
              />
            </div>

            {/* 主题设置 */}
            <div className="space-y-3">
              <Label>主题模式</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="gap-2"
                >
                  <Sun className="h-4 w-4" />
                  白天
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="gap-2"
                >
                  <Moon className="h-4 w-4" />
                  黑暗
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                  className="gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  跟随系统
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* 音频设置 */}
          <TabsContent value="audio" className="space-y-6 mt-6">
            {/* 音效开关 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  {settings.soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                  音效
                </Label>
                <p className="text-xs text-muted-foreground">
                  游戏音效开关
                </p>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(value) => handleUpdateSettings('soundEnabled', value)}
              />
            </div>

            {/* 音效音量 */}
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label>音效音量</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.soundVolume}%
                </span>
              </div>
              <Slider
                value={[settings.soundVolume]}
                onValueChange={(value) => handleUpdateSettings('soundVolume', value[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* 音乐开关 */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  {settings.musicEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                  背景音乐
                </Label>
                <p className="text-xs text-muted-foreground">
                  游戏背景音乐开关
                </p>
              </div>
              <Switch
                checked={settings.musicEnabled}
                onCheckedChange={(value) => handleUpdateSettings('musicEnabled', value)}
              />
            </div>

            {/* 音乐音量 */}
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label>音乐音量</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.musicVolume}%
                </span>
              </div>
              <Slider
                value={[settings.musicVolume]}
                onValueChange={(value) => handleUpdateSettings('musicVolume', value[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
