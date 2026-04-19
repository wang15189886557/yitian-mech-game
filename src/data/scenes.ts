export interface DialogueOption {
  text: string
  nextDialogue: string
  condition?: () => boolean
  effect?: () => void
}

export interface Dialogue {
  id: string
  text: string
  options?: DialogueOption[]
  nextDialogue?: string
}

export interface NPC {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  dialogues: Dialogue[]
}

export interface Resource {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  quantity: number
  collected: boolean
}

export interface Scene {
  locationId: string
  npcs: NPC[]
  resources: Resource[]
  background: string
}

export const scenes: Scene[] = [
  {
    locationId: 'wudang',
    npcs: [
      {
        id: 'zhang_sanfeng',
        name: '张三丰',
        x: 300,
        y: 250,
        width: 40,
        height: 60,
        dialogues: [
          {
            id: 'greeting',
            text: '年轻人，你来了。',
            nextDialogue: 'welcome'
          },
          {
            id: 'welcome',
            text: '武当山欢迎你。',
            nextDialogue: 'offer'
          },
          {
            id: 'offer',
            text: '要学习武当绝学吗？',
            options: [
              {
                text: '是的，我想学习',
                nextDialogue: 'learn'
              },
              {
                text: '暂时不需要',
                nextDialogue: 'end'
              }
            ]
          },
          {
            id: 'learn',
            text: '很好，我将传授你武当基础心法。',
            nextDialogue: 'end'
          }
        ]
      },
      {
        id: 'song_yuanqiao',
        name: '宋远桥',
        x: 500,
        y: 300,
        width: 40,
        height: 60,
        dialogues: [
          {
            id: 'greeting',
            text: '你好，少侠。',
            nextDialogue: 'master'
          },
          {
            id: 'master',
            text: '师傅正在闭关修炼。',
            nextDialogue: 'help'
          },
          {
            id: 'help',
            text: '有什么可以帮忙的吗？',
            options: [
              {
                text: '请问如何前往明教？',
                nextDialogue: 'mingjiao'
              },
              {
                text: '没什么事，谢谢',
                nextDialogue: 'end'
              }
            ]
          },
          {
            id: 'mingjiao',
            text: '明教总坛在昆仑山光明顶，需要等级5才能前往。',
            nextDialogue: 'end'
          }
        ]
      }
    ],
    resources: [
      {
        id: 'resource1',
        name: '铁矿石',
        x: 200,
        y: 350,
        width: 20,
        height: 20,
        quantity: 5,
        collected: false
      },
      {
        id: 'resource2',
        name: '能量水晶',
        x: 400,
        y: 320,
        width: 20,
        height: 20,
        quantity: 3,
        collected: false
      }
    ],
    background: 'wudang_background'
  },
  {
    locationId: 'hudiegu',
    npcs: [
      {
        id: 'hu_qingniu',
        name: '胡青牛',
        x: 350,
        y: 280,
        width: 40,
        height: 60,
        dialogues: [
          {
            id: 'greeting',
            text: '你是来求医的吗？',
            nextDialogue: 'medicine'
          },
          {
            id: 'medicine',
            text: '我是蝶谷医仙胡青牛，擅长治疗各种疑难杂症。',
            nextDialogue: 'offer'
          },
          {
            id: 'offer',
            text: '要学习医术吗？',
            options: [
              {
                text: '是的，我想学习',
                nextDialogue: 'learn'
              },
              {
                text: '暂时不需要',
                nextDialogue: 'end'
              }
            ]
          },
          {
            id: 'learn',
            text: '很好，我将传授你一些基础医术。',
            nextDialogue: 'end'
          }
        ]
      },
      {
        id: 'xiao_zhao',
        name: '小昭',
        x: 250,
        y: 300,
        width: 35,
        height: 55,
        dialogues: [
          {
            id: 'greeting',
            text: '你好，公子。',
            nextDialogue: 'help'
          },
          {
            id: 'help',
            text: '需要我帮忙吗？',
            options: [
              {
                text: '你是谁？',
                nextDialogue: 'identity'
              },
              {
                text: '没什么事，谢谢',
                nextDialogue: 'end'
              }
            ]
          },
          {
            id: 'identity',
            text: '我是小昭，胡先生的助手。',
            nextDialogue: 'end'
          }
        ]
      }
    ],
    resources: [
      {
        id: 'resource1',
        name: '草药',
        x: 150,
        y: 350,
        width: 20,
        height: 20,
        quantity: 8,
        collected: false
      },
      {
        id: 'resource2',
        name: '能量水晶',
        x: 500,
        y: 330,
        width: 20,
        height: 20,
        quantity: 2,
        collected: false
      }
    ],
    background: 'hudiegu_background'
  },
  {
    locationId: 'dadu',
    npcs: [
      {
        id: 'zhao_min',
        name: '赵敏',
        x: 400,
        y: 250,
        width: 35,
        height: 55,
        dialogues: [
          {
            id: 'greeting',
            text: '你就是张无忌？',
            nextDialogue: 'interest'
          },
          {
            id: 'interest',
            text: '我对你很感兴趣。',
            nextDialogue: 'challenge'
          },
          {
            id: 'challenge',
            text: '敢不敢和我比试一下？',
            options: [
              {
                text: '好，我接受挑战',
                nextDialogue: 'battle'
              },
              {
                text: '暂时不想比试',
                nextDialogue: 'end'
              }
            ]
          },
          {
            id: 'battle',
            text: '很好，我们来日再战。',
            nextDialogue: 'end'
          }
        ]
      }
    ],
    resources: [
      {
        id: 'resource1',
        name: '金币',
        x: 200,
        y: 350,
        width: 20,
        height: 20,
        quantity: 10,
        collected: false
      },
      {
        id: 'resource2',
        name: '能量水晶',
        x: 600,
        y: 320,
        width: 20,
        height: 20,
        quantity: 4,
        collected: false
      }
    ],
    background: 'dadu_background'
  }
]

export const getSceneByLocationId = (locationId: string) => {
  return scenes.find(scene => scene.locationId === locationId) || scenes[0]
}
