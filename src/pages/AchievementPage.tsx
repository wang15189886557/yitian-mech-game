import React, { useState } from 'react';
import { achievements } from '../data/achievements';

const AchievementPage: React.FC = () => {
  const [achievementList, setAchievementList] = useState(achievements);

  const claimReward = (id: string) => {
    setAchievementList(prev => 
      prev.map(achievement => 
        achievement.id === id 
          ? { ...achievement, status: 'claimed' }
          : achievement
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-500">成就系统</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {achievementList.map(achievement => (
          <div 
            key={achievement.id} 
            className={`bg-gray-800 rounded-lg p-6 border-2 transition-all duration-300 ${
              achievement.status === 'locked' ? 'border-gray-700 opacity-60' :
              achievement.status === 'unlocked' ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' :
              'border-green-500'
            }`}
          >
            <h2 className={`text-xl font-bold mb-2 ${
              achievement.status === 'locked' ? 'text-gray-400' :
              achievement.status === 'unlocked' ? 'text-yellow-500' :
              'text-green-500'
            }`}>
              {achievement.name}
            </h2>
            <p className="text-gray-300 mb-4">{achievement.description}</p>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">奖励:</h3>
              <ul className="text-sm">
                {achievement.reward.resources.map((resource, index) => (
                  <li key={index} className="text-gray-300">
                    {resource.name}: {resource.quantity}
                  </li>
                ))}
                {achievement.reward.parts?.map((part, index) => (
                  <li key={index} className="text-blue-400">
                    {part}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end">
              {achievement.status === 'unlocked' && (
                <button
                  onClick={() => claimReward(achievement.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  领取奖励
                </button>
              )}
              {achievement.status === 'claimed' && (
                <span className="text-green-500 font-semibold">已领取</span>
              )}
              {achievement.status === 'locked' && (
                <span className="text-gray-400">未解锁</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          返回
        </button>
      </div>
    </div>
  );
};

export default AchievementPage;
