'use client';

import React, { useState, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Save, FolderOpen, Download, Upload, Plus, FileDown, FileUp } from 'lucide-react';
import { downloadSaveFile, readSaveFile, validateSaveFile, formatSaveTime, getSaveDescription } from '@/lib/game/fileSaveSystem';
import { SaveSlot } from '@/lib/game/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface SaveLoadPanelProps {
  onClose: () => void;
}

export function SaveLoadPanel({ onClose }: SaveLoadPanelProps) {
  const { gameState, loadSave } = useGame();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 快速保存
  const handleQuickSave = () => {
    const name = `快速存档_${new Date().toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    downloadSaveFile(name, gameState);
    alert('存档已下载！');
    setShowSaveDialog(false);
    setSaveName('');
  };

  // 自定义保存
  const handleCustomSave = () => {
    if (!saveName.trim()) {
      alert('请输入存档名称');
      return;
    }

    downloadSaveFile(saveName.trim(), gameState);
    alert('存档已下载！');
    setShowSaveDialog(false);
    setSaveName('');
  };

  // 导入存档
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateSaveFile(file)) {
      alert('文件格式不正确');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setImporting(true);
    try {
      const importedSave = await readSaveFile(file);

      // 确认导入
      const description = getSaveDescription(importedSave);
      const confirmed = confirm(
        `是否读取此存档？\n\n${description}\n\n存档时间：${formatSaveTime(importedSave.createdAt)}`
      );

      if (confirmed) {
        loadSave(importedSave);
        onClose();
        alert('读取成功！');
      }
    } catch (error) {
      alert(`读取失败：${error}`);
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden p-6 bg-card/95 backdrop-blur-md shadow-2xl animate-in zoom-in duration-200">
          {/* 标题 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              存档 / 读档
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* 存档说明 */}
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground">
              💡 本游戏使用文件存档系统，存档文件会下载到您的设备中。请妥善保管存档文件，下次游戏时通过"导入存档"功能加载。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 保存区域 */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Save className="h-5 w-5" />
                保存进度
              </h3>
              <div className="space-y-2">
                <Button
                  className="w-full gap-2"
                  variant="default"
                  onClick={handleQuickSave}
                >
                  <FileDown className="h-5 w-5" />
                  快速存档
                </Button>
                <Button
                  className="w-full gap-2"
                  variant="outline"
                  onClick={() => setShowSaveDialog(true)}
                >
                  <Plus className="h-5 w-5" />
                  自定义存档
                </Button>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">当前场景</span>
                    <span className="font-medium">{gameState.currentSceneId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">好感度</span>
                    <span className="font-medium">{gameState.affinity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 读取区域 */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                读取进度
              </h3>
              <div className="space-y-2">
                <Button
                  className="w-full gap-2"
                  variant="default"
                  onClick={handleImportClick}
                  disabled={importing}
                >
                  <FileUp className="h-5 w-5" />
                  {importing ? '读取中...' : '导入存档'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportChange}
                  className="hidden"
                />
              </div>

              <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                <p>点击"导入存档"选择之前下载的存档文件</p>
              </div>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
            <p>📁 存档文件格式：.json</p>
            <p>🔒 存档保存在本地设备，不上传到服务器</p>
          </div>
        </Card>
      </div>

      {/* 自定义存档对话框 */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>自定义存档</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="save-name">存档名称</Label>
              <Input
                id="save-name"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="输入存档名称..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCustomSave();
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              取消
            </Button>
            <Button onClick={handleCustomSave}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
