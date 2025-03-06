"use client"

import { Button } from "@/components/ui/button"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-between p-6 font-pixel">
      <div className="w-full space-y-6">
        <div className="text-center">
          <p className="text-[12px] text-lime-500">
            The classic snake game with
            <br />a hacker twist
          </p>
        </div>

        <div className="space-y-3 text-[12px] text-lime-500">
          <p>• Swipe/Arrow keys to change direction</p>
          <p>• Collect green dots to grow</p>
          <p>• Snake wraps around edges</p>
          <p>• Don't hit yourself</p>
          <p>• Speed increases as you grow</p>
        </div>
      </div>

      <Button
        onClick={onStart}
        className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-pixel text-[16px] rounded-none tracking-wider"
      >
        START GAME
      </Button>
    </div>
  )
}

