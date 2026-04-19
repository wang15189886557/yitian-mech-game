import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleStartGame = () => {
    navigate('/game')
  }

  const handleWorldMap = () => {
    navigate('/world-map')
  }

  return (
    <div className="min-h-screen bg-[#f0e6d2] flex flex-col items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20pattern%20background%20for%20wuxia%20game&image_size=square_hd')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      
      {/* 游戏标题 */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-[#8b0000] mb-4 font-['Press_Start_2P'] drop-shadow-md animate-pulse">
          倚天机甲传
        </h1>
        <p className="text-xl text-[#5a3d2b] font-['Press_Start_2P']">
          HEAVEN SWORD MECH LEGEND
        </p>
      </div>

      {/* 游戏logo */}
      <div className="mb-12 relative z-10">
        <div className="w-64 h-64 bg-[#d4a76a] rounded-full flex items-center justify-center shadow-lg">
          <div className="w-48 h-48 bg-[#8b0000] rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white font-['Press_Start_2P'] text-center">倚天
机甲</span>
          </div>
        </div>
      </div>

      {/* 按钮组 */}
      <div className="flex flex-col sm:flex-row gap-6 relative z-10">
        <button
          onClick={handleStartGame}
          className="bg-[#d4a76a] text-[#5a3d2b] py-4 px-8 text-2xl font-['Press_Start_2P'] rounded-md hover:bg-[#c1945a] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          机甲对战
        </button>
        <button
          onClick={handleWorldMap}
          className="bg-[#8b0000] text-white py-4 px-8 text-2xl font-['Press_Start_2P'] rounded-md hover:bg-[#6b0000] transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          江湖地图
        </button>
      </div>

      {/* 操作说明 */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
        <div className="bg-[#fff9e6] p-6 rounded-lg border-4 border-[#d4a76a] shadow-md">
          <h2 className="text-2xl font-['Press_Start_2P'] text-[#8b0000] mb-4 text-center">玩家1控制</h2>
          <div className="space-y-3 text-[#5a3d2b] font-['Press_Start_2P'] text-sm">
            <div>← →: 左右移动</div>
            <div>↑: 跳跃</div>
            <div>空格: 攻击</div>
            <div>Shift: 防御</div>
            <div>Q: 九阳神功</div>
            <div>W: 乾坤大挪移</div>
          </div>
        </div>
        <div className="bg-[#fff9e6] p-6 rounded-lg border-4 border-[#d4a76a] shadow-md">
          <h2 className="text-2xl font-['Press_Start_2P'] text-[#8b0000] mb-4 text-center">玩家2控制</h2>
          <div className="space-y-3 text-[#5a3d2b] font-['Press_Start_2P'] text-sm">
            <div>A D: 左右移动</div>
            <div>W: 跳跃</div>
            <div>K: 攻击</div>
            <div>L: 防御</div>
            <div>U: 九阳神功</div>
            <div>I: 乾坤大挪移</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
