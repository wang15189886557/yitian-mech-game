export interface MechPart {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'engine' | 'core'
  level: number
  maxLevel: number
  baseStats: Record<string, number>
  upgradeCost: Record<number, Record<string, number>>
  description: string
}

export const mechParts: MechPart[] = [
  {
    id: 'sword',
    name: '倚天剑',
    type: 'weapon',
    level: 1,
    maxLevel: 5,
    baseStats: {
      attack: 10,
      range: 20
    },
    upgradeCost: {
      1: { '铁矿石': 10, '能量水晶': 5 },
      2: { '铁矿石': 20, '能量水晶': 10 },
      3: { '铁矿石': 30, '能量水晶': 15 },
      4: { '铁矿石': 40, '能量水晶': 20 }
    },
    description: '倚天剑，削铁如泥，锋利无比。'
  },
  {
    id: 'armor',
    name: '玄铁护甲',
    type: 'armor',
    level: 1,
    maxLevel: 5,
    baseStats: {
      defense: 10,
      health: 50
    },
    upgradeCost: {
      1: { '铁矿石': 15, '能量水晶': 3 },
      2: { '铁矿石': 25, '能量水晶': 6 },
      3: { '铁矿石': 35, '能量水晶': 9 },
      4: { '铁矿石': 45, '能量水晶': 12 }
    },
    description: '玄铁打造的护甲，防御力惊人。'
  },
  {
    id: 'engine',
    name: '九阳引擎',
    type: 'engine',
    level: 1,
    maxLevel: 5,
    baseStats: {
      speed: 5,
      energy: 20
    },
    upgradeCost: {
      1: { '铁矿石': 8, '能量水晶': 8 },
      2: { '铁矿石': 16, '能量水晶': 16 },
      3: { '铁矿石': 24, '能量水晶': 24 },
      4: { '铁矿石': 32, '能量水晶': 32 }
    },
    description: '融合九阳神功的引擎，动力十足。'
  },
  {
    id: 'core',
    name: '乾坤核心',
    type: 'core',
    level: 1,
    maxLevel: 5,
    baseStats: {
      health: 100,
      energy: 50,
      attack: 5,
      defense: 5
    },
    upgradeCost: {
      1: { '铁矿石': 20, '能量水晶': 15 },
      2: { '铁矿石': 30, '能量水晶': 25 },
      3: { '铁矿石': 40, '能量水晶': 35 },
      4: { '铁矿石': 50, '能量水晶': 45 }
    },
    description: '乾坤大挪移核心，全面提升机甲性能。'
  }
]

export const getMechPartById = (id: string) => {
  return mechParts.find(part => part.id === id)
}

export const getMechPartsByType = (type: string) => {
  return mechParts.filter(part => part.type === type)
}
