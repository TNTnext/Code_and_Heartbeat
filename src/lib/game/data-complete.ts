import { Character, Scene, Ending } from './types';

// 角色定义
export const CHARACTERS: Character[] = [
  {
    id: 'player',
    name: '我',
    displayName: '我',
    description: '上海交通大学计算机科学与技术专业新生',
  },
  {
    id: 'dingle',
    name: '丁乐',
    displayName: '丁乐',
    description: '你的室友，来自江苏太仓的OI金牌选手',
    avatar: '/dingle-normal.jpg',
  },
  {
    id: 'narrator',
    name: '旁白',
    displayName: '旁白',
  },
];

// 开篇场景
export const START_SCENE_ID = 'intro_1';

// 结局定义
export const ENDINGS: Ending[] = [
  {
    id: 'true_love',
    title: '永恒的代码',
    description: '你们一起走过了大学四年，在ICPC赛场上并肩作战，也在生活中相互温暖。丁乐不仅是最强队友，更是你最珍视的人。',
    condition: (state) => state.affinity >= 90 && state.flags.has('confessed'),
  },
  {
    id: 'close_friends',
    title: '挚友相伴',
    description: '你们是最好的室友和朋友，彼此信任，相互支持。虽然没有跨出那一步，但这份友谊同样珍贵。',
    condition: (state) => state.affinity >= 70 && state.affinity < 90,
  },
  {
    id: 'good_teammates',
    title: '默契搭档',
    description: '你们是优秀的编程搭档，在竞技赛场上配合无间。生活中保持着恰当的距离，但友谊长存。',
    condition: (state) => state.affinity >= 40 && state.affinity < 70,
  },
  {
    id: 'strangers',
    title: '渐行渐远',
    description: '你们只是普通的室友，生活轨迹渐渐分叉。',
    condition: (state) => state.affinity >= 20 && state.affinity < 40,
  },
  {
    id: 'bad',
    title: '错过',
    description: '你们之间的距离越来越远，最终成了住在同一个房间的陌生人。',
    condition: (state) => state.affinity < 20,
  },
];

// 角色立绘映射
export const CHARACTER_SPRITES: Record<string, Record<string, string>> = {
  dingle: {
    normal: '/dingle-normal.jpg',
    shy: '/dingle-shy.jpg',
    happy: '/dingle-happy.jpg',
    focused: '/dingle-focused.jpg',
    sad: '/dingle-sad.jpg',
    angry: '/dingle-angry.jpg',
    tsundere: '/dingle-tsundere.jpg',
    reading: '/dingle-reading.jpg',
  },
};

// 背景映射
export const BACKGROUND_IMAGES: Record<string, string> = {
  dorm: '/bg-dorm.jpg',
  classroom: '/bg-classroom.jpg',
  night: '/bg-night.jpg',
};

// 完整的场景数据
export const SCENES: Scene[] = [];
