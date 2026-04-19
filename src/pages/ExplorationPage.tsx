import React, { useRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { locations } from '../data/locations'
import { getSceneByLocationId } from '../data/scenes'
import { getQuestsByLocation, Quest } from '../data/quests'
import { easterEggs, EasterEgg } from '../data/easterEggs'
import DialogueBox from '../components/DialogueBox'
import QuestTracker from '../components/QuestTracker'

interface Character {
  x: number
  y: number
  width: number
  height: number
  direction: 'left' | 'right'
  isMoving: boolean
  velocityX: number
  velocityY: number
}

interface DialogueOption {
  text: string
  nextDialogue: string
  condition?: () => boolean
  effect?: () => void
}

interface Dialogue {
  id: string
  text: string
  options?: DialogueOption[]
  nextDialogue?: string
}

interface NPC {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  dialogues: Dialogue[]
}

interface Resource {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  quantity: number
  collected: boolean
}

const ExplorationPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>()
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentLocation, setCurrentLocation] = useState(locations.find(loc => loc.id === locationId) || locations[0])
  const [character, setCharacter] = useState<Character>({
    x: 100,
    y: 300,
    width: 40,
    height: 60,
    direction: 'right',
    isMoving: false,
    velocityX: 0,
    velocityY: 0
  })
  
  // 根据地点ID获取场景数据
  const scene = getSceneByLocationId(locationId || 'wudang')
  const [npcs, setNpcs] = useState<NPC[]>(scene.npcs)
  const [resources, setResources] = useState<Resource[]>(scene.resources)
  const [keys, setKeys] = useState<Record<string, boolean>>({
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
  })
  const [showDialogue, setShowDialogue] = useState(false)
  const [currentNPC, setCurrentNPC] = useState<NPC | null>(null)
  const [quests, setQuests] = useState<Quest[]>(getQuestsByLocation(locationId || 'wudang'))
  const [discoveredEasterEggs, setDiscoveredEasterEggs] = useState<EasterEgg[]>(easterEggs)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [currentEasterEgg, setCurrentEasterEgg] = useState<EasterEgg | null>(null)

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: true }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // 游戏循环
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = 800
    canvas.height = 400

    const MAX_SPEED = 3
    const ACCELERATION = 0.2
    const FRICTION = 0.8

    let animationId: number

    const gameLoop = () => {
      // 更新角色状态
      setCharacter(prev => {
        let newCharacter = { ...prev }

        // 处理移动
        if (keys.ArrowLeft) {
          newCharacter.velocityX = Math.max(-MAX_SPEED, newCharacter.velocityX - ACCELERATION)
          newCharacter.direction = 'left'
          newCharacter.isMoving = true
        } else if (keys.ArrowRight) {
          newCharacter.velocityX = Math.min(MAX_SPEED, newCharacter.velocityX + ACCELERATION)
          newCharacter.direction = 'right'
          newCharacter.isMoving = true
        } else {
          newCharacter.velocityX *= FRICTION
          newCharacter.isMoving = false
        }

        if (keys.ArrowUp) {
          newCharacter.velocityY = Math.max(-MAX_SPEED, newCharacter.velocityY - ACCELERATION)
          newCharacter.isMoving = true
        } else if (keys.ArrowDown) {
          newCharacter.velocityY = Math.min(MAX_SPEED, newCharacter.velocityY + ACCELERATION)
          newCharacter.isMoving = true
        } else {
          newCharacter.velocityY *= FRICTION
        }

        // 更新位置
        newCharacter.x += newCharacter.velocityX
        newCharacter.y += newCharacter.velocityY

        // 边界检查
        newCharacter.x = Math.max(0, Math.min(canvas.width - newCharacter.width, newCharacter.x))
        newCharacter.y = Math.max(0, Math.min(canvas.height - newCharacter.height, newCharacter.y))

        // 检查与NPC的碰撞
        npcs.forEach(npc => {
          if (
            newCharacter.x < npc.x + npc.width &&
            newCharacter.x + newCharacter.width > npc.x &&
            newCharacter.y < npc.y + npc.height &&
            newCharacter.y + newCharacter.height > npc.y
          ) {
            if (!showDialogue) {
              setCurrentNPC(npc)
              setShowDialogue(true)
            }
          }
        })

        // 检查与资源的碰撞
        setResources(prevResources => {
          return prevResources.map(resource => {
            if (!resource.collected &&
              newCharacter.x < resource.x + resource.width &&
              newCharacter.x + newCharacter.width > resource.x &&
              newCharacter.y < resource.y + resource.height &&
              newCharacter.y + newCharacter.height > resource.y
            ) {
              return { ...resource, collected: true }
            }
            return resource
          })
        })

        // 检查彩蛋触发
        setDiscoveredEasterEggs(prevEasterEggs => {
          return prevEasterEggs.map(easterEgg => {
            if (!easterEgg.discovered && easterEgg.location === locationId) {
              // 这里可以根据不同的彩蛋设置不同的触发条件
              // 简单起见，我们设置一个随机位置触发
              const eggX = Math.random() * (canvas.width - 50) + 25
              const eggY = Math.random() * (canvas.height - 50) + 25
              const eggWidth = 50
              const eggHeight = 50
              
              if (
                newCharacter.x < eggX + eggWidth &&
                newCharacter.x + newCharacter.width > eggX &&
                newCharacter.y < eggY + eggHeight &&
                newCharacter.y + newCharacter.height > eggY
              ) {
                setCurrentEasterEgg(easterEgg)
                setShowEasterEgg(true)
                return { ...easterEgg, discovered: true }
              }
            }
            return easterEgg
          })
        })

        return newCharacter
      })

      // 渲染场景 - 参考星露谷物语的风格
      ctx.fillStyle = '#87ceeb' // 天空蓝
      ctx.fillRect(0, 0, canvas.width, 250)
      
      // 绘制地面
      ctx.fillStyle = '#8b4513' // 棕色地面
      ctx.fillRect(0, 250, canvas.width, 150)
      
      // 绘制草地
      ctx.fillStyle = '#32cd32' // 绿色草地
      ctx.fillRect(0, 350, canvas.width, 50)

      // 绘制资源 - 更细致的资源图标
      resources.forEach(resource => {
        if (!resource.collected) {
          if (resource.name === '铁矿石') {
            // 绘制铁矿石
            ctx.fillStyle = '#888888'
            ctx.beginPath()
            ctx.arc(resource.x + 10, resource.y + 10, 10, 0, Math.PI * 2)
            ctx.fill()
            // 绘制纹理
            ctx.fillStyle = '#666666'
            ctx.fillRect(resource.x + 5, resource.y + 5, 10, 10)
          } else if (resource.name === '能量水晶') {
            // 绘制能量水晶
            ctx.fillStyle = '#00ffff'
            ctx.beginPath()
            ctx.moveTo(resource.x + 10, resource.y)
            ctx.lineTo(resource.x + 20, resource.y + 10)
            ctx.lineTo(resource.x + 10, resource.y + 20)
            ctx.lineTo(resource.x, resource.y + 10)
            ctx.closePath()
            ctx.fill()
            // 绘制光泽
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.moveTo(resource.x + 8, resource.y + 8)
            ctx.lineTo(resource.x + 12, resource.y + 8)
            ctx.lineTo(resource.x + 10, resource.y + 4)
            ctx.closePath()
            ctx.fill()
          } else if (resource.name === '草药') {
            // 绘制草药
            ctx.fillStyle = '#27ae60'
            ctx.fillRect(resource.x + 8, resource.y + 10, 4, 10)
            ctx.beginPath()
            ctx.arc(resource.x + 10, resource.y + 10, 8, 0, Math.PI * 2)
            ctx.fill()
          } else if (resource.name === '金币') {
            // 绘制金币
            ctx.fillStyle = '#ffd700'
            ctx.beginPath()
            ctx.arc(resource.x + 10, resource.y + 10, 10, 0, Math.PI * 2)
            ctx.fill()
            // 绘制金币纹理
            ctx.fillStyle = '#e6c200'
            ctx.beginPath()
            ctx.arc(resource.x + 10, resource.y + 10, 8, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = '#ffd700'
            ctx.beginPath()
            ctx.arc(resource.x + 10, resource.y + 10, 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // 绘制NPC - 参考仙剑奇侠传的风格
      npcs.forEach(npc => {
        // 绘制NPC头部
        ctx.fillStyle = '#f4d03f' // 皮肤色
        ctx.beginPath()
        ctx.arc(npc.x + 20, npc.y + 20, 10, 0, Math.PI * 2)
        ctx.fill()
        
        // 绘制NPC身体
        ctx.fillStyle = npc.name === '张三丰' ? '#27ae60' : npc.name === '赵敏' ? '#e74c3c' : '#3498db'
        ctx.fillRect(npc.x + 15, npc.y + 30, 10, 20)
        
        // 绘制NPC腿部
        ctx.fillStyle = '#5a3d2b'
        ctx.fillRect(npc.x + 15, npc.y + 50, 4, 10)
        ctx.fillRect(npc.x + 21, npc.y + 50, 4, 10)
        
        // 绘制NPC的眼睛
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(npc.x + 17, npc.y + 18, 2, 0, Math.PI * 2)
        ctx.arc(npc.x + 23, npc.y + 18, 2, 0, Math.PI * 2)
        ctx.fill()
        
        // 绘制NPC的名字
        ctx.fillStyle = '#5a3d2b'
        ctx.font = '12px Press Start 2P'
        ctx.fillText(npc.name, npc.x, npc.y - 5)
      })

      // 绘制角色 - 参考仙剑奇侠传的风格
      // 绘制角色头部
      ctx.fillStyle = '#f4d03f' // 皮肤色
      ctx.beginPath()
      ctx.arc(character.x + 20, character.y + 20, 10, 0, Math.PI * 2)
      ctx.fill()
      
      // 绘制角色头发
      ctx.fillStyle = '#5a3d2b'
      ctx.beginPath()
      ctx.arc(character.x + 20, character.y + 18, 12, 0, Math.PI)
      ctx.fill()
      
      // 绘制角色身体
      ctx.fillStyle = '#e74c3c' // 红色衣服
      ctx.fillRect(character.x + 15, character.y + 30, 10, 20)
      
      // 绘制角色腿部
      ctx.fillStyle = '#5a3d2b'
      ctx.fillRect(character.x + 15, character.y + 50, 4, 10)
      ctx.fillRect(character.x + 21, character.y + 50, 4, 10)
      
      // 绘制角色的眼睛
      ctx.fillStyle = '#000000'
      if (character.direction === 'left') {
        ctx.beginPath()
        ctx.arc(character.x + 17, character.y + 18, 2, 0, Math.PI * 2)
        ctx.arc(character.x + 21, character.y + 18, 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(character.x + 19, character.y + 18, 2, 0, Math.PI * 2)
        ctx.arc(character.x + 23, character.y + 18, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // 绘制角色的武器（如果有的话）
      if (character.direction === 'left') {
        ctx.fillStyle = '#8b4513'
        ctx.fillRect(character.x, character.y + 30, 15, 3)
      } else {
        ctx.fillStyle = '#8b4513'
        ctx.fillRect(character.x + 25, character.y + 30, 15, 3)
      }

      animationId = requestAnimationFrame(gameLoop)
    }

    animationId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [keys, character, npcs, resources, showDialogue])

  const handleCloseDialogue = () => {
    setShowDialogue(false)
    setCurrentNPC(null)
  }

  const handleQuestAccept = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, status: 'active' } : quest
    ))
  }

  const handleQuestComplete = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, status: 'completed' } : quest
    ))
  }

  const handleBackToWorldMap = () => {
    navigate('/world-map')
  }

  return (
    <div className="min-h-screen bg-[#f0e6d2] flex flex-col items-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20pattern%20background%20for%20wuxia%20game&image_size=square_hd')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      
      {/* 地点信息 */}
      <div className="w-full max-w-4xl mb-4 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#8b0000] font-['Press_Start_2P'] drop-shadow-md">
          {currentLocation.name}
        </h1>
        <p className="text-[#5a3d2b] font-['Press_Start_2P'] text-sm mt-2">
          {currentLocation.description}
        </p>
      </div>

      {/* 任务追踪 */}
      <div className="w-full max-w-4xl mb-4 relative z-10">
        <QuestTracker quests={quests} />
      </div>

      {/* 游戏画布 */}
      <canvas 
        ref={canvasRef} 
        className="border-4 border-[#d4a76a] rounded-lg shadow-lg relative z-10"
      />

      {/* 操作说明 */}
      <div className="mt-4 text-center text-[#5a3d2b] font-['Press_Start_2P'] text-sm relative z-10">
        <p>使用方向键移动角色</p>
        <p>靠近NPC触发对话</p>
        <p>靠近资源收集物品</p>
      </div>

      {/* 对话窗口 */}
      {showDialogue && currentNPC && (
        <DialogueBox
          npcName={currentNPC.name}
          dialogues={currentNPC.dialogues}
          onClose={handleCloseDialogue}
          onQuestAccept={handleQuestAccept}
          onQuestComplete={handleQuestComplete}
        />
      )}

      {/* 彩蛋发现弹窗 */}
      {showEasterEgg && currentEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#fff9e6] p-8 rounded-lg border-4 border-[#d4a76a] max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-[#8b0000] font-['Press_Start_2P'] mb-4 text-center drop-shadow-md">
              发现彩蛋！
            </h2>
            <h3 className="text-xl font-['Press_Start_2P'] text-[#5a3d2b] mb-2 text-center">
              {currentEasterEgg.name}
            </h3>
            <p className="text-[#5a3d2b] font-['Press_Start_2P'] text-sm mb-4 text-center">
              {currentEasterEgg.description}
            </p>
            <div className="mb-4">
              <h4 className="text-[#5a3d2b] font-['Press_Start_2P'] text-xs mb-2">奖励:</h4>
              <ul className="text-[#5a3d2b] font-['Press_Start_2P'] text-xs space-y-1">
                {currentEasterEgg.reward.resources.map((resource, index) => (
                  <li key={index}>• {resource.name}: {resource.quantity}</li>
                ))}
                {currentEasterEgg.reward.parts?.map((part, index) => (
                  <li key={index} className="text-[#8b0000]">• {part}</li>
                ))}
                {currentEasterEgg.reward.skills?.map((skill, index) => (
                  <li key={index} className="text-[#27ae60]">• {skill}</li>
                ))}
                {currentEasterEgg.reward.partners?.map((partner, index) => (
                  <li key={index} className="text-[#9b59b6]">• {partner}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="w-full bg-[#d4a76a] text-[#5a3d2b] py-3 px-4 rounded-md font-['Press_Start_2P'] text-sm hover:bg-[#c1945a] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              确定
            </button>
          </div>
        </div>
      )}

      {/* 返回按钮 */}
      <button
        onClick={handleBackToWorldMap}
        className="mt-8 bg-[#8b0000] text-white py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95 relative z-10"
      >
        返回地图
      </button>
    </div>
  )
}

export default ExplorationPage
