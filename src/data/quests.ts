export interface Objective {
  id: string
  type: 'kill' | 'collect' | 'talk' | 'reach'
  target: string
  quantity: number
  progress: number
}

export interface Reward {
  type: 'experience' | 'resource' | 'item' | 'mechPart'
  target: string
  quantity: number
}

export interface Quest {
  id: string
  name: string
  description: string
  objectives: Objective[]
  rewards: Reward[]
  status: 'active' | 'completed' | 'failed' | 'inactive'
  giver: string
  level: number
  location: string
}

export const quests: Quest[] = [
  {
    id: 'wudang_intro',
    name: '武当山初探',
    description: '拜访武当山，与张三丰对话。',
    objectives: [
      {
        id: 'talk_to_zhang_sanfeng',
        type: 'talk',
        target: 'zhang_sanfeng',
        quantity: 1,
        progress: 0
      }
    ],
    rewards: [
      {
        type: 'experience',
        target: 'experience',
        quantity: 100
      },
      {
        type: 'resource',
        target: '铁矿石',
        quantity: 5
      }
    ],
    status: 'active',
    giver: 'song_yuanqiao',
    level: 1,
    location: 'wudang'
  },
  {
    id: 'learn_basic_skills',
    name: '学习基本技能',
    description: '向张三丰学习武当基础心法。',
    objectives: [
      {
        id: 'learn_from_zhang_sanfeng',
        type: 'talk',
        target: 'zhang_sanfeng',
        quantity: 1,
        progress: 0
      }
    ],
    rewards: [
      {
        type: 'experience',
        target: 'experience',
        quantity: 200
      },
      {
        type: 'item',
        target: '武当心法',
        quantity: 1
      }
    ],
    status: 'inactive',
    giver: 'zhang_sanfeng',
    level: 1,
    location: 'wudang'
  },
  {
    id: 'learn_medicine',
    name: '学习医术',
    description: '向胡青牛学习医术。',
    objectives: [
      {
        id: 'talk_to_hu_qingniu',
        type: 'talk',
        target: 'hu_qingniu',
        quantity: 1,
        progress: 0
      }
    ],
    rewards: [
      {
        type: 'experience',
        target: 'experience',
        quantity: 150
      },
      {
        type: 'resource',
        target: '草药',
        quantity: 10
      }
    ],
    status: 'inactive',
    giver: 'hu_qingniu',
    level: 2,
    location: 'hudiegu'
  },
  {
    id: 'save_xiao_zhao',
    name: '拯救小昭',
    description: '帮助小昭解决困难。',
    objectives: [
      {
        id: 'talk_to_xiao_zhao',
        type: 'talk',
        target: 'xiao_zhao',
        quantity: 1,
        progress: 0
      }
    ],
    rewards: [
      {
        type: 'experience',
        target: 'experience',
        quantity: 250
      },
      {
        type: 'item',
        target: '小昭的信物',
        quantity: 1
      }
    ],
    status: 'inactive',
    giver: 'xiao_zhao',
    level: 2,
    location: 'hudiegu'
  },
  {
    id: 'meet_zhao_min',
    name: '结识赵敏',
    description: '在大都与赵敏会面。',
    objectives: [
      {
        id: 'talk_to_zhao_min',
        type: 'talk',
        target: 'zhao_min',
        quantity: 1,
        progress: 0
      }
    ],
    rewards: [
      {
        type: 'experience',
        target: 'experience',
        quantity: 300
      },
      {
        type: 'resource',
        target: '金币',
        quantity: 10
      }
    ],
    status: 'inactive',
    giver: 'zhao_min',
    level: 3,
    location: 'dadu'
  }
]

export const getQuestsByLocation = (locationId: string) => {
  return quests.filter(quest => quest.location === locationId)
}

export const getActiveQuests = () => {
  return quests.filter(quest => quest.status === 'active')
}

export const getQuestById = (questId: string) => {
  return quests.find(quest => quest.id === questId)
}
