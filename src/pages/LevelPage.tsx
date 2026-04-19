import React from 'react';
import { useNavigate } from 'react-router-dom';
import { levels } from '../data/levels';

const LevelPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLevelClick = (levelId: string) => {
    // 这里可以添加关卡开始的逻辑，比如显示关卡剧情，然后进入战斗
    navigate('/game');
  };

  const handleBackToWorldMap = () => {
    navigate('/world-map');
  };

  return (
    <div className="min-h-screen bg-[#1a2b3c] flex flex-col items-center p-4">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-[#cd7f32] mb-4 font-['Press_Start_2P']">
          关卡挑战
        </h1>
        <p className="text-xl text-white font-['Press_Start_2P']">
          完成倚天屠龙记的经典故事情节
        </p>
      </div>

      {/* 关卡列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`bg-[#2c3e50] p-6 rounded-md border-4 ${level.available ? 'border-[#3498db]' : 'border-[#888888]'} hover:scale-105 transition-transform duration-200 cursor-pointer relative`}
            onClick={() => level.available && handleLevelClick(level.id)}
          >
            {!level.available && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-md">
                <div className="text-white font-['Press_Start_2P'] text-xl">
                  等级 {level.level} 解锁
                </div>
              </div>
            )}
            <h2 className="text-2xl font-['Press_Start_2P'] text-[#cd7f32] mb-2">
              {level.name}
            </h2>
            <p className="text-white font-['Press_Start_2P'] text-sm mb-4">
              {level.description}
            </p>
            <div className="mb-4">
              <h3 className="text-white font-['Press_Start_2P'] text-xs mb-2">任务目标:</h3>
              <ul className="text-white font-['Press_Start_2P'] text-xs space-y-1">
                {level.objectives.map((objective, index) => (
                  <li key={index}>• {objective}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-white font-['Press_Start_2P'] text-xs">
                等级: {level.level}
              </div>
              {level.available && (
                <div className="bg-[#3498db] text-white px-3 py-1 rounded-md font-['Press_Start_2P'] text-xs">
                  挑战
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 返回按钮 */}
      <div className="mt-12">
        <button
          onClick={handleBackToWorldMap}
          className="bg-[#34495e] text-white py-3 px-6 text-xl font-['Press_Start_2P'] rounded-md hover:scale-110 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          返回江湖地图
        </button>
      </div>
    </div>
  );
};

export default LevelPage;
