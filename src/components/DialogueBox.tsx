import React, { useState } from 'react'

interface DialogueOption {
  text: string
  nextDialogue: string
  condition?: () => boolean
  effect?: () => void
  questId?: string
  action?: 'accept' | 'complete'
}

interface Dialogue {
  id: string
  text: string
  options?: DialogueOption[]
  nextDialogue?: string
}

interface DialogueBoxProps {
  npcName: string
  dialogues: Dialogue[]
  onClose: () => void
  onDialogueEnd?: () => void
  onQuestAccept?: (questId: string) => void
  onQuestComplete?: (questId: string) => void
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ npcName, dialogues, onClose, onDialogueEnd, onQuestAccept, onQuestComplete }) => {
  const [currentDialogueId, setCurrentDialogueId] = useState(dialogues[0].id)
  const currentDialogue = dialogues.find(d => d.id === currentDialogueId) || dialogues[0]

  const handleOptionClick = (option: DialogueOption) => {
    if (option.condition && !option.condition()) {
      return
    }

    if (option.effect) {
      option.effect()
    }

    // 处理任务接受和完成
    if (option.questId) {
      if (option.action === 'accept' && onQuestAccept) {
        onQuestAccept(option.questId)
      } else if (option.action === 'complete' && onQuestComplete) {
        onQuestComplete(option.questId)
      }
    }

    if (option.nextDialogue === 'end') {
      onClose()
      if (onDialogueEnd) {
        onDialogueEnd()
      }
    } else {
      setCurrentDialogueId(option.nextDialogue)
    }
  }

  const handleNext = () => {
    if (currentDialogue.nextDialogue === 'end') {
      onClose()
      if (onDialogueEnd) {
        onDialogueEnd()
      }
    } else if (currentDialogue.nextDialogue) {
      setCurrentDialogueId(currentDialogue.nextDialogue)
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2c3e50] p-6 rounded-md border-4 border-[#3498db] w-full max-w-md z-50">
      <div className="font-['Press_Start_2P'] text-[#cd7f32] mb-4">
        {npcName}
      </div>
      <div className="font-['Press_Start_2P'] text-white mb-6">
        {currentDialogue.text}
      </div>
      {currentDialogue.options ? (
        <div className="space-y-2">
          {currentDialogue.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="w-full text-left bg-[#34495e] text-white py-2 px-4 rounded-md font-['Press_Start_2P'] text-sm hover:bg-[#3498db] transition-colors duration-200"
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={handleNext}
          className="bg-[#3498db] text-white py-2 px-4 rounded-md font-['Press_Start_2P'] text-sm hover:scale-105 transition-transform duration-200"
        >
          {currentDialogue.nextDialogue ? '继续' : '关闭'}
        </button>
      )}
    </div>
  )
}

export default DialogueBox
