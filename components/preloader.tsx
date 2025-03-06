"use client"

import { useEffect, useState } from "react"
import { usePreloaderStore } from "@/store/preloader-store"
import { useGameStore } from "@/store/game-store"
import TerminalText from "./terminal-text"
import ProgressBar from "./progress-bar"
import AsciiArt from "./ascii-art"

export default function Preloader() {
  const { progress, isComplete, isTransitioning, terminalLines, initializeAssets, loadAllAssets } = usePreloaderStore()
  const { hasPlayedBefore } = useGameStore()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Initialize assets
    initializeAssets()

    // Start loading assets
    loadAllAssets()
  }, [initializeAssets, loadAllAssets])

  useEffect(() => {
    if (isComplete) {
      // Add a small delay before showing content
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isComplete])

  if (showContent) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className="mb-6 text-center">
          <AsciiArt className="mb-4" />
          <p className="text-lime-400 text-sm">System Initialization</p>
        </div>

        <div className="border-2 border-lime-500 bg-black bg-opacity-80 p-4 mb-6 bg-black">
          <TerminalText lines={terminalLines} className="h-48 md:h-64 mb-4 text-xs md:text-sm" />

          <ProgressBar progress={progress} />
        </div>

        <div className="text-center text-lime-400 text-xs animate-pulse">
          {progress < 100 ? "Loading..." : "Entering the Matrix..."}
        </div>
      </div>
    </div>
  )
}

