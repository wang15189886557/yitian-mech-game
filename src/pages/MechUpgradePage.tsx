import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mechParts, MechPart } from '../data/mechParts'

interface Resource {
  name: string
  quantity: number
}

const MechUpgradePage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedPart, setSelectedPart] = useState<MechPart>(mechParts[0])
  const [resources, setResources] = useState<Resource[]>([
    { name: '铁矿石', quantity: 50 },
    { name: '能量水晶', quantity: 30 },
    { name: '草药', quantity: 20 },
    { name: '金币', quantity: 100 }
  ])

  const handlePartSelect = (part: MechPart) => {
    setSelectedPart(part)
  }

  const handleUpgrade = () => {
    if (selectedPart.level >= selectedPart.maxLevel) {
      return
    }

    const upgradeCost = selectedPart.upgradeCost[selectedPart.level]
    if (!upgradeCost) return

    // 检查资源是否足够
    const canUpgrade = Object.entries(upgradeCost).every(([resource, cost]) => {
      const playerResource = resources.find(r => r.name === resource)
      return playerResource && playerResource.quantity >= cost
    })

    if (!canUpgrade) {
      alert('资源不足')
      return
    }

    // 消耗资源
    setResources(prev => prev.map(resource => {
      const cost = upgradeCost[resource.name]
      if (cost) {
        return { ...resource, quantity: resource.quantity - cost }
      }
      return resource
    }))

    // 升级部件
    const updatedParts = mechParts.map(part => 
      part.id === selectedPart.id ? { ...part, level: part.level + 1 } : part
    )
    // 这里应该更新全局状态，但为了演示，我们只更新本地状态
    setSelectedPart({ ...selectedPart, level: selectedPart.level + 1 })
  }

  const getUpgradedStats = (part: MechPart) => {
    if (part.level >= part.maxLevel) return part.baseStats
    
    const multiplier = 1 + (part.level * 0.2)
    const upgradedStats: Record<string, number> = {}
    
    Object.entries(part.baseStats).forEach(([stat, value]) => {
      upgradedStats[stat] = Math.floor(value * multiplier)
    })
    
    return upgradedStats
  }

  const handleBackToWorldMap = () => {
    navigate('/world-map')
  }

  return (
    <div className="min-h-screen bg-[#1a2b3c] flex flex-col items-center p-4">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-[#cd7f32] mb-4 font-['Press_Start_2P']">
          机甲升级
        </h1>
        <p className="text-xl text-white font-['Press_Start_2P']">
          升级你的机甲部件，提升战斗力
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* 部件列表 */}
        <div className="lg:col-span-1">
          <div className="bg-[#2c3e50] p-4 rounded-md border-4 border-[#3498db]">
            <h2 className="font-['Press_Start_2P'] text-[#cd7f32] mb-4">部件列表</h2>
            <div className="space-y-3">
              {mechParts.map((part) => (
                <div
                  key={part.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedPart.id === part.id ? 'bg-[#3498db]' : 'bg-[#34495e] hover:bg-[#3498db]'
                  }`}
                  onClick={() => handlePartSelect(part)}
                >
                  <div className="font-['Press_Start_2P'] text-white text-sm">
                    {part.name}
                  </div>
                  <div className="font-['Press_Start_2P'] text-gray-400 text-xs">
                    等级: {part.level}/{part.maxLevel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 资源列表 */}
          <div className="bg-[#2c3e50] p-4 rounded-md border-4 border-[#3498db] mt-6">
            <h2 className="font-['Press_Start_2P'] text-[#cd7f32] mb-4">资源</h2>
            <div className="space-y-2">
              {resources.map((resource) => (
                <div key={resource.name} className="flex justify-between items-center">
                  <div className="font-['Press_Start_2P'] text-white text-sm">
                    {resource.name}
                  </div>
                  <div className="font-['Press_Start_2P'] text-white text-sm">
                    {resource.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 部件详情 */}
        <div className="lg:col-span-2">
          <div className="bg-[#2c3e50] p-6 rounded-md border-4 border-[#3498db]">
            <h2 className="font-['Press_Start_2P'] text-[#cd7f32] mb-4 text-2xl">
              {selectedPart.name}
            </h2>
            <p className="font-['Press_Start_2P'] text-white text-sm mb-6">
              {selectedPart.description}
            </p>

            {/* 部件属性 */}
            <div className="mb-6">
              <h3 className="font-['Press_Start_2P'] text-[#cd7f32] mb-3">属性</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(getUpgradedStats(selectedPart)).map(([stat, value]) => (
                  <div key={stat} className="bg-[#34495e] p-3 rounded-md">
                    <div className="font-['Press_Start_2P'] text-gray-400 text-xs mb-1">
                      {stat === 'attack' ? '攻击力' : 
                       stat === 'defense' ? '防御力' : 
                       stat === 'health' ? '生命值' : 
                       stat === 'energy' ? '能量值' : 
                       stat === 'speed' ? '速度' : 
                       stat === 'range' ? '攻击范围' : stat}
                    </div>
                    <div className="font-['Press_Start_2P'] text-white text-lg">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 升级信息 */}
            <div className="mb-6">
              <h3 className="font-['Press_Start_2P'] text-[#cd7f32] mb-3">升级</h3>
              {selectedPart.level < selectedPart.maxLevel ? (
                <div>
                  <p className="font-['Press_Start_2P'] text-white text-sm mb-3">
                    升级到等级 {selectedPart.level + 1}
                  </p>
                  <div className="bg-[#34495e] p-3 rounded-md mb-4">
                    <h4 className="font-['Press_Start_2P'] text-gray-400 text-xs mb-2">
                      所需资源
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(selectedPart.upgradeCost[selectedPart.level] || {}).map(([resource, cost]) => (
                        <div key={resource} className="flex justify-between items-center">
                          <div className="font-['Press_Start_2P'] text-white text-sm">
                            {resource}
                          </div>
                          <div className="font-['Press_Start_2P'] text-white text-sm">
                            {cost}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleUpgrade}
                    className="bg-[#ff7f00] text-white py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:scale-110 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    升级
                  </button>
                </div>
              ) : (
                <div className="font-['Press_Start_2P'] text-white text-sm">
                  已达到最高等级
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 返回按钮 */}
      <button
        onClick={handleBackToWorldMap}
        className="mt-8 bg-[#34495e] text-white py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:scale-110 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        返回地图
      </button>
    </div>
  )
}

export default MechUpgradePage
