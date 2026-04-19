export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: string;
  reward: {
    resources: { name: string; quantity: number }[];
    parts?: string[];
  };
  status: 'locked' | 'unlocked' | 'claimed';
}

export const achievements: Achievement[] = [
  {
    id: 'first_battle',
    name: '初战告捷',
    description: '完成第一场机甲对战',
    condition: 'complete_first_battle',
    reward: {
      resources: [{ name: '钢铁', quantity: 50 }, { name: '能源', quantity: 30 }]
    },
    status: 'locked'
  },
  {
    id: 'explorer',
    name: '江湖探险家',
    description: '探索所有游戏地点',
    condition: 'explore_all_locations',
    reward: {
      resources: [{ name: '稀有金属', quantity: 100 }, { name: '高级能源', quantity: 50 }]
    },
    status: 'locked'
  },
  {
    id: 'collector',
    name: '资源收集者',
    description: '收集1000个资源',
    condition: 'collect_1000_resources',
    reward: {
      resources: [{ name: '稀有金属', quantity: 150 }, { name: '高级能源', quantity: 100 }]
    },
    status: 'locked'
  },
  {
    id: 'upgrader',
    name: '机甲大师',
    description: '将机甲所有部件升级到最高级',
    condition: 'upgrade_all_parts',
    reward: {
      resources: [{ name: '稀有金属', quantity: 200 }, { name: '高级能源', quantity: 150 }],
      parts: ['终极机甲核心']
    },
    status: 'locked'
  },
  {
    id: 'quest_master',
    name: '任务达人',
    description: '完成所有主线任务',
    condition: 'complete_all_quests',
    reward: {
      resources: [{ name: '稀有金属', quantity: 250 }, { name: '高级能源', quantity: 200 }],
      parts: ['倚天剑机甲武器']
    },
    status: 'locked'
  },
  {
    id: 'level_master',
    name: '关卡征服者',
    description: '完成所有关卡',
    condition: 'complete_all_levels',
    reward: {
      resources: [{ name: '稀有金属', quantity: 300 }, { name: '高级能源', quantity: 250 }],
      parts: ['屠龙刀机甲武器']
    },
    status: 'locked'
  },
  {
    id: 'easter_egg_hunter',
    name: '彩蛋猎人',
    description: '发现所有彩蛋',
    condition: 'find_all_easter_eggs',
    reward: {
      resources: [{ name: '稀有金属', quantity: 350 }, { name: '高级能源', quantity: 300 }],
      parts: ['明教圣火令机甲核心']
    },
    status: 'locked'
  },
  {
    id: 'ultimate_warrior',
    name: '武林盟主',
    description: '击败终极Boss朱元璋',
    condition: 'defeat_final_boss',
    reward: {
      resources: [{ name: '稀有金属', quantity: 500 }, { name: '高级能源', quantity: 400 }],
      parts: ['九阳神功机甲核心', '乾坤大挪移机甲核心']
    },
    status: 'locked'
  }
];
