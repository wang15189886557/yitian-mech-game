import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const GameOverPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const winner = location.state?.winner || '未知'

  const handleRestartGame = () => {
    navigate('/game')
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#1a2b3c] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-[#ff7f00] mb-8 font-['Press_Start_2P'] animate-pulse">
          游戏结束
        </h1>
        <div className="text-4xl md:text-6xl font-['Press_Start_2P'] text-white mb-8">
          {winner} 获胜!
        </div>
        <div className="text-xl text-white font-['Press_Start_2P'] mb-12">
          恭喜你赢得了战斗！
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={handleRestartGame}
          className="bg-[#ff7f00] text-white py-4 px-8 text-2xl font-['Press_Start_2P'] rounded-md hover:scale-110 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          重新开始
        </button>
        <button
          onClick={handleBackToHome}
          className="bg-[#34495e] text-white py-4 px-8 text-2xl font-['Press_Start_2P'] rounded-md hover:scale-110 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          返回首页
        </button>
      </div>
    </div>
  )
}

export default GameOverPage
