<div align="center">
  <h1>Code and Heartbeat</h1>
  <p>视觉小说游戏 / Visual Novel Game</p>
  <div>
    <a href="#中文文档" style="margin-right: 20px;">中文</a>
    <a href="#english-documentation">English</a>
  </div>
</div>

---

## 中文文档

### 项目简介

Code and Heartbeat 是一款基于 Web 的视觉小说（Galgame）游戏，讲述上海交大计算机专业新生与天才室友的恋爱故事。游戏融合了浪漫剧情与编程知识，为玩家带来独特的体验。

- **游戏类型**: 视觉小说 + 恋爱模拟
- **主题**: 校园、友情、爱情、编程
- **目标受众**: 喜欢视觉小说和编程的玩家

### 核心功能

- **对话系统**: 丰富的对话内容和角色互动
- **好感度系统**: 根据玩家选择影响角色关系
- **多结局**: 不同的选择会导致不同的结局
- **存档系统**: 支持手动存档和自动保存
- **设置系统**: 可调整文本速度、音量等
- **编程知识**: 融入了真实的编程概念和算法知识

### 技术栈

- **框架**: Next.js 16 (App Router)
- **核心**: React 19
- **语言**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS 4
- **包管理器**: pnpm

### 快速开始

#### 环境要求

- Node.js 18+
- pnpm 9+

#### 安装依赖

```bash
pnpm install
```

#### 启动开发服务器

```bash
pnpm dev
```

启动后，在浏览器中打开 [http://localhost:3000](http://localhost:3000) 开始游戏。

#### 构建生产版本

```bash
pnpm build
```

#### 启动生产服务器

```bash
pnpm start
```

### 项目结构

```
├── public/                 # 静态资源（图片、音频等）
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 主页面（游戏入口）
│   │   └── globals.css     # 全局样式
│   ├── components/         # React 组件
│   │   ├── ui/             # Shadcn UI 组件库
│   │   └── game/           # 游戏组件
│   │       ├── GameScreen.tsx      # 主游戏界面
│   │       ├── DialogueBox.tsx     # 对话框
│   │       ├── ChoiceCard.tsx      # 选项卡片
│   │       ├── AffinityDisplay.tsx # 好感度显示
│   │       ├── GameMenu.tsx        # 游戏菜单
│   │       ├── SettingsPanel.tsx   # 设置面板
│   │       └── SaveLoadPanel.tsx   # 存档/读档面板
│   ├── contexts/           # React Context
│   │   └── GameContext.tsx # 游戏全局状态管理
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   ├── game/           # 游戏核心逻辑
│   │   │   ├── types.ts    # 类型定义
│   │   │   ├── data.ts     # 游戏数据（场景、角色、结局）
│   │   │   ├── saveSystem.ts   # 存档系统
│   │   │   ├── affinity.ts     # 好感度系统
│   │   │   └── settings.ts     # 游戏设置
│   │   └── utils.ts        # 通用工具函数
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

### 游戏玩法

1. **开始游戏**: 进入游戏后，点击「开始游戏」按钮开始你的故事
2. **阅读对话**: 点击屏幕或按空格键推进对话
3. **做出选择**: 在出现选项时，选择你想要的回答
4. **查看好感度**: 屏幕右上角会显示你与丁乐的好感度
5. **使用菜单**: 按 ESC 键或点击菜单按钮打开游戏菜单
6. **存档读档**: 在菜单中可以保存游戏进度或读取之前的存档
7. **调整设置**: 在设置面板中调整游戏的各种参数

### 开发指南

#### 添加新剧情

1. 在 `src/lib/game/data.ts` 中添加新场景
2. 确保每个场景有唯一的 `id`
3. 设置正确的 `nextSceneId` 或 `choices`
4. 使用 `SCENE_MAP` 确保场景可被访问

#### 添加新选项

1. 在场景的 `choices` 数组中添加选项
2. 设置 `affinityChange` 影响好感度
3. 使用 `addFlags` 添加标记，用于条件判断

#### 修改 UI

1. 所有 UI 组件使用 shadcn/ui
2. 遵循主题配色（使用 `bg-background`, `text-foreground` 等语义化类名）
3. 使用 Tailwind CSS 进行样式定制

### 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

### 注意事项

1. **Hydration 错误预防**：严禁在 JSX 渲染逻辑中直接使用 `typeof window`、`Date.now()` 等动态数据。必须使用 `'use client'` 并配合 `useEffect` + `useState`。
2. **主题一致性**：使用语义化的 Tailwind 类名（`bg-background`, `text-foreground`），避免硬编码颜色。
3. **TypeScript 严格模式**：所有函数参数必须标注类型，禁止隐式 any。

### 贡献指南

欢迎对游戏进行贡献！如果你有任何建议或想要添加新内容，请：

1. Fork 本仓库
2. 创建一个新分支
3. 做出你的修改
4. 提交 Pull Request

### 许可证

MIT License

### 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 邮箱：contact@codeandheartbeat.com
- GitHub：[https://github.com/codeandheartbeat](https://github.com/codeandheartbeat)

---

## English Documentation

### Project Introduction

Code and Heartbeat is a web-based visual novel (Galgame) that tells the story of a freshman computer science student at Shanghai Jiao Tong University and their genius roommate. The game combines romantic storytelling with programming knowledge to create a unique experience for players.

- **Game Type**: Visual Novel + Romance Simulation
- **Themes**: Campus life, friendship, love, programming
- **Target Audience**: Players who enjoy visual novels and programming

### Core Features

- **Dialogue System**: Rich dialogue content and character interactions
- **Affinity System**: Player choices affect character relationships
- **Multiple Endings**: Different choices lead to different outcomes
- **Save System**: Supports manual saving and auto-saving
- **Settings System**: Adjustable text speed, volume, etc.
- **Programming Knowledge**: Integrates real programming concepts and algorithm knowledge

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

### Quick Start

#### Environment Requirements

- Node.js 18+
- pnpm 9+

#### Install Dependencies

```bash
pnpm install
```

#### Start Development Server

```bash
pnpm dev
```

After starting, open [http://localhost:3000](http://localhost:3000) in your browser to start the game.

#### Build Production Version

```bash
pnpm build
```

#### Start Production Server

```bash
pnpm start
```

### Project Structure

```
├── public/                 # Static resources (images, audio, etc.)
├── scripts/                # Build and start scripts
├── src/
│   ├── app/                # Page routes and layout
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page (game entry)
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/             # Shadcn UI component library
│   │   └── game/           # Game components
│   │       ├── GameScreen.tsx      # Main game interface
│   │       ├── DialogueBox.tsx     # Dialogue box
│   │       ├── ChoiceCard.tsx      # Choice cards
│   │       ├── AffinityDisplay.tsx # Affinity display
│   │       ├── GameMenu.tsx        # Game menu
│   │       ├── SettingsPanel.tsx   # Settings panel
│   │       └── SaveLoadPanel.tsx   # Save/load panel
│   ├── contexts/           # React Context
│   │   └── GameContext.tsx # Global game state management
│   ├── hooks/              # Custom Hooks
│   ├── lib/                # Utility library
│   │   ├── game/           # Game core logic
│   │   │   ├── types.ts    # Type definitions
│   │   │   ├── data.ts     # Game data (scenes, characters, endings)
│   │   │   ├── saveSystem.ts   # Save system
│   │   │   ├── affinity.ts     # Affinity system
│   │   │   └── settings.ts     # Game settings
│   │   └── utils.ts        # General utility functions
│   └── server.ts           # Custom server entry
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependency management
└── tsconfig.json           # TypeScript configuration
```

### Gameplay

1. **Start Game**: After entering the game, click the "Start Game" button to begin your story
2. **Read Dialogue**: Click the screen or press space to advance dialogue
3. **Make Choices**: When options appear, select the response you want
4. **Check Affinity**: The top right corner of the screen shows your affinity with Ding Le
5. **Use Menu**: Press ESC or click the menu button to open the game menu
6. **Save/Load**: In the menu, you can save your progress or load previous saves
7. **Adjust Settings**: In the settings panel, adjust various game parameters

### Development Guide

#### Adding New Story Content

1. Add new scenes in `src/lib/game/data.ts`
2. Ensure each scene has a unique `id`
3. Set the correct `nextSceneId` or `choices`
4. Use `SCENE_MAP` to ensure scenes are accessible

#### Adding New Choices

1. Add options to the scene's `choices` array
2. Set `affinityChange` to affect affinity
3. Use `addFlags` to add markers for condition checking

#### Modifying UI

1. All UI components use shadcn/ui
2. Follow theme color scheme (use semantic class names like `bg-background`, `text-foreground`)
3. Use Tailwind CSS for style customization

### Package Management Guidelines

**Only use pnpm** as the package manager, **do not use npm or yarn**.

**Common commands**:
- Install dependencies: `pnpm add <package>`
- Install dev dependencies: `pnpm add -D <package>`
- Install all dependencies: `pnpm install`
- Remove dependencies: `pnpm remove <package>`

### Notes

1. **Hydration Error Prevention**: Do not directly use dynamic data like `typeof window` or `Date.now()` in JSX rendering logic. Must use `'use client'` with `useEffect` + `useState`.
2. **Theme Consistency**: Use semantic Tailwind class names (`bg-background`, `text-foreground`), avoid hard-coded colors.
3. **TypeScript Strict Mode**: All function parameters must be typed, no implicit any.

### Contribution Guide

Welcome to contribute to the game! If you have any suggestions or want to add new content, please:

1. Fork this repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

### License

MIT License

### Contact

If you have any questions or suggestions, please contact us through:

- Email: contact@codeandheartbeat.com
- GitHub: [https://github.com/codeandheartbeat](https://github.com/codeandheartbeat)
