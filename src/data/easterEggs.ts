export interface EasterEgg {
  id: string;
  name: string;
  description: string;
  location: string;
  trigger: string;
  reward: {
    resources: { name: string; quantity: number }[];
    parts?: string[];
    skills?: string[];
    partners?: string[];
  };
  discovered: boolean;
}

export const easterEggs: EasterEgg[] = [
  {
    id: 'jiuyang_shenggong',
    name: '九阳神功',
    description: '在蝴蝶谷找到九阳真经，获得特殊技能',
    location: 'butterfly_valley',
    trigger: 'find_jiuyang_manual',
    reward: {
      resources: [{ name: '稀有金属', quantity: 50 }, { name: '高级能源', quantity: 30 }],
      skills: ['九阳神功']
    },
    discovered: false
  },
  {
    id: 'tulong_sword',
    name: '屠龙宝刀',
    description: '收集特定资源后可以打造屠龙宝刀，大幅提升机甲攻击力',
    location: 'forge',
    trigger: 'collect_tulong_materials',
    reward: {
      resources: [{ name: '稀有金属', quantity: 100 }, { name: '高级能源', quantity: 50 }],
      parts: ['屠龙刀机甲武器']
    },
    discovered: false
  },
  {
    id: 'yitian_sword',
    name: '倚天剑',
    description: '完成特定任务后获得倚天剑，提升机甲速度和攻击范围',
    location: 'emei',
    trigger: 'complete_emei_quest',
    reward: {
      resources: [{ name: '稀有金属', quantity: 100 }, { name: '高级能源', quantity: 50 }],
      parts: ['倚天剑机甲武器']
    },
    discovered: false
  },
  {
    id: 'zhang_sanfeng',
    name: '张三丰',
    description: '在武当山遇到张三丰，获得高级机甲升级图纸',
    location: 'wudang',
    trigger: 'meet_zhang_sanfeng',
    reward: {
      resources: [{ name: '稀有金属', quantity: 80 }, { name: '高级能源', quantity: 40 }],
      parts: ['武当派机甲核心']
    },
    discovered: false
  },
  {
    id: 'mingjiao_shenghuoling',
    name: '明教圣火令',
    description: '收集圣火令后可以解锁隐藏的明教机甲',
    location: 'mingjiao',
    trigger: 'collect_shenghuoling',
    reward: {
      resources: [{ name: '稀有金属', quantity: 120 }, { name: '高级能源', quantity: 60 }],
      parts: ['明教圣火令机甲核心']
    },
    discovered: false
  },
  {
    id: 'zhao_min',
    name: '赵敏',
    description: '完成与赵敏相关的任务后，获得赵敏作为战斗伙伴',
    location: 'dadu',
    trigger: 'complete_zhao_min_quest',
    reward: {
      resources: [{ name: '稀有金属', quantity: 100 }, { name: '高级能源', quantity: 50 }],
      partners: ['赵敏']
    },
    discovered: false
  },
  {
    id: 'zhou_zhiruo',
    name: '周芷若',
    description: '在特定剧情中选择正确的选项，获得周芷若的帮助',
    location: 'emei',
    trigger: 'choose_correct_option',
    reward: {
      resources: [{ name: '稀有金属', quantity: 80 }, { name: '高级能源', quantity: 40 }],
      partners: ['周芷若']
    },
    discovered: false
  },
  {
    id: 'xie_xun',
    name: '谢逊',
    description: '找到谢逊后，获得屠龙刀的使用方法',
    location: '冰火岛',
    trigger: 'find_xie_xun',
    reward: {
      resources: [{ name: '稀有金属', quantity: 60 }, { name: '高级能源', quantity: 30 }],
      skills: ['屠龙刀使用技巧']
    },
    discovered: false
  },
  {
    id: 'xiao_zhao',
    name: '小昭',
    description: '在波斯明教总部找到小昭，获得波斯机甲技术',
    location: 'persia',
    trigger: 'find_xiao_zhao',
    reward: {
      resources: [{ name: '稀有金属', quantity: 90 }, { name: '高级能源', quantity: 45 }],
      parts: ['波斯机甲核心']
    },
    discovered: false
  },
  {
    id: 'zhang_cuishan',
    name: '张翠山',
    description: '在冰火岛找到张翠山的遗迹，获得武当派机甲技术',
    location: '冰火岛',
    trigger: 'find_zhang_cuishan_ruins',
    reward: {
      resources: [{ name: '稀有金属', quantity: 70 }, { name: '高级能源', quantity: 35 }],
      parts: ['武当派机甲武器']
    },
    discovered: false
  }
];
