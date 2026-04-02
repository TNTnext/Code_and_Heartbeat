<div align="center">
  <h1>Code and Heartbeat</h1>
  <p>游戏代理系统 / Game Agent System</p>
  <div>
    <a href="#中文文档" style="margin-right: 20px;">中文</a>
    <a href="#english-documentation">English</a>
  </div>
</div>

---

## 中文文档

### 项目概述

Code and Heartbeat 是一款基于 Web 的视觉小说（Galgame）游戏，讲述上海交大计算机专业新生与天才室友的恋爱故事。本文件详细介绍游戏的代理系统，包括如何使用 AI 代理增强游戏体验。

### 代理系统架构

#### 核心代理类型

1. **游戏引擎代理**
   - 负责游戏状态管理
   - 处理场景切换和对话流程
   - 管理玩家选择和好感度变化

2. **对话代理**
   - 生成符合角色性格的对话内容
   - 响应用户输入并提供合理的回复
   - 支持多轮对话交互

3. **剧情生成代理**
   - 根据玩家选择生成新的剧情分支
   - 保持剧情的连贯性和逻辑性
   - 适应不同的游戏进度和好感度状态

4. **角色代理**
   - 模拟角色的情感和行为
   - 根据好感度变化调整角色态度
   - 提供个性化的角色互动体验

### 代理实现

#### 游戏引擎代理

**文件**: `src/contexts/GameContext.tsx`

```typescript
// 核心游戏状态管理
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 游戏状态管理
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueLine | null>(null);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  
  // 其他状态和方法...
};
```

#### 对话代理

**文件**: `src/lib/game/data.ts`

```typescript
// 对话数据结构
export interface DialogueLine {
  speaker: string;
  text: string;
  emotion?: string;
  expression?: string;
}

// 场景数据结构
export interface Scene {
  id: string;
  title: string;
  background?: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  autoNext?: boolean;
  nextSceneId?: string;
}
```

#### 剧情生成代理

**文件**: `src/lib/game/data.ts`

```typescript
// 选项数据结构
export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  affinityChange?: number;
  addFlags?: string[];
}

// 场景映射
export const SCENE_MAP: Record<string, Scene> = SCENES.reduce(
  (map, scene) => {
    map[scene.id] = scene;
    return map;
  },
  {} as Record<string, Scene>
);
```

#### 角色代理

**文件**: `src/lib/game/affinity.ts`

```typescript
// 好感度变化计算
export function applyAffinityChange(state: GameState, change: number): GameState {
  let newAffinity = state.affinity + change;
  // 确保好感度在合理范围内
  newAffinity = Math.max(0, Math.min(100, newAffinity));
  return { ...state, affinity: newAffinity };
}

// 好感度等级描述
export function getAffinityDescription(affinity: number): string {
  if (affinity >= 90) return "亲密无间";
  if (affinity >= 70) return "关系密切";
  if (affinity >= 50) return "友好";
  if (affinity >= 30) return "普通";
  if (affinity >= 10) return "生疏";
  return "形同陌路";
}
```

### 代理交互流程

1. **初始化**
   - 游戏加载时初始化游戏引擎代理
   - 加载存档数据（如果有）
   - 进入标题画面或继续游戏

2. **对话流程**
   - 游戏引擎代理加载当前场景
   - 对话代理显示角色对话
   - 玩家点击屏幕推进对话
   - 重复直到对话结束

3. **选项处理**
   - 显示选项卡片
   - 玩家选择一个选项
   - 角色代理计算好感度变化
   - 游戏引擎代理更新游戏状态
   - 剧情生成代理确定下一个场景

4. **结局判定**
   - 当到达结局场景时
   - 游戏引擎代理检查当前游戏状态
   - 根据好感度和标记确定结局
   - 显示结局画面

### 代理扩展

#### 添加新的代理功能

1. **情感分析代理**
   - 分析玩家选择的情感倾向
   - 调整角色的情感反应
   - 提供更个性化的游戏体验

2. **内容推荐代理**
   - 根据玩家的游戏风格推荐剧情分支
   - 提供个性化的游戏建议
   - 增强游戏的重玩价值

3. **多语言代理**
   - 支持多语言对话
   - 自动翻译游戏内容
   - 适应不同地区的玩家

#### 代理配置

**文件**: `src/lib/game/settings.ts`

```typescript
// 游戏设置接口
export interface GameSettings {
  textSpeed: 'slow' | 'medium' | 'fast';
  musicVolume: number;
  sfxVolume: number;
  autoSave: boolean;
  showAffinity: boolean;
  language: 'zh' | 'en';
  // 代理相关设置
  enableAI: boolean;
  aiDifficulty: 'easy' | 'normal' | 'hard';
}

// 默认设置
export const defaultSettings: GameSettings = {
  textSpeed: 'medium',
  musicVolume: 0.7,
  sfxVolume: 0.8,
  autoSave: true,
  showAffinity: true,
  language: 'zh',
  enableAI: true,
  aiDifficulty: 'normal',
};
```

### 开发指南

#### 代理开发规范

1. **模块化设计**
   - 将代理功能拆分为独立模块
   - 保持代码的可维护性和可扩展性

2. **类型安全**
   - 使用 TypeScript 类型定义确保类型安全
   - 为所有代理接口添加类型注解

3. **性能优化**
   - 避免不必要的计算和渲染
   - 使用 React.memo 和 useCallback 优化组件性能

4. **错误处理**
   - 为所有异步操作添加错误处理
   - 确保游戏在遇到错误时能够优雅降级

#### 测试指南

1. **单元测试**
   - 为每个代理功能编写单元测试
   - 确保代理行为符合预期

2. **集成测试**
   - 测试代理之间的交互
   - 确保整个游戏流程正常运行

3. **性能测试**
   - 测试游戏在不同设备上的性能
   - 优化代理的运行效率

### 部署指南

#### 本地开发

```bash
pnpm install
pnpm dev
```

#### 构建生产版本

```bash
pnpm build
```

#### 部署到服务器

1. 构建生产版本
2. 将构建产物上传到服务器
3. 配置服务器环境
4. 启动生产服务

### 监控与维护

#### 代理监控

- 监控游戏代理的运行状态
- 收集玩家行为数据
- 分析游戏平衡性和玩家体验

#### 常见问题排查

1. **游戏卡顿**
   - 检查代理的计算复杂度
   - 优化渲染性能
   - 减少不必要的状态更新

2. **剧情分支错误**
   - 检查场景映射和选项配置
   - 确保剧情逻辑的一致性

3. **好感度计算错误**
   - 检查好感度变化的计算逻辑
   - 确保好感度在合理范围内

### 未来计划

1. **增强 AI 代理**
   - 集成更先进的自然语言处理模型
   - 实现更智能的对话生成
   - 提供更个性化的游戏体验

2. **多平台支持**
   - 适配移动设备
   - 支持离线游戏
   - 提供跨平台存档同步

3. **社区功能**
   - 支持玩家创建自定义剧情
   - 提供剧情分享和评分系统
   - 构建游戏社区

### 结论

游戏代理系统是 Code and Heartbeat 的核心组件，它通过智能的代理交互为玩家提供沉浸式的游戏体验。随着技术的不断发展，我们将继续增强代理系统的功能，为玩家带来更加丰富和个性化的游戏体验。

---

## English Documentation

### Project Overview

"Code and Heartbeat" is a web-based visual novel (Galgame) that tells the story of a freshman computer science student at Shanghai Jiao Tong University and their genius roommate. This document details the game's agent system, including how to use AI agents to enhance the gaming experience.

### Agent System Architecture

#### Core Agent Types

1. **Game Engine Agent**
   - Responsible for game state management
   - Handles scene transitions and dialogue flow
   - Manages player choices and affinity changes

2. **Dialogue Agent**
   - Generates dialogue content that matches character personalities
   - Responds to user input with reasonable replies
   - Supports multi-turn dialogue interactions

3. **Plot Generation Agent**
   - Generates new plot branches based on player choices
   - Maintains plot coherence and logic
   - Adapts to different game progress and affinity states

4. **Character Agent**
   - Simulates character emotions and behaviors
   - Adjusts character attitudes based on affinity changes
   - Provides personalized character interaction experiences

### Agent Implementation

#### Game Engine Agent

**File**: `src/contexts/GameContext.tsx`

```typescript
// Core game state management
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Game state management
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueLine | null>(null);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  
  // Other states and methods...
};
```

#### Dialogue Agent

**File**: `src/lib/game/data.ts`

```typescript
// Dialogue data structure
export interface DialogueLine {
  speaker: string;
  text: string;
  emotion?: string;
  expression?: string;
}

// Scene data structure
export interface Scene {
  id: string;
  title: string;
  background?: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  autoNext?: boolean;
  nextSceneId?: string;
}
```

#### Plot Generation Agent

**File**: `src/lib/game/data.ts`

```typescript
// Choice data structure
export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  affinityChange?: number;
  addFlags?: string[];
}

// Scene mapping
export const SCENE_MAP: Record<string, Scene> = SCENES.reduce(
  (map, scene) => {
    map[scene.id] = scene;
    return map;
  },
  {} as Record<string, Scene>
);
```

#### Character Agent

**File**: `src/lib/game/affinity.ts`

```typescript
// Affinity change calculation
export function applyAffinityChange(state: GameState, change: number): GameState {
  let newAffinity = state.affinity + change;
  // Ensure affinity stays within reasonable range
  newAffinity = Math.max(0, Math.min(100, newAffinity));
  return { ...state, affinity: newAffinity };
}

// Affinity level description
export function getAffinityDescription(affinity: number): string {
  if (affinity >= 90) return "Intimate";
  if (affinity >= 70) return "Close";
  if (affinity >= 50) return "Friendly";
  if (affinity >= 30) return "Normal";
  if (affinity >= 10) return "Acquaintance";
  return "Stranger";
}
```

### Agent Interaction Flow

1. **Initialization**
   - Initialize game engine agent when game loads
   - Load save data (if any)
   - Enter title screen or continue game

2. **Dialogue Flow**
   - Game engine agent loads current scene
   - Dialogue agent displays character dialogue
   - Player clicks screen to advance dialogue
   - Repeat until dialogue ends

3. **Choice Processing**
   - Display choice cards
   - Player selects an option
   - Character agent calculates affinity changes
   - Game engine agent updates game state
   - Plot generation agent determines next scene

4. **Ending Determination**
   - When reaching ending scene
   - Game engine agent checks current game state
   - Determine ending based on affinity and flags
   - Display ending screen

### Agent Extensions

#### Adding New Agent Features

1. **Emotion Analysis Agent**
   - Analyzes emotional tendencies of player choices
   - Adjusts character emotional responses
   - Provides more personalized gaming experience

2. **Content Recommendation Agent**
   - Recommends plot branches based on player's gaming style
   - Provides personalized game suggestions
   - Enhances game replay value

3. **Multi-language Agent**
   - Supports multi-language dialogue
   - Automatically translates game content
   - Adapts to players from different regions

#### Agent Configuration

**File**: `src/lib/game/settings.ts`

```typescript
// Game settings interface
export interface GameSettings {
  textSpeed: 'slow' | 'medium' | 'fast';
  musicVolume: number;
  sfxVolume: number;
  autoSave: boolean;
  showAffinity: boolean;
  language: 'zh' | 'en';
  // Agent-related settings
  enableAI: boolean;
  aiDifficulty: 'easy' | 'normal' | 'hard';
}

// Default settings
export const defaultSettings: GameSettings = {
  textSpeed: 'medium',
  musicVolume: 0.7,
  sfxVolume: 0.8,
  autoSave: true,
  showAffinity: true,
  language: 'zh',
  enableAI: true,
  aiDifficulty: 'normal',
};
```

### Development Guide

#### Agent Development Guidelines

1. **Modular Design**
   - Split agent functionality into independent modules
   - Maintain code maintainability and extensibility

2. **Type Safety**
   - Use TypeScript type definitions to ensure type safety
   - Add type annotations for all agent interfaces

3. **Performance Optimization**
   - Avoid unnecessary calculations and rendering
   - Use React.memo and useCallback to optimize component performance

4. **Error Handling**
   - Add error handling for all asynchronous operations
   - Ensure the game can gracefully degrade when errors occur

#### Testing Guide

1. **Unit Testing**
   - Write unit tests for each agent functionality
   - Ensure agent behavior meets expectations

2. **Integration Testing**
   - Test interactions between agents
   - Ensure the entire game flow works correctly

3. **Performance Testing**
   - Test game performance on different devices
   - Optimize agent runtime efficiency

### Deployment Guide

#### Local Development

```bash
pnpm install
pnpm dev
```

#### Build Production Version

```bash
pnpm build
```

#### Deploy to Server

1. Build production version
2. Upload build artifacts to server
3. Configure server environment
4. Start production service

### Monitoring and Maintenance

#### Agent Monitoring

- Monitor game agent runtime status
- Collect player behavior data
- Analyze game balance and player experience

#### Common Issue Troubleshooting

1. **Game Lag**
   - Check agent computational complexity
   - Optimize rendering performance
   - Reduce unnecessary state updates

2. **Plot Branch Errors**
   - Check scene mapping and option configuration
   - Ensure plot logic consistency

3. **Affinity Calculation Errors**
   - Check affinity change calculation logic
   - Ensure affinity stays within reasonable range

### Future Plans

1. **Enhanced AI Agents**
   - Integrate more advanced natural language processing models
   - Implement more intelligent dialogue generation
   - Provide more personalized gaming experiences

2. **Multi-platform Support**
   - Adapt to mobile devices
   - Support offline gaming
   - Provide cross-platform save synchronization

3. **Community Features**
   - Support player-created custom plots
   - Provide plot sharing and rating system
   - Build game community

### Conclusion

The game agent system is a core component of "Code and Heartbeat", providing players with an immersive gaming experience through intelligent agent interactions. As technology continues to develop, we will continue to enhance the agent system's functionality, bringing players richer and more personalized gaming experiences.
