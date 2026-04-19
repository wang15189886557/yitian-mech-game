export interface Level {
  id: string;
  name: string;
  description: string;
  story: string;
  objectives: string[];
  enemies: string[];
  rewards: {
    resources: { name: string; quantity: number }[];
    parts?: string[];
  };
  available: boolean;
  level: number;
}

export const levels: Level[] = [
  {
    id: 'butterfly_valley',
    name: '蝴蝶谷奇遇',
    description: '张无忌在蝴蝶谷遇到胡青牛，学习医术的同时，发现了隐藏的机甲技术图纸。',
    story: '张无忌身中玄冥神掌，被常遇春带到蝴蝶谷求医。在蝴蝶谷，他遇到了「蝶谷医仙」胡青牛。胡青牛起初拒绝治疗，但被张无忌的善良打动，不仅治好了他的伤，还传授了他医术。在治疗过程中，张无忌意外发现了胡青牛收藏的机甲技术图纸，这是九阳真经的另一种传承方式。',
    objectives: [
      '收集10株草药',
      '帮助胡青牛治疗3个病人',
      '击败元兵机甲部队',
      '获取九阳真经机甲图纸'
    ],
    enemies: ['元兵机甲士兵', '元兵机甲队长'],
    rewards: {
      resources: [{ name: '钢铁', quantity: 100 }, { name: '能源', quantity: 50 }, { name: '稀有金属', quantity: 20 }],
      parts: ['九阳真经机甲核心', '初级机甲武器']
    },
    available: true,
    level: 1
  },
  {
    id: 'bright_top',
    name: '光明顶之战',
    description: '张无忌前往光明顶，帮助明教抵御六大派的围攻。',
    story: '六大派围攻明教总坛光明顶，明教危在旦夕。张无忌得知消息后，立刻赶往光明顶。在途中，他遇到了杨逍、韦一笑等明教高手，得知明教内部正发生内乱。张无忌凭借九阳神功和乾坤大挪移的机甲技术，力挽狂澜，击败了六大派的高手，化解了明教的危机。',
    objectives: [
      '击败少林派机甲高手',
      '击败武当派机甲高手',
      '击败峨嵋派机甲高手',
      '击败成昆机甲',
      '保护明教总坛'
    ],
    enemies: ['少林派机甲僧', '武当派机甲道士', '峨嵋派机甲尼姑', '成昆机甲'],
    rewards: {
      resources: [{ name: '钢铁', quantity: 200 }, { name: '能源', quantity: 100 }, { name: '稀有金属', quantity: 50 }],
      parts: ['乾坤大挪移机甲核心', '中级机甲武器']
    },
    available: false,
    level: 2
  },
  {
    id: 'dadu_rescue',
    name: '大都救赵敏',
    description: '赵敏被元廷囚禁，张无忌前往大都营救。',
    story: '赵敏因为帮助张无忌，被元廷囚禁。张无忌得知后，决定前往大都营救。他潜入元大都，突破了元廷的机甲防线，与玄冥二老展开了激烈的战斗。最终，张无忌成功救出了赵敏，两人的感情也更加深厚。',
    objectives: [
      '潜入元大都',
      '突破元廷机甲防线',
      '击败玄冥二老机甲',
      '救出赵敏'
    ],
    enemies: ['元廷机甲士兵', '元廷机甲将军', '玄冥二老机甲'],
    rewards: {
      resources: [{ name: '钢铁', quantity: 300 }, { name: '能源', quantity: 150 }, { name: '稀有金属', quantity: 80 }],
      parts: ['高级机甲武器', '高级机甲护甲']
    },
    available: false,
    level: 3
  },
  {
    id: 'snake_island',
    name: '灵蛇岛夺刀',
    description: '张无忌与赵敏、周芷若等人前往灵蛇岛，寻找屠龙刀。',
    story: '张无忌、赵敏、周芷若等人得知屠龙刀在灵蛇岛，决定前往寻找。在灵蛇岛上，他们遇到了波斯明教的机甲部队和金花婆婆。经过一番激战，张无忌成功夺取了屠龙刀，同时也发现了屠龙刀中隐藏的秘密。',
    objectives: [
      '到达灵蛇岛',
      '击败波斯明教机甲部队',
      '击败金花婆婆机甲',
      '夺取屠龙刀'
    ],
    enemies: ['波斯明教机甲士兵', '波斯明教机甲使者', '金花婆婆机甲'],
    rewards: {
      resources: [{ name: '钢铁', quantity: 400 }, { name: '能源', quantity: 200 }, { name: '稀有金属', quantity: 120 }],
      parts: ['屠龙刀机甲武器', '顶级机甲护甲']
    },
    available: false,
    level: 4
  },
  {
    id: 'final_battle',
    name: '最终决战',
    description: '张无忌与朱元璋的机甲部队展开最终决战，争夺武林盟主之位。',
    story: '朱元璋野心勃勃，想要称霸武林。他组建了强大的机甲部队，想要消灭明教。张无忌为了维护武林和平，与朱元璋展开了最终决战。在战斗中，张无忌发挥了九阳神功和乾坤大挪移的威力，最终击败了朱元璋，成为了武林盟主。',
    objectives: [
      '击败朱元璋的机甲部队',
      '击败朱元璋机甲',
      '维护武林和平'
    ],
    enemies: ['朱元璋机甲士兵', '朱元璋机甲将军', '朱元璋机甲'],
    rewards: {
      resources: [{ name: '钢铁', quantity: 500 }, { name: '能源', quantity: 300 }, { name: '稀有金属', quantity: 200 }],
      parts: ['倚天剑机甲武器', '终极机甲核心']
    },
    available: false,
    level: 5
  }
];
