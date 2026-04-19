import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Skill {
  id: string
  name: string
  description: string
  energyCost: number
  damage: number
  cooldown: number
  range: number
}

interface Mech {
  id: string
  x: number
  y: number
  width: number
  height: number
  health: number
  energy: number
  direction: 'left' | 'right'
  isDefending: boolean
  isAttacking: boolean
  isUsingSkill: boolean
  velocityX: number
  velocityY: number
  onGround: boolean
  attackCooldown: number
  defenseCooldown: number
  skillCooldown: number
  skills: Skill[]
}

interface GameState {
  mech1: Mech
  mech2: Mech
  gameOver: boolean
  winner: string | null
}

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()
  const [gameState, setGameState] = useState<GameState>({
    mech1: {
      id: 'mech1',
      x: 100,
      y: 400,
      width: 60,
      height: 80,
      health: 100,
      energy: 100,
      direction: 'right',
      isDefending: false,
      isAttacking: false,
      isUsingSkill: false,
      velocityX: 0,
      velocityY: 0,
      onGround: true,
      attackCooldown: 0,
      defenseCooldown: 0,
      skillCooldown: 0,
      skills: [
        {
          id: 'skill1',
          name: '九阳神功',
          description: '释放九阳神功，对敌人造成大量伤害',
          energyCost: 30,
          damage: 25,
          cooldown: 60,
          range: 100
        }
      ]
    },
    mech2: {
      id: 'mech2',
      x: 700,
      y: 400,
      width: 60,
      height: 80,
      health: 100,
      energy: 100,
      direction: 'left',
      isDefending: false,
      isAttacking: false,
      isUsingSkill: false,
      velocityX: 0,
      velocityY: 0,
      onGround: true,
      attackCooldown: 0,
      defenseCooldown: 0,
      skillCooldown: 0,
      skills: [
        {
          id: 'skill2',
          name: '乾坤大挪移',
          description: '使用乾坤大挪移，对敌人造成伤害并击退',
          energyCost: 35,
          damage: 20,
          cooldown: 50,
          range: 120
        }
      ]
    },
    gameOver: false,
    winner: null
  })

  const [keys, setKeys] = useState<Record<string, boolean>>({
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ' ': false,
    Shift: false,
    'q': false,
    a: false,
    d: false,
    w: false,
    k: false,
    l: false,
    'p': false
  })

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
    canvas.width = 900
    canvas.height = 500

    const GRAVITY = 0.8
    const GROUND = 400
    const MAX_SPEED = 5
    const JUMP_FORCE = -15
    const ATTACK_COOLDOWN = 30
    const DEFENSE_COOLDOWN = 20
    const ENERGY_REGEN = 0.2
    const DEFENSE_ENERGY_COST = 1

    let animationId: number

    const gameLoop = () => {
      // 更新游戏状态
      setGameState(prevState => {
        let newMech1 = { ...prevState.mech1 }
        let newMech2 = { ...prevState.mech2 }

        // 处理冷却
        if (newMech1.attackCooldown > 0) newMech1.attackCooldown--
        if (newMech2.attackCooldown > 0) newMech2.attackCooldown--
        if (newMech1.defenseCooldown > 0) newMech1.defenseCooldown--
        if (newMech2.defenseCooldown > 0) newMech2.defenseCooldown--
        if (newMech1.skillCooldown > 0) newMech1.skillCooldown--
        if (newMech2.skillCooldown > 0) newMech2.skillCooldown--

        // 能量回复
        newMech1.energy = Math.min(100, newMech1.energy + ENERGY_REGEN)
        newMech2.energy = Math.min(100, newMech2.energy + ENERGY_REGEN)

        // 玩家1控制
        if (keys.ArrowLeft) {
          newMech1.velocityX = Math.max(-MAX_SPEED, newMech1.velocityX - 0.5)
          newMech1.direction = 'left'
        } else if (keys.ArrowRight) {
          newMech1.velocityX = Math.min(MAX_SPEED, newMech1.velocityX + 0.5)
          newMech1.direction = 'right'
        } else {
          newMech1.velocityX *= 0.8
        }

        if (keys.ArrowUp && newMech1.onGround) {
          newMech1.velocityY = JUMP_FORCE
          newMech1.onGround = false
        }

        if (keys[' '] && newMech1.attackCooldown === 0) {
          newMech1.isAttacking = true
          newMech1.attackCooldown = ATTACK_COOLDOWN
          // 检查攻击是否命中
          if (
            Math.abs(newMech1.x - newMech2.x) < newMech1.width + newMech2.width &&
            !newMech2.isDefending
          ) {
            newMech2.health = Math.max(0, newMech2.health - 10)
          }
        } else {
          newMech1.isAttacking = false
        }

        if (keys.Shift && newMech1.defenseCooldown === 0 && newMech1.energy > 0) {
          newMech1.isDefending = true
          newMech1.energy = Math.max(0, newMech1.energy - DEFENSE_ENERGY_COST)
        } else {
          newMech1.isDefending = false
          newMech1.defenseCooldown = DEFENSE_COOLDOWN
        }

        // 技能释放
        if (keys['q'] && newMech1.skillCooldown === 0 && newMech1.energy >= newMech1.skills[0].energyCost) {
          newMech1.isUsingSkill = true
          newMech1.skillCooldown = newMech1.skills[0].cooldown
          newMech1.energy = Math.max(0, newMech1.energy - newMech1.skills[0].energyCost)
          // 检查技能是否命中
          if (
            Math.abs(newMech1.x - newMech2.x) < newMech1.skills[0].range &&
            !newMech2.isDefending
          ) {
            newMech2.health = Math.max(0, newMech2.health - newMech1.skills[0].damage)
          }
        } else {
          newMech1.isUsingSkill = false
        }

        // 玩家2控制
        if (keys.a) {
          newMech2.velocityX = Math.max(-MAX_SPEED, newMech2.velocityX - 0.5)
          newMech2.direction = 'left'
        } else if (keys.d) {
          newMech2.velocityX = Math.min(MAX_SPEED, newMech2.velocityX + 0.5)
          newMech2.direction = 'right'
        } else {
          newMech2.velocityX *= 0.8
        }

        if (keys.w && newMech2.onGround) {
          newMech2.velocityY = JUMP_FORCE
          newMech2.onGround = false
        }

        if (keys.k && newMech2.attackCooldown === 0) {
          newMech2.isAttacking = true
          newMech2.attackCooldown = ATTACK_COOLDOWN
          // 检查攻击是否命中
          if (
            Math.abs(newMech2.x - newMech1.x) < newMech1.width + newMech2.width &&
            !newMech1.isDefending
          ) {
            newMech1.health = Math.max(0, newMech1.health - 10)
          }
        } else {
          newMech2.isAttacking = false
        }

        if (keys.l && newMech2.defenseCooldown === 0 && newMech2.energy > 0) {
          newMech2.isDefending = true
          newMech2.energy = Math.max(0, newMech2.energy - DEFENSE_ENERGY_COST)
        } else {
          newMech2.isDefending = false
          newMech2.defenseCooldown = DEFENSE_COOLDOWN
        }

        // 技能释放
        if (keys['p'] && newMech2.skillCooldown === 0 && newMech2.energy >= newMech2.skills[0].energyCost) {
          newMech2.isUsingSkill = true
          newMech2.skillCooldown = newMech2.skills[0].cooldown
          newMech2.energy = Math.max(0, newMech2.energy - newMech2.skills[0].energyCost)
          // 检查技能是否命中
          if (
            Math.abs(newMech2.x - newMech1.x) < newMech2.skills[0].range &&
            !newMech1.isDefending
          ) {
            newMech1.health = Math.max(0, newMech1.health - newMech2.skills[0].damage)
          }
        } else {
          newMech2.isUsingSkill = false
        }

        // 重力和碰撞
        newMech1.velocityY += GRAVITY
        newMech1.y += newMech1.velocityY
        if (newMech1.y >= GROUND - newMech1.height) {
          newMech1.y = GROUND - newMech1.height
          newMech1.velocityY = 0
          newMech1.onGround = true
        }

        newMech2.velocityY += GRAVITY
        newMech2.y += newMech2.velocityY
        if (newMech2.y >= GROUND - newMech2.height) {
          newMech2.y = GROUND - newMech2.height
          newMech2.velocityY = 0
          newMech2.onGround = true
        }

        // 边界检查
        newMech1.x = Math.max(0, Math.min(canvas.width - newMech1.width, newMech1.x + newMech1.velocityX))
        newMech2.x = Math.max(0, Math.min(canvas.width - newMech2.width, newMech2.x + newMech2.velocityX))

        // 检查游戏结束
        let gameOver = false
        let winner: string | null = null
        if (newMech1.health <= 0) {
          gameOver = true
          winner = '玩家2'
        } else if (newMech2.health <= 0) {
          gameOver = true
          winner = '玩家1'
        }

        return {
          mech1: newMech1,
          mech2: newMech2,
          gameOver,
          winner
        }
      })

      // 渲染游戏
      ctx.fillStyle = '#1a2b3c'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制地面
      ctx.fillStyle = '#34495e'
      ctx.fillRect(0, 400, canvas.width, 100)

      // 绘制机甲1
      ctx.fillStyle = gameState.mech1.isDefending ? '#3498db' : '#e74c3c'
      ctx.fillRect(gameState.mech1.x, gameState.mech1.y, gameState.mech1.width, gameState.mech1.height)
      // 绘制机甲1的眼睛
      ctx.fillStyle = 'white'
      ctx.fillRect(gameState.mech1.x + (gameState.mech1.direction === 'left' ? 10 : 40), gameState.mech1.y + 20, 10, 10)

      // 绘制机甲2
      ctx.fillStyle = gameState.mech2.isDefending ? '#3498db' : '#27ae60'
      ctx.fillRect(gameState.mech2.x, gameState.mech2.y, gameState.mech2.width, gameState.mech2.height)
      // 绘制机甲2的眼睛
      ctx.fillStyle = 'white'
      ctx.fillRect(gameState.mech2.x + (gameState.mech2.direction === 'left' ? 10 : 40), gameState.mech2.y + 20, 10, 10)

      // 绘制攻击动画
      if (gameState.mech1.isAttacking) {
        ctx.fillStyle = '#ff7f00'
        ctx.fillRect(gameState.mech1.x + (gameState.mech1.direction === 'right' ? gameState.mech1.width : -20), gameState.mech1.y + 20, 20, 40)
      }

      if (gameState.mech2.isAttacking) {
        ctx.fillStyle = '#ff7f00'
        ctx.fillRect(gameState.mech2.x + (gameState.mech2.direction === 'right' ? gameState.mech2.width : -20), gameState.mech2.y + 20, 20, 40)
      }

      // 绘制技能动画
      if (gameState.mech1.isUsingSkill) {
        ctx.fillStyle = '#ffff00'
        ctx.beginPath()
        ctx.arc(
          gameState.mech1.x + gameState.mech1.width / 2,
          gameState.mech1.y + gameState.mech1.height / 2,
          40,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      if (gameState.mech2.isUsingSkill) {
        ctx.fillStyle = '#00ffff'
        ctx.beginPath()
        ctx.arc(
          gameState.mech2.x + gameState.mech2.width / 2,
          gameState.mech2.y + gameState.mech2.height / 2,
          40,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      animationId = requestAnimationFrame(gameLoop)
    }

    animationId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [keys, gameState])

  // 检查游戏结束
  useEffect(() => {
    if (gameState.gameOver && gameState.winner) {
      navigate('/game-over', { state: { winner: gameState.winner } })
    }
  }, [gameState.gameOver, gameState.winner, navigate])

  return (
    <div className="min-h-screen bg-[#1a2b3c] flex flex-col items-center p-4">
      {/* 状态显示 */}
      <div className="w-full max-w-4xl flex justify-between mb-4">
        <div className="flex flex-col">
          <div className="font-['Press_Start_2P'] text-white text-lg mb-2">玩家1</div>
          <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${gameState.mech1.health}%` }}
            ></div>
          </div>
          <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${gameState.mech1.energy}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-['Press_Start_2P'] text-white text-lg mb-2">玩家2</div>
          <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${gameState.mech2.health}%` }}
            ></div>
          </div>
          <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${gameState.mech2.energy}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 游戏画布 */}
      <canvas 
        ref={canvasRef} 
        className="border-4 border-[#34495e] rounded-md"
      />

      {/* 移动设备控制按钮 */}
      <div className="mt-8 grid grid-cols-2 gap-8 w-full max-w-4xl md:hidden">
        <div className="space-y-4">
          <div className="text-center font-['Press_Start_2P'] text-white mb-2">玩家1控制</div>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#34495e] text-white w-12 h-12 rounded-full flex items-center justify-center">←</button>
            <button className="bg-[#34495e] text-white w-12 h-12 rounded-full flex items-center justify-center">↑</button>
            <button className="bg-[#34495e] text-white w-12 h-12 rounded-full flex items-center justify-center">→</button>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#e74c3c] text-white w-20 h-12 rounded-md flex items-center justify-center">攻击</button>
            <button className="bg-[#3498db] text-white w-20 h-12 rounded-md flex items-center justify-center">防御</button>
            <button className="bg-[#ffff00] text-black w-20 h-12 rounded-md flex items-center justify-center">技能</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-center font-['Press_Start_2P'] text-white mb-2">玩家2控制</div>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#34495e] text-white w-12 h-12 rounded-full flex items-center justify-center">A</button>
            <button className="bg-[#34495e] text-white w-12 h-12 rounded-full flex items-center justify-center">W</button>
            <button className="bg-[#34495e] text-white w-12 h-12 rounded-full flex items-center justify-center">D</button>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#27ae60] text-white w-20 h-12 rounded-md flex items-center justify-center">攻击</button>
            <button className="bg-[#3498db] text-white w-20 h-12 rounded-md flex items-center justify-center">防御</button>
            <button className="bg-[#00ffff] text-black w-20 h-12 rounded-md flex items-center justify-center">技能</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage
