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
        text: '桌上摆着一台MacBook，旁边是几本厚厚的算法书——《算法导论》、《挑战程序设计竞赛》、《算法竞赛入门经典》...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '还有几张奖状和证书：CCPC区域赛金牌、ICPC区域赛银牌、ACM-ICPC亚洲区预选赛一等奖...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我的天，这些都是在2029到2032年间获得的...那TA从高中就开始参加竞赛了？',
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
        text: '我第一次参加竞赛是在高一，那时候拿了个CCPC省赛三等奖，之后就一直坚持下来。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '2029年高三的时候拿到了CCPC区域赛银牌，同年还拿到了ICPC亚洲区预选赛一等奖。那时候感觉自己找到了真正热爱的东西。',
        emotion: 'happy',
      },
      {
        speaker: 'dingle',
        text: '然后就是ICPC区域赛...那一年的经历真的很难忘。集训、模拟赛、压力、兴奋...所有的一切都像做梦一样。',
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
        text: '我拿了CCPC区域赛金牌之后也在寻找队友...如果可以的话，我想和你组队。',
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
    id: 'chapter1_1',
    title: '大一上学期 - C++基础',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '时间飞逝，转眼就到了大一上学期期中。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '这一学期我们学了很多课程：C++程序设计、数据结构、离散数学...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '丁乐总是能轻松掌握这些知识，而我在有些科目上却感到吃力。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这道题要用变量和数据类型。int是整数，double是浮点数，bool是布尔值，char是字符。',
        emotion: 'focused',
        expression: '眼神专注地看着我',
      },
      {
        speaker: 'dingle',
        text: 'C++里还有引用和指针，引用是别名，指针是地址。int a = 10; int &ref = a; int *ptr = &a;',
        emotion: 'focused',
        expression: '耐心地讲解',
      },
      {
        speaker: 'dingle',
        text: '流程控制有三种：if-else条件判断，for循环，while循环。for最适合已知次数的循环。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '数组是连续的内存空间，int arr[100]; 数组下标从0开始，arr[0]到arr[99]。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '字符串可以用char数组或者string。string更方便，支持+连接，size()求长度，substr()截取。',
        emotion: 'happy',
        expression: '眼睛发亮',
      },
      {
        speaker: 'narrator',
        text: 'TA的声音很好听，复杂的C++语法在TA的口中变得如此清晰易懂。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我在TA的讲解下，慢慢地理解了那些原本晦涩的概念。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'chapter1_1_choice_1',
        text: '感谢TA的帮助，表示想请TA喝奶茶',
        nextSceneId: 'chapter1_2',
        affinityChange: 5,
      },
      {
        id: 'chapter1_1_choice_2',
        text: '礼貌地说谢谢，继续做题',
        nextSceneId: 'chapter1_2',
        affinityChange: 0,
      },
      {
        id: 'chapter1_1_choice_3',
        text: '开玩笑说：要是没有你我就挂科了',
        nextSceneId: 'chapter1_2',
        affinityChange: 8,
      },
    ],
  },
  {
    id: 'chapter1_2',
    title: '奶茶店偶遇 - 基础算法',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '周末的下午，我去学校附近的奶茶店买饮料。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '没想到，丁乐也在那里。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '好巧，你也在这里。',
        emotion: 'shy',
        expression: '有些害羞地打招呼',
      },
      {
        speaker: 'narrator',
        text: 'TA今天穿了一件淡粉色的连衣裙，看起来格外美丽。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我们点了奶茶，坐在窗边的位置聊天。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '其实...我也很喜欢这里的奶茶。',
        emotion: 'happy',
        expression: '微微一笑',
      },
      {
        speaker: 'dingle',
        text: '你知道吗？CSP-J考试里有四种基础算法：模拟、枚举、递归、排序。',
        emotion: 'focused',
        expression: '认真地讲解',
      },
      {
        speaker: 'dingle',
        text: '模拟就是按照题目要求一步步实现，比如模拟一个流程或者过程。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '枚举是尝试所有可能的解，找到符合条件的。适合数据范围小的情况，比如n≤1000。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '递归是函数调用自己，必须有递归出口和递归式。比如斐波那契数列：f(n)=f(n-1)+f(n-2)。',
        emotion: 'focused',
        expression: '眼睛发亮',
      },
      {
        speaker: 'dingle',
        text: '排序有选择排序、冒泡排序、插入排序，但C++里可以直接用sort()函数，基于快速排序。',
        emotion: 'happy',
        expression: '微笑着说',
      },
      {
        speaker: 'dingle',
        text: '函数可以重复使用代码，提高可读性。void表示无返回值，int返回整数。',
        emotion: 'focused',
        expression: '继续讲解',
      },
    ],
    choices: [
      {
        id: 'chapter1_2_choice_1',
        text: '主动问TA平时喜欢做什么',
        nextSceneId: 'chapter1_3',
        affinityChange: 5,
      },
      {
        id: 'chapter1_2_choice_2',
        text: '聊聊学习上的事情',
        nextSceneId: 'chapter1_3',
        affinityChange: 0,
      },
      {
        id: 'chapter1_2_choice_3',
        text: '开玩笑说：要不要以后一起来喝？',
        nextSceneId: 'chapter1_3',
        affinityChange: 8,
        addFlags: ['regular_meeting'],
      },
    ],
  },
  {
    id: 'chapter1_3',
    title: '大一期末 - ICPC基础训练',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大一上学期很快就结束了。ICPC校队选拔即将到来。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我和丁乐成了很好的朋友，我们经常一起学习、一起吃饭、一起聊各种话题。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'TA帮我复习了很多ICPC的基础算法。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: 'ICPC需要掌握时间复杂度分析。O(1)常数时间，O(n)线性时间，O(n²)平方时间，O(log n)对数时间，O(n log n)线性对数时间。',
        emotion: 'focused',
        expression: '认真地讲解',
      },
      {
        speaker: 'dingle',
        text: '空间复杂度也一样，数组是O(n)，二维数组是O(n²)，递归深度是O(n)，树状数组是O(n)。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: 'STL标准库是ICPC的必备工具：vector动态数组，string字符串，stack栈，queue队列，map映射，set集合，priority_queue优先队列。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: 'vector<int> v; v.push_back(x); v.pop_back(); v.size(); v[i]访问第i个元素。sort(v.begin(), v.end())排序。',
        emotion: 'happy',
        expression: '微笑着说',
      },
      {
        speaker: 'dingle',
        text: 'priority_queue<int> pq; pq.push(x); pq.top(); pq.pop(); 默认为大顶堆，小顶堆需要用priority_queue<int, vector<int>, greater<int>>。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'narrator',
        text: '期末考试的成绩出来了，我考得还不错，多亏了TA的帮助。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '恭喜你！我就知道你能行。',
        emotion: 'happy',
        expression: '开心地鼓掌',
      },
      {
        speaker: 'narrator',
        text: 'TA的笑容很灿烂，我的心里也暖暖的。',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'chapter2_start',
  },
  {
    id: 'chapter2_start',
    title: '大二上学期',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大一下学期开始了，课程更难了，我们需要学习算法、操作系统、计算机组成原理...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '丁乐开始准备参加ICPC竞赛，TA邀请我一起组队。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '我们一起参加ICPC吧？我和另外一个人组队，还需要一个队友。',
        emotion: 'shy',
        expression: '期待地看着我',
      },
      {
        speaker: 'narrator',
        text: '我很犹豫，我知道ICPC竞赛难度很高，需要投入大量的时间和精力。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '但我也知道，这是一个和TA并肩作战的机会。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'chapter2_choice_1',
        text: '欣然接受邀请',
        nextSceneId: 'chapter2_1',
        affinityChange: 10,
        addFlags: ['joined_icpc'],
      },
      {
        id: 'chapter2_choice_2',
        text: '表示需要考虑一下',
        nextSceneId: 'chapter2_1',
        affinityChange: 0,
      },
      {
        id: 'chapter2_choice_3',
        text: '礼貌地拒绝',
        nextSceneId: 'chapter2_1',
        affinityChange: -10,
      },
    ],
  },
  {
    id: 'chapter2_1',
    title: '大二上学期 - ICPC高级数据结构',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'ICPC的训练非常辛苦，我们每周都要刷很多题目。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '丁乐是队伍的核心，TA的代码能力非常强，经常能快速解决难题。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: 'ICPC需要掌握高级数据结构，这些是解决难题的关键。',
        emotion: 'focused',
        expression: '认真地讲解',
      },
      {
        speaker: 'dingle',
        text: '线段树(Segment Tree)可以在O(log n)时间内完成区间查询和修改。每个节点维护一个区间的信息，支持区间求和、最大值、最小值等操作。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '树状数组(Fenwick Tree)比线段树更简洁，只能处理单点修改和前缀查询，代码量更小，也是O(log n)时间复杂度。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '平衡树(如Treap、Splay Tree)支持插入、删除、查找第k小、查找排名等操作，都是O(log n)时间复杂度，比普通二叉搜索树更稳定。',
        emotion: 'focused',
        expression: '眼睛发亮',
      },
      {
        speaker: 'dingle',
        text: '并查集(Disjoint Set Union)用于处理集合合并和查询，路径压缩和按秩合并后时间复杂度接近O(1)，常用于处理连通性问题。',
        emotion: 'happy',
        expression: '微笑着说',
      },
      {
        speaker: 'dingle',
        text: 'Trie树用于字符串前缀查询，支持高效的字符串查找、插入和删除操作，时间复杂度与字符串长度相关。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'narrator',
        text: '在TA的带领下，我们的队伍进步很快，很快就能在模拟赛中获得不错的名次。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '每次训练结束，我们都会一起去食堂吃饭，聊天放松。',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'chapter2_2',
  },
  {
    id: 'chapter2_2',
    title: '深夜代码 - ICPC高级算法',
    background: 'bg-night.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '有一天晚上，我们在训练室刷题到很晚。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '其他队友都已经走了，只剩下我和丁乐还在。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这道动态规划的题有点难，让我讲讲思路。',
        emotion: 'focused',
        expression: '认真地看着屏幕',
      },
      {
        speaker: 'dingle',
        text: '高级排序算法：快速排序平均O(n log n)，最坏O(n²)；归并排序稳定O(n log n)；堆排序O(n log n)但常数较大。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '动态规划优化：斜率优化、凸包优化、单调队列优化，用于处理具有决策单调性的DP问题。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '网络流算法：Dinic算法用BFS建层次图，DFS增广，时间复杂度O(E√V)，可以处理最大流、最小割、二分图匹配等问题。',
        emotion: 'happy',
        expression: '眼睛发亮',
      },
      {
        speaker: 'dingle',
        text: '字符串算法：KMP处理单模式匹配，AC自动机处理多模式匹配，后缀数组和后缀自动机处理子串统计问题。',
        emotion: 'focused',
        expression: '认真讲解',
      },
      {
        speaker: 'dingle',
        text: '数论高级：扩展欧几里得算法求解线性同余方程，中国剩余定理，欧拉函数，莫比乌斯反演，快速幂和矩阵快速幂。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '博弈论：SG函数，Nim游戏，公平组合游戏，必胜必败态分析。',
        emotion: 'happy',
        expression: '微笑着说',
      },
      {
        speaker: 'dingle',
        text: '你累不累？要不要休息一下？',
        emotion: 'normal',
        expression: '关切地看着我',
      },
      {
        speaker: 'narrator',
        text: 'TA的声音很温柔，让我心里一暖。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '其实...我很开心你能和我一起组队。',
        emotion: 'shy',
        expression: '脸颊微红',
      },
    ],
    choices: [
      {
        id: 'chapter2_2_choice_1',
        text: '认真地说：我也是',
        nextSceneId: 'chapter2_3',
        affinityChange: 8,
      },
      {
        id: 'chapter2_2_choice_2',
        text: '开玩笑说：当然，谁不想和你一组',
        nextSceneId: 'chapter2_3',
        affinityChange: 5,
      },
      {
        id: 'chapter2_2_choice_3',
        text: '沉默不语，继续写代码',
        nextSceneId: 'chapter2_3',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'chapter2_3',
    title: '大二上学期结束',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大一下学期很快就过去了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC的区域赛马上就要开始了，我们正在积极备战。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我和丁乐的关系也越来越好，我们经常一起学习、一起吃饭、一起训练。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '有时候，我会怀疑自己对TA的感情到底是什么...',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'chapter3_start',
  },
  {
    id: 'chapter3_start',
    title: '大三上学期',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大三开始了，我们的课程更加专业化：数据库、计算机网络、软件工程...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC区域赛即将到来，我们队伍已经准备好了。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这次区域赛非常重要，如果获得金牌，我们就有机会参加世界总决赛。',
        emotion: 'focused',
        expression: '认真地讲解',
      },
      {
        speaker: 'narrator',
        text: 'TA的眼里闪烁着期待的光芒，我知道TA有多渴望这次比赛。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'chapter3_choice_1',
        text: '坚定地说：我们一定能做到',
        nextSceneId: 'chapter3_1',
        affinityChange: 8,
      },
      {
        id: 'chapter3_choice_2',
        text: '默默地点头',
        nextSceneId: 'chapter3_1',
        affinityChange: 0,
      },
      {
        id: 'chapter3_choice_3',
        text: '安慰说：尽力就好',
        nextSceneId: 'chapter3_1',
        affinityChange: 5,
      },
    ],
  },
  {
    id: 'chapter3_1',
    title: '区域赛 - ICPC高级数据结构',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'ICPC区域赛终于到来了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '比赛现场人山人海，来自各地的顶尖队伍聚集在这里。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '比赛开始了，我们迅速进入状态。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这道题要用线段树的延迟标记(Lazy Tag)技术！它能在O(log n)时间内处理区间更新和查询。',
        emotion: 'focused',
        expression: '全神贯注',
      },
      {
        speaker: 'dingle',
        text: '线段树的延迟标记：当需要更新一个区间时，不立即更新所有子节点，而是在需要时再向下传递标记，大大提高效率。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '主席树(可持久化线段树)可以保留历史版本，支持查询任意历史时刻的区间信息，时间和空间复杂度都是O(n log n)。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: 'Link-Cut Tree(LCT)处理动态树问题，支持换根、链查询、连边、删边，是ICPC中的高级数据结构，时间复杂度均摊O(log n)。',
        emotion: 'happy',
        expression: '眼睛发亮',
      },
      {
        speaker: 'dingle',
        text: '树链剖分将树分解为链，结合线段树处理路径查询和更新，时间复杂度O(log² n)，是处理树上问题的强大工具。',
        emotion: 'focused',
        expression: '认真讲解',
      },
      {
        speaker: 'narrator',
        text: '比赛结束后，我们获得了金牌！',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'chapter3_2',
  },
  {
    id: 'chapter3_2',
    title: '庆祝 - ICPC世界总决赛准备',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '我们队伍获得了金牌，可以参加世界总决赛了！',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '晚上，我们去了学校附近的餐厅庆祝。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这次真的多亏了你们，我太开心了！',
        emotion: 'happy',
        expression: '开心地笑',
      },
      {
        speaker: 'narrator',
        text: 'TA的脸颊因为兴奋而泛红，看起来格外动人。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: 'ICPC世界总决赛需要掌握高级网络流算法。Dinic算法优化：当前弧优化、多路增广，时间复杂度可以达到O(E²√V)。',
        emotion: 'focused',
        expression: '认真讲解',
      },
      {
        speaker: 'dingle',
        text: '费用流算法：最小费用最大流，使用SPFA或Dijkstra结合势能函数(Johnson算法)，处理带权的网络流问题。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '高级字符串算法：后缀自动机(SA)可以线性时间构建，支持统计子串出现次数、最长公共子串等问题。',
        emotion: 'happy',
        expression: '眼睛发亮',
      },
      {
        speaker: 'dingle',
        text: '计算几何：凸包(Andrew算法)、半平面交、最近点对、线段相交检测，这些都是ICPC中的常见问题。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '下个学期就是世界总决赛了，我们继续加油！',
        emotion: 'focused',
        expression: '充满期待',
      },
    ],
    choices: [
      {
        id: 'chapter3_2_choice_1',
        text: '看着TA的眼睛说：我相信我们能成功',
        nextSceneId: 'chapter3_3',
        affinityChange: 10,
      },
      {
        id: 'chapter3_2_choice_2',
        text: '和TA碰杯说：加油！',
        nextSceneId: 'chapter3_3',
        affinityChange: 5,
      },
      {
        id: 'chapter3_2_choice_3',
        text: '说：是啊，再接再厉',
        nextSceneId: 'chapter3_3',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'chapter3_3',
    title: '大三下学期',
    background: 'bg-night.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大三下学期，我们的生活变得更加忙碌。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '除了ICPC训练，我们还需要准备实习、写论文...',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '有时候，我们会聊到毕业后的打算。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '你以后想做什么？',
        emotion: 'normal',
        expression: '好奇地问',
      },
    ],
    choices: [
      {
        id: 'chapter3_3_choice_1',
        text: '说：我想继续读研深造',
        nextSceneId: 'chapter3_4',
        affinityChange: 0,
        addFlags: ['plan_graduate'],
      },
      {
        id: 'chapter3_3_choice_2',
        text: '说：我想直接工作',
        nextSceneId: 'chapter3_4',
        affinityChange: 0,
        addFlags: ['plan_work'],
      },
      {
        id: 'chapter3_3_choice_3',
        text: '反问：你呢？',
        nextSceneId: 'chapter3_4',
        affinityChange: 5,
      },
    ],
  },
  {
    id: 'chapter3_4',
    title: '大三年终',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大三很快就过去了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛下个学期就要举行了，我们正在全力备战。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '同时，我们也开始考虑毕业后的去向。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我感觉和丁乐的距离越来越近，但又害怕打破这层关系...',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'chapter4_start',
  },
  {
    id: 'chapter4_start',
    title: '大四上学期',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '大四开始了，这是我们大学最后一年。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛即将在一个月后举行。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这是我们最后一次参加ICPC比赛了，一定要全力以赴。',
        emotion: 'focused',
        expression: '坚定地说',
      },
      {
        speaker: 'narrator',
        text: 'TA的眼里充满了决心，我知道TA有多渴望这个冠军。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'chapter4_choice_1',
        text: '认真地说：我们一起努力，争取冠军',
        nextSceneId: 'chapter4_1',
        affinityChange: 10,
      },
      {
        id: 'chapter4_choice_2',
        text: '说：尽力就好',
        nextSceneId: 'chapter4_1',
        affinityChange: 0,
      },
      {
        id: 'chapter4_choice_3',
        text: '沉默不语',
        nextSceneId: 'chapter4_1',
        affinityChange: -5,
      },
    ],
  },
  {
    id: 'chapter4_1',
    title: '世界总决赛 - 进阶算法',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛终于到来了。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '来自世界各地的顶级队伍聚集在这里，竞争异常激烈。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '不要紧张，我们平时的训练就是为了今天。',
        emotion: 'focused',
        expression: '冷静地说',
      },
      {
        speaker: 'narrator',
        text: '比赛开始了，我们迅速进入状态。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '比赛过程中，我们遇到了一道非常难的题目。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '这道题要用后缀自动机！它能在线性时间内构建，支持统计子串出现次数、最长公共子串等。',
        emotion: 'focused',
        expression: '快速分析',
      },
      {
        speaker: 'dingle',
        text: '后缀数组用倍增法O(n log n)构建，配合LCP最长公共前缀，能处理各种字符串问题。',
        emotion: 'focused',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: 'AC自动机是多模式串匹配，用Trie图构建fail指针，时间复杂度O(n+m)，比KMP更通用。',
        emotion: 'happy',
        expression: '眼睛发亮',
      },
      {
        speaker: 'dingle',
        text: '可持久化数据结构能保留历史版本。可持久化线段树支持历史查询，可持久化并查集支持撤销操作。',
        emotion: 'focused',
        expression: '继续讲解',
      },
      {
        speaker: 'dingle',
        text: '强连通分量Tarjan算法O(V+E)，双连通分量Tarjan或割点割边。最小生成树Kruskal用并查集，Prim用优先队列。',
        emotion: 'happy',
        expression: '快速讲解',
      },
      {
        speaker: 'dingle',
        text: '最短路优化：Dijkstra用优先队列O((V+E)log V)，SPFA有时更快，Floyd全源最短路O(V³)。',
        emotion: 'focused',
        expression: '认真讲解',
      },
    ],
    choices: [
      {
        id: 'chapter4_1_choice_1',
        text: '主动提出自己的想法',
        nextSceneId: 'chapter4_2',
        affinityChange: 8,
      },
      {
        id: 'chapter4_1_choice_2',
        text: '听丁乐的指挥',
        nextSceneId: 'chapter4_2',
        affinityChange: 0,
      },
      {
        id: 'chapter4_1_choice_3',
        text: '和队友一起讨论',
        nextSceneId: 'chapter4_2',
        affinityChange: 5,
      },
    ],
  },
  {
    id: 'chapter4_2',
    title: '决战时刻',
    background: 'bg-classroom.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '在最后半小时，我们终于解决了那道难题！',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '提交代码，通过了！',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '太棒了！我们做到了！',
        emotion: 'happy',
        expression: '激动地说',
      },
      {
        speaker: 'narrator',
        text: 'TA的眼睛里闪烁着兴奋的光芒，我的心里也充满了成就感。',
        emotion: 'normal',
      },
    ],
    autoNext: true,
    nextSceneId: 'check_ending',
  },
  {
    id: 'check_ending',
    title: '结局判定',
    background: 'bg-dorm.jpg',
    dialogue: [],
    autoNext: true,
    nextSceneId: 'ending_true_love',
  },
  {
    id: 'ending_true_love',
    title: '永恒的代码',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【结局：永恒的代码】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛结束了，我们的队伍获得了第三名，拿到了铜牌。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '虽然不是冠军，但我们已经很满意了。这是我们四年努力的结果。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '谢谢你这四年的陪伴，没有你，我无法走到今天。',
        emotion: 'shy',
        expression: '认真地说',
      },
      {
        speaker: 'narrator',
        text: 'TA的声音有些颤抖，我知道TA在努力压抑着内心的情感。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '其实...我一直想告诉你...',
        emotion: 'shy',
        expression: '脸颊微红',
      },
      {
        speaker: 'dingle',
        text: '我喜欢你。',
        emotion: 'shy',
        expression: '鼓起勇气说',
      },
      {
        speaker: 'narrator',
        text: '我的大脑一片空白，心跳加速，感觉整个世界都停止了转动。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '原来...TA也一直喜欢着我。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我们相视而笑，那一刻，所有的等待都值得了。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'ending_choice',
        text: '我也喜欢你',
        nextSceneId: 'ending_true_love_final',
        affinityChange: 10,
        addFlags: ['confessed'],
      },
    ],
  },
  {
    id: 'ending_true_love_final',
    title: '永恒的代码',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【结局：永恒的代码】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我们相拥而泣，四年的感情终于在这一刻得到了回应。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '毕业后，我们一起去了杭州，在大厂工作，依然住在同一个屋檐下。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '丁乐不仅是最强队友，更是我最珍视的人。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我们的故事，就像我们写的代码一样，永远运行在彼此的心中。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '【真结局达成】',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'credits',
        text: '制作人员名单',
        nextSceneId: 'credits',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'ending_close_friends',
    title: '挚友相伴',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【结局：挚友相伴】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛结束后，我们的队伍获得了不错的成绩。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '虽然我们没有成为恋人，但我们是最好的室友和朋友。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '彼此信任，相互支持，这份友谊同样珍贵。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '谢谢你这四年的陪伴，我们永远是好朋友！',
        emotion: 'happy',
        expression: '微笑着说',
      },
      {
        speaker: 'narrator',
        text: '我们相视而笑，虽然没有跨出那一步，但这份友谊会一直延续下去。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'credits',
        text: '制作人员名单',
        nextSceneId: 'credits',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'ending_good_teammates',
    title: '默契搭档',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【结局：默契搭档】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛结束后，我们的队伍获得了一个不错的成绩。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我们是优秀的编程搭档，在竞技赛场上配合无间。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '生活中保持着恰当的距离，但友谊长存。',
        emotion: 'normal',
      },
      {
        speaker: 'dingle',
        text: '很高兴能和你成为队友，希望以后还能一起合作！',
        emotion: 'happy',
        expression: '微笑着说',
      },
    ],
    choices: [
      {
        id: 'credits',
        text: '制作人员名单',
        nextSceneId: 'credits',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'ending_strangers',
    title: '渐行渐远',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【结局：渐行渐远】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'ICPC世界总决赛结束后，我们的队伍没有获得很好的成绩。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '毕业后，我们各奔东西，渐渐失去了联系。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '我们只是普通的室友，生活轨迹渐渐分叉。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '有时我会想起大学时光，想起TA...',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'credits',
        text: '制作人员名单',
        nextSceneId: 'credits',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'ending_bad',
    title: '错过',
    background: 'bg-dorm.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【结局：错过】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '因为好感度过低，我们之间的关系渐渐疏远。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '最终，我们只是住在同一个房间的陌生人。',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '错过了最好的时光，错过了最应该珍惜的人。',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'credits',
        text: '制作人员名单',
        nextSceneId: 'credits',
        affinityChange: 0,
      },
    ],
  },
  {
    id: 'credits',
    title: '制作人员名单',
    background: 'bg-night.jpg',
    dialogue: [
      {
        speaker: 'narrator',
        text: '【制作人员名单】',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '----------------',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '编导：Tnt-next',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '技术实现：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '剧本编写：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '角色设计：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '场景设计：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: 'UI设计：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '音效制作：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '测试支持：Coze',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '特别感谢',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '所有参与测试的玩家',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '----------------',
        emotion: 'normal',
      },
      {
        speaker: 'narrator',
        text: '感谢您的游玩！',
        emotion: 'normal',
      },
    ],
    choices: [
      {
        id: 'title',
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
