import React from 'react'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/locations'

const WorldMapPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLocationClick = (locationId: string) => {
    navigate(`/exploration/${locationId}`)
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleMechUpgrade = () => {
    navigate('/mech-upgrade')
  }

  return (
    <div className="min-h-screen bg-[#f0e6d2] flex flex-col items-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20pattern%20background%20for%20wuxia%20game&image_size=square_hd')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      
      {/* 标题 */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-[#8b0000] mb-4 font-['Press_Start_2P'] drop-shadow-md">
          江湖地图
        </h1>
        <p className="text-xl text-[#5a3d2b] font-['Press_Start_2P']">
          选择一个地点开始你的冒险
        </p>
      </div>

      {/* 地点列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`bg-[#fff9e6] p-6 rounded-lg border-4 ${location.available ? 'border-[#d4a76a]' : 'border-[#b3b3b3]'} hover:scale-105 transition-all duration-300 cursor-pointer relative shadow-md hover:shadow-lg`}
            onClick={() => location.available && handleLocationClick(location.id)}
          >
            {!location.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-white font-['Press_Start_2P'] text-xl drop-shadow-md">
                  等级 {location.level} 解锁
                </div>
              </div>
            )}
            <div className="flex flex-col items-center mb-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${location.available ? 'bg-[#d4a76a]' : 'bg-[#b3b3b3]'}`}>
                <span className="text-3xl font-bold text-white">{location.name.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-['Press_Start_2P'] text-[#8b0000] mb-2 text-center">
                {location.name}
              </h2>
            </div>
            <p className="text-[#5a3d2b] font-['Press_Start_2P'] text-sm mb-4 text-center">
              {location.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-[#5a3d2b] font-['Press_Start_2P'] text-xs">
                等级: {location.level}
              </div>
              {location.available && (
                <div className="bg-[#d4a76a] text-[#5a3d2b] px-4 py-2 rounded-md font-['Press_Start_2P'] text-xs hover:bg-[#c1945a] transition-colors duration-200">
                  探索
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 按钮组 */}
      <div className="flex flex-wrap justify-center gap-4 mt-12 relative z-10">
        <button
          onClick={handleBackToHome}
          className="bg-[#8b0000] text-white py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          返回首页
        </button>
        <button
          onClick={handleMechUpgrade}
          className="bg-[#d4a76a] text-[#5a3d2b] py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:bg-[#c1945a] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          机甲升级
        </button>
        <button
          onClick={() => navigate('/achievements')}
          className="bg-[#ffd700] text-[#5a3d2b] py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:bg-[#e6c200] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          成就系统
        </button>
        <button
          onClick={() => navigate('/levels')}
          className="bg-[#9b59b6] text-white py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:bg-[#8a48a6] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          关卡挑战
        </button>
      </div>
    </div>
  )
}

export default WorldMapPage
