"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface GameOverModalProps {
  score: number
  onRestart: () => void
}

export default function GameOverModal({ score, onRestart }: GameOverModalProps) {
  useEffect(() => {
    const glitchElement = document.getElementById("game-over-text")
    if (!glitchElement) return

    let glitchInterval: NodeJS.Timeout

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        glitchElement.classList.add("glitch")
        setTimeout(() => {
          glitchElement.classList.remove("glitch")
        }, 200)
      }, 2000)
    }

    startGlitch()
    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-between p-6 font-pixel">
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        .glitch {
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          text-shadow: 
            0.05em 0 0 rgba(255, 0, 0, 0.75),
            -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
            0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
      `}</style>

      <div className="text-center space-y-4">
        <h2 id="game-over-text" className="text-[24px] text-lime-500">
          GAME OVER
        </h2>

        <div className="space-y-2">
          <p className="text-[12px] text-lime-500">FINAL SCORE</p>
          <p className="text-[32px] text-lime-500">{score}</p>
        </div>
      </div>

      <Button
        onClick={onRestart}
        className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-pixel text-[16px] rounded-none tracking-wider"
      >
        PLAY AGAIN
      </Button>
    </div>
  )
}

