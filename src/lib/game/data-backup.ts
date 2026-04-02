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

// 场景数据
export const SCENES: Scene[] = [
  {
    id: 'title_screen',
    title: '标题画面',
    dialogue: [],
    autoNext: false,
  },
  {
    id: 'intro_1',
    title: '初次相遇',
    background: '/bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '2032年9月，上海闵行。秋日的微风带着桂花的香气，我拖着行李箱走进东下院3号楼。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '计算机科学与技术专业，大一新生。推开门的那一刻，宿舍里已经有人了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '一个纤细的背影坐在桌前，正在笔记本电脑上飞快地敲击着什么。屏幕的蓝光映在TA脸上，柔和而专注。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'TA穿着一件白色的连衣裙，长发随意地垂在肩上。听到开门声，TA转过身来。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我愣住了——那是一张非常精致的脸庞，清秀、美丽，睫毛长而卷曲，嘴唇微微上扬。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'TA的双手纤细白皙，手指修长，完全没有长期敲代码应该留下的老茧。双手交叠在身前，优雅而柔美。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '你好？你是新来的室友吧？我是丁乐，来自江苏太仓。',
        emotion: 'shy',
        expression: '温柔地微笑着，声音轻柔',
      },
      {
        speaker: 'narrator',
        text: 'TA的声音很轻，带着一丝江南口音的软糯。我看着TA，一时之间不知道该说什么。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '等等...这么精致的外表，这么温柔的声音，还有...',
        emotion: 'normal',
      },
      {
        speaker: 'player',
        text: '你好。你是女生吗？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '啊...不是，我是男生。',
        emotion: 'blush',
        expression: '脸微微泛红，眼神躲闪',
      },
      {
        speaker: 'dingle',
        text: '抱歉让你困惑了。我从小就...比较喜欢打扮成这样。',
        emotion: 'shy',
      },
      {
        speaker: 'narrator',
        text: 'TA低下头，手指不安地绞在一起。我看到TA穿着白丝的双腿交叠着，纤细而柔美。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '桌上摆着一台MacBook，旁边是几本厚厚的算法书——《算法导论》、《挑战程序设计竞赛》...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '还有几张奖状和证书：CSP-S一等奖、NOIP一等奖、NOI金牌、APIO银奖和金奖...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我的天，这些都是在2029到2032年间获得的...那TA从初中就开始参加竞赛了？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '那个...如果不介意的话，我可以给你介绍介绍这些竞赛。',
        emotion: 'shy',
        expression: '期待地看着我',
      },
    ],
    choices: [
      {
        id: 'intro_1_choice_1',
        text: '表示很感兴趣，想听听他的经历',
        nextSceneId: 'intro_2a',
        affinityChange: 10,
      },
      {
        id: 'intro_1_choice_2',
        text: '礼貌地点头，开始收拾自己的行李',
        nextSceneId: 'intro_2b',
        affinityChange: 0,
      },
      {
        id: 'intro_1_choice_3',
        text: '好奇地问TA为什么喜欢这样打扮',
        nextSceneId: 'intro_2c',
        affinityChange: 5,
      },
    ],
  },
  {
    id: 'intro_2a',
    title: '共同的话题',
    dialogue: [
      {
        speaker: 'player',
        text: '哇，你也参加竞赛吗？这些奖项都好厉害！能给我讲讲吗？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '嗯！我很愿意分享。',
        emotion: 'happy',
        expression: '眼睛亮了起来，嘴角上扬',
      },
      {
        speaker: 'dingle',
        text: '我第一次参加竞赛是在初二，那时候拿了个CSP-S二等奖，之后就一直坚持下来。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '2029年高三的时候拿到了CSP-S一等奖，同年还拿到了NOIP一等奖。那时候感觉自己找到了真正热爱的东西。',
        emotion: 'happy',
      },
      {
        speaker: 'dingle',
        text: '然后就是NOI...那一年的经历真的很难忘。集训、模拟赛、压力、兴奋...所有的一切都像做梦一样。',
        emotion: 'focused',
        expression: '眼神专注，带着回忆的神情',
      },
      {
        speaker: 'player',
        text: '那你是怎么保持这么好的成绩的？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '其实...也没什么特别的。就是每天练习，遇到问题就钻研，不懂的就问。',
        emotion: 'shy',
      },
      {
        speaker: 'dingle',
        text: '哦对了，还有一点——我喜欢在安静的环境里学习，所以可能会比较少说话。',
        emotion: 'normal',
        expression: '微笑着说，但眼神里透露出一丝调皮',
      },
      {
        speaker: 'narrator',
        text: '我看着TA，突然发现TA并没有表面上看起来那么内向。TA的眼睛里闪着兴奋的光芒，说话时整个人都充满了活力。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '看来TA看上去内向，实际上是个很外向的人呢。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '其实我话挺多的，只是刚开始可能会有点害羞。',
        emotion: 'happy',
        expression: '调皮地眨了眨眼睛',
      },
      {
        speaker: 'player',
        text: '哈哈，那我以后可要小心了，别被你烦死。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '哪有！我保证不会的...除非你愿意听我讲代码。',
        emotion: 'happy',
      },
    ],
    autoNext: true,
    nextSceneId: 'intro_3',
  },
  {
    id: 'intro_2b',
    title: '礼貌的疏离',
    dialogue: [
      {
        speaker: 'player',
        text: '哦...好的，我知道了。那我先收拾一下东西。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我礼貌地点点头，开始把行李箱里的东西搬出来。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '宿舍里的空气变得有些凝重。丁乐转过身，继续盯着屏幕，但我能感觉到TA的背影有些僵硬。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '键盘声变得断断续续，像是在犹豫着什么。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '...那个，如果你对竞赛感兴趣的话，以后可以来问我。',
        emotion: 'shy',
      },
      {
        speaker: 'player',
        text: '谢谢，我会考虑的。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我停下手中的动作，看了看TA。那个瘦小的背影，在台灯的光晕下显得格外孤独。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'TA似乎想和我说话，但又不知道该怎么开口。我叹了口气，决定先打破这份沉默。',
        emotion: 'normal',
      },
      {
        speaker: 'player',
        text: '对了，我是计科的新生，你也学计科吗？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '嗯！我也是计科的。看来我们会是同班同学呢。',
        emotion: 'happy',
        expression: '转过身来，露出惊喜的表情',
      },
    ],
    autoNext: true,
    nextSceneId: 'intro_3',
  },
  {
    id: 'intro_2c',
    title: '坦诚的交流',
    dialogue: [
      {
        speaker: 'player',
        text: '可以问问...为什么喜欢这样打扮吗？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '嗯...其实我也不是一开始就这样。',
        emotion: 'shy',
      },
      {
        speaker: 'dingle',
        text: '小时候我不太理解为什么男生和女生要穿不同的衣服。我觉得好看的衣服就应该可以穿。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '后来慢慢发现，自己确实更喜欢女装。穿着的时候感觉更自在、更舒服。',
        emotion: 'shy',
      },
      {
        speaker: 'dingle',
        text: '父母一开始也不理解，但后来看到我在竞赛方面的成绩，也就慢慢接受了。',
        emotion: 'normal',
      },
      {
        speaker: 'player',
        text: '那学校里的人呢？他们怎么看？',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '一开始确实有些人觉得奇怪。但是后来他们发现我成绩很好，而且人也还好，就慢慢接受我了。',
        emotion: 'happy',
      },
      {
        speaker: 'dingle',
        text: '其实大部分时候，大家更在意的是你的能力和人品，而不是你穿什么衣服。',
        emotion: 'normal',
      },
      {
        speaker: 'player',
        text: '你说得对。我觉得你很勇敢。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '啊？勇敢吗？',
        emotion: 'shy',
        expression: '惊讶地看着我，然后害羞地笑了',
      },
      {
        speaker: 'player',
        text: '嗯。能够坚持做自己，这本身就很勇敢。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '谢谢...从来没有人这么说过。',
        emotion: 'shy',
        expression: '脸红了，但眼睛里闪着光',
      },
    ],
    autoNext: true,
    nextSceneId: 'intro_3',
  },
  {
    id: 'intro_3',
    title: '共同的未来',
    dialogue: [
      {
        speaker: 'narrator',
        text: '收拾完行李后，我坐在自己的书桌前，环顾这个未来的"家"。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '宿舍不大，两个床位，两个书桌，一个阳台。墙上贴着上届学长留下的海报——"ACM-ICPC World Finals"。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '对了，你是计科的新生...那你对算法竞赛感兴趣吗？',
        emotion: 'shy',
      },
      {
        speaker: 'player',
        text: '我？嗯，有一点兴趣。我听说过ICPC，但还没真正参加过。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '那...要不要一起？我正在备战ICPC，可以带你入门。',
        emotion: 'shy',
        expression: '眼神期待地看着我',
      },
      {
        speaker: 'dingle',
        text: '我拿了NOI金牌之后也在寻找队友...如果可以的话，我想和你组队。',
        emotion: 'happy',
      },
      {
        speaker: 'narrator',
        text: 'TA的声音越来越小，最后几乎是在自言自语。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '当然，如果你不愿意的话...',
        emotion: 'sad',
      },
    ],
    choices: [
      {
        id: 'intro_3_choice_1',
        text: '当然愿意！我也想好好学习算法',
        nextSceneId: 'chapter1_start',
        affinityChange: 10,
        addFlags: ['joined_icpc'],
      },
      {
        id: 'intro_3_choice_2',
        text: '可以试试看，但我基础可能不太好',
        nextSceneId: 'chapter1_start',
        affinityChange: 5,
        addFlags: ['joined_icpc'],
      },
      {
        id: 'intro_3_choice_3',
        text: '抱歉，我还有其他打算',
        nextSceneId: 'chapter1_start',
        affinityChange: -10,
      },
    ],
  },
  {
    id: 'chapter1_start',
    title: '第一章的开始',
    dialogue: [
      {
        speaker: 'narrator',
        text: '就这样，我在上海交大的生活开始了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '每天早上六点半起床，去食堂吃早饭，然后去上课。晚上回到宿舍，丁乐已经坐在桌前写代码了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '台灯的光在TA的睫毛上跳跃，键盘声在安静的宿舍里回响。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '有时候我会看着TA的背影出神——那样专注，那样美丽，又那样让人心动...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '丁乐真的很有天赋。不仅代码写得快，思路也清晰，经常能一针见血地指出问题的关键。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '更重要的是，TA从不吝啬分享自己的知识。每次我问TA问题，TA都会耐心地讲解，直到我完全理解。',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'chapter1_1',
  },
  {
    id: 'ending_demo',
    title: '演示结束',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【演示版本到此结束】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '感谢您的体验！这是一个游戏框架演示，完整版本将包含更多章节、分支选择和结局。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '当前好感度：',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '您可以继续探索设置功能、存档系统等。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'restart',
        text: '返回标题',
        nextSceneId: 'title_screen',
        affinityChange: 0,
      },
    ],
  },
];

// 场景映射（快速查找）
export const SCENE_MAP: Record<string, Scene> = {};
SCENES.forEach(scene => {
  SCENE_MAP[scene.id] = scene;
});
