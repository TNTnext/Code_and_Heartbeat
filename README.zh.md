<div align="center">
  <img src="https://img.shields.io/badge/Code_and_Heartbeat-视觉小说-blue?style=for-the-badge&logo=github" alt="项目徽章">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 徽章">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react" alt="React 徽章">
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript 徽章">
  <img src="https://img.shields.io/badge/许可证-MIT-green?style=for-the-badge" alt="许可证徽章">
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/TNTnext/Code_and_Heartbeat/main/public/logo.png" alt="Code and Heartbeat Logo" width="200" height="200">
  <h1>🎮 Code and Heartbeat</h1>
  <p><i>基于 Web 的视觉小说游戏</i></p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/状态-活跃-success?style=flat-square" alt="状态">
  <img src="https://img.shields.io/badge/版本-1.0.0-blue?style=flat-square" alt="版本">
  <img src="https://img.shields.io/badge/平台-Web-orange?style=flat-square" alt="平台">
</div>

---

## 📖 项目简介

**Code and Heartbeat** 是一款沉浸式的基于 Web 的视觉小说（Galgame）游戏，讲述了上海交大计算机专业新生与天才室友的温馨恋爱故事。游戏巧妙地将浪漫剧情与编程知识相结合，为玩家带来独特而精彩的游戏体验。

### 🎯 核心亮点

- **游戏类型**: 视觉小说 + 恋爱模拟
- **主题**: 校园生活、友情、爱情、编程
- **目标受众**: 喜欢视觉小说和编程的玩家
- **语言支持**: 中文 & 英文

---

## ✨ 核心功能

| 功能 | 描述 |
|---------|-------------|
| 💬 **对话系统** | 丰富的对话内容和角色互动 |
| ❤️ **好感度系统** | 玩家选择影响角色关系 |
| 🎭 **多结局** | 不同的选择导致不同的结局 |
| 💾 **存档系统** | 支持手动存档和自动保存 |
| ⚙️ **设置系统** | 可调整文本速度、音量等 |
| 💻 **编程知识** | 融入真实的编程概念和算法知识 |

---

## 🛠️ 技术栈

<div align="center">
  <img src="https://img.shields.io/badge/框架-Next.js_16-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/核心-React_19-61dafb?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/语言-TypeScript_5-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/UI-shadcn/ui-000000?style=for-the-badge" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/样式-Tailwind_CSS_4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/包管理器-pnpm-f69220?style=for-the-badge&logo=pnpm" alt="pnpm">
</div>

---

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: 18+
- **pnpm**: 9+

### 📦 安装依赖

```bash
pnpm install
```

### 🔥 启动开发服务器

```bash
pnpm dev
```

启动后，在浏览器中打开 [http://localhost:3000](http://localhost:3000) 开始游戏。

### 🏗️ 构建生产版本

```bash
pnpm build
```

### 🌐 启动生产服务器

```bash
pnpm start
```

---

## 📁 项目结构

```
Code_and_Heartbeat/
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

---

## 🎮 游戏玩法

1. **🎬 开始游戏**: 进入游戏后，点击「开始游戏」按钮开始你的故事
2. **📖 阅读对话**: 点击屏幕或按空格键推进对话
3. **🤔 做出选择**: 在出现选项时，选择你想要的回答
4. **❤️ 查看好感度**: 屏幕右上角会显示你与丁乐的好感度
5. **📋 使用菜单**: 按 ESC 键或点击菜单按钮打开游戏菜单
6. **💾 存档读档**: 在菜单中可以保存游戏进度或读取之前的存档
7. **⚙️ 调整设置**: 在设置面板中调整游戏的各种参数

---

## 👨‍💻 开发指南

### 📝 添加新剧情

1. 在 `src/lib/game/data.ts` 中添加新场景
2. 确保每个场景有唯一的 `id`
3. 设置正确的 `nextSceneId` 或 `choices`
4. 使用 `SCENE_MAP` 确保场景可被访问

### 🎯 添加新选项

1. 在场景的 `choices` 数组中添加选项
2. 设置 `affinityChange` 影响好感度
3. 使用 `addFlags` 添加标记，用于条件判断

### 🎨 修改 UI

1. 所有 UI 组件使用 shadcn/ui
2. 遵循主题配色（使用 `bg-background`, `text-foreground` 等语义化类名）
3. 使用 Tailwind CSS 进行样式定制

---

## 📦 包管理规范

<div align="center">
  <img src="https://img.shields.io/badge/包管理器-仅使用pnpm-f69220?style=for-the-badge&logo=pnpm" alt="仅使用 pnpm">
</div>

**⚠️ 仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

---

## ⚠️ 注意事项

1. **Hydration 错误预防**：严禁在 JSX 渲染逻辑中直接使用 `typeof window`、`Date.now()` 等动态数据。必须使用 `'use client'` 并配合 `useEffect` + `useState`。
2. **主题一致性**：使用语义化的 Tailwind 类名（`bg-background`, `text-foreground`），避免硬编码颜色。
3. **TypeScript 严格模式**：所有函数参数必须标注类型，禁止隐式 any。

---

## 🤝 贡献指南

欢迎对游戏进行贡献！如果你有任何建议或想要添加新内容，请：

1. 🍴 Fork 本仓库
2. 🌿 创建一个新分支
3. 💻 做出你的修改
4. 📤 提交 Pull Request

---

## 📄 许可证

<div align="center">
  <img src="https://img.shields.io/badge/许可证-MIT-green?style=for-the-badge" alt="MIT 许可证">
</div>

本项目采用 MIT 许可证。

---

## 👤 作者

<div align="center">
  <h3>🎮 Tnt_next</h3>
  <p>游戏开发者 & 内容创作者</p>
  
  <a href="https://space.bilibili.com/3546659195718047" target="_blank">
    <img src="https://img.shields.io/badge/Bilibili-@Tnt_next-ff69b4?style=for-the-badge&logo=bilibili" alt="Bilibili">
  </a>
  
  <p>📺 访问我的 B 站频道查看更多内容！</p>
</div>

---

## 📞 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 📧 邮箱：cyy_zdwxx@163.com
- 🐙 GitHub：[https://github.com/TNTnext](https://github.com/TNTnext)
- 📺 Bilibili：[https://space.bilibili.com/3546659195718047](https://space.bilibili.com/3546659195718047)

---

## 🤖 AI 开发

<div align="center">
  <img src="https://img.shields.io/badge/开发方式-AI辅助-purple?style=for-the-badge&logo=artificial-intelligence" alt="AI 开发">
</div>

<div align="center">
  <p><i>本项目在 AI 技术的辅助下开发完成。</i></p>
  <p>游戏代码、文档和创意元素均使用先进的 AI 工具生成和增强，结合人类创造力与人工智能，打造引人入胜的游戏体验。</p>
</div>

---

## 🌍 语言

<div align="center">
  <a href="README.md">
    <img src="https://img.shields.io/badge/🇬🇧-English-blue?style=flat-square" alt="English">
  </a>
  <a href="README.zh.md">
    <img src="https://img.shields.io/badge/🇨🇳-中文-red?style=flat-square" alt="中文">
  </a>
</div>

---

<div align="center">
  <p><i>由 Tnt_next & AI 用 ❤️ 制作</i></p>
  <p>⭐ 如果喜欢这个项目，请给个 Star！⭐</p>
</div>