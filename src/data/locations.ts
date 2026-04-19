export interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean;
  level: number;
  npcs: string[];
  quests: string[];
}

export const locations: Location[] = [
  {
    id: 'wudang',
    name: '武当山',
    description: '张三丰创建的武当派所在地，风景秀丽，武学氛围浓厚。',
    image: 'wudang.png',
    available: true,
    level: 1,
    npcs: ['zhang_sanfeng', 'song_yuanqiao'],
    quests: ['wudang_intro', 'learn_basic_skills']
  },
  {
    id: 'mingjiao',
    name: '明教总坛',
    description: '明教的总部所在地，位于昆仑山光明顶，是张无忌成为明教教主的地方。',
    image: 'mingjiao.png',
    available: false,
    level: 5,
    npcs: ['zhang_wuji', 'yangxiao', 'weituo'],
    quests: ['mingjiao_crisis', 'become_leader']
  },
  {
    id: 'dadu',
    name: '大都',
    description: '元朝的首都，繁华热闹，是赵敏的居住地。',
    image: 'dadu.png',
    available: true,
    level: 3,
    npcs: ['zhao_min', 'yuan_er', 'wu_sangui'],
    quests: ['meet_zhao_min', 'royal_crisis']
  },
  {
    id: 'hudiegu',
    name: '蝴蝶谷',
    description: '胡青牛的居住地，是张无忌学习医术的地方。',
    image: 'hudiegu.png',
    available: true,
    level: 2,
    npcs: ['hu_qingniu', 'xiao_zhao'],
    quests: ['learn_medicine', 'save_xiao_zhao']
  },
  {
    id: 'guangmingding',
    name: '光明顶',
    description: '明教的圣地，张无忌在此力挫六大门派，一战成名。',
    image: 'guangmingding.png',
    available: false,
    level: 6,
    npcs: ['zhang_wuji', 'zhao_min', 'zhou_zhiruo'],
    quests: ['defend_mingjiao', 'battle_six_factions']
  },
  {
    id: 'shaolin',
    name: '少林寺',
    description: '天下武学正宗，是谢逊和空见神僧的所在地。',
    image: 'shaolin.png',
    available: false,
    level: 8,
    npcs: ['kongjian', 'kongshen', 'xie_xun'],
    quests: ['find_xie_xun', 'learn_kongfu']
  }
];
