import React from 'react'
import { Quest } from '../data/quests'

interface QuestTrackerProps {
  quests: Quest[]
}

const QuestTracker: React.FC<QuestTrackerProps> = ({ quests }) => {
  const activeQuests = quests.filter(quest => quest.status === 'active')
  const completedQuests = quests.filter(quest => quest.status === 'completed')

  return (
    <div className="bg-[#2c3e50] p-4 rounded-md border-4 border-[#3498db] mb-4">
      <h3 className="font-['Press_Start_2P'] text-[#cd7f32] mb-3 text-lg">任务追踪</h3>
      
      {activeQuests.length > 0 ? (
        <div className="space-y-3">
          {activeQuests.map((quest) => (
            <div key={quest.id} className="bg-[#34495e] p-3 rounded-md">
              <div className="font-['Press_Start_2P'] text-white text-sm mb-2">
                {quest.name}
              </div>
              <div className="font-['Press_Start_2P'] text-gray-300 text-xs mb-2">
                {quest.description}
              </div>
              <div className="space-y-1">
                {quest.objectives.map((objective) => (
                  <div key={objective.id} className="flex justify-between items-center">
                    <div className="font-['Press_Start_2P'] text-xs text-gray-400">
                      {objective.type === 'talk' ? '与' : 
                       objective.type === 'collect' ? '收集' : 
                       objective.type === 'kill' ? '击败' : '到达'}
                      {objective.target}
                    </div>
                    <div className="font-['Press_Start_2P'] text-xs text-white">
                      {objective.progress}/{objective.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="font-['Press_Start_2P'] text-white text-sm">
          没有活跃的任务
        </div>
      )}

      {completedQuests.length > 0 && (
        <div className="mt-4">
          <h4 className="font-['Press_Start_2P'] text-[#cd7f32] mb-2 text-sm">已完成任务</h4>
          <div className="space-y-2">
            {completedQuests.map((quest) => (
              <div key={quest.id} className="font-['Press_Start_2P'] text-gray-400 text-xs">
                {quest.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestTracker
