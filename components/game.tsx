"use client"

import { useEffect, useState, useRef } from "react"
import { useGameStore } from "@/store/game-store"
import { usePreloaderStore } from "@/store/preloader-store"
import GameCanvas from "./game-canvas"
import GameControls from "./game-controls"
import GameOverModal from "./game-over-modal"
import StartScreen from "./start-screen"
import BoundaryEffect from "./boundary-effect"
import EdgeIndicators from "./edge-indicators"
import Preloader from "./preloader"
import { initDB, saveHighScore, getHighScore } from "@/utils/indexed-db"
import { useScrollPrevention } from "@/hooks/useScrollPrevention"

export default function Game() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [shouldShowPreloader, setShouldShowPreloader] = useState(true)
  const { isComplete: isPreloaderComplete, setComplete } = usePreloaderStore()
  const gameRef = useRef<HTMLDivElement>(null)

  const {
    gameStatus,
    score,
    highScore,
    speed,
    moveSnake,
    startGame,
    resetGame,
    initGame,
    setHighScore,
    hasPlayedBefore,
    setHasPlayedBefore,
    toggleHeroAnimation,
  } = useGameStore()

  // Use scroll prevention only when the game is active and user hasn't played before
  useScrollPrevention(gameStatus === "PLAYING" && !hasPlayedBefore)

  // Initialize IndexedDB and check for existing high score
  useEffect(() => {
    const setupIndexedDB = async () => {
      await initDB()
      const savedHighScore = await getHighScore()

      if (savedHighScore !== null) {
        setHighScore(savedHighScore)
        if (savedHighScore > 0) {
          setHasPlayedBefore(true)
          // Always show preloader regardless of play history
        }
      }
    }

    setupIndexedDB()
  }, [setHighScore, setHasPlayedBefore, setComplete])

  // Save high score to IndexedDB when it changes
  useEffect(() => {
    if (gameStatus === "GAME_OVER" && score > 0 && score >= highScore) {
      saveHighScore(score)
    }
  }, [gameStatus, score, highScore])

  // Initialize game
  useEffect(() => {
    if (!isInitialized && isPreloaderComplete) {
      initGame()
      setIsInitialized(true)
    }
  }, [isInitialized, isPreloaderComplete, initGame])

  // Game loop
  useEffect(() => {
    let gameLoop: NodeJS.Timeout

    if (gameStatus === "PLAYING") {
      gameLoop = setInterval(() => {
        moveSnake()
      }, speed)
    }

    return () => clearInterval(gameLoop)
  }, [gameStatus, speed, moveSnake])

  // Activate hero animation when game is over
  useEffect(() => {
    if (gameStatus === "GAME_OVER") {
      toggleHeroAnimation()
    }
  }, [gameStatus, toggleHeroAnimation])

  // Focus the game container when the game starts
  useEffect(() => {
    if (gameStatus === "PLAYING" && gameRef.current) {
      gameRef.current.focus()
    }
  }, [gameStatus])

  return (
    <>
      <Preloader />

      <div
        ref={gameRef}
        className={`game-container transition-opacity max-w-[380px] duration-1000 ${
          isPreloaderComplete ? "opacity-100" : "opacity-0"
        } outline-none !important`}
      >
        {/* Score container with pixel-perfect positioning */}
        <div className="w-[380px] h-8 mb-1 flex items-center justify-between px-1 font-pixel text-[12px] tracking-wider">
          <div className="text-lime-500 flex items-center gap-2">
            <span>SCORE:</span>
            <span className="inline-block min-w-[30px]">{score}</span>
          </div>
          <div className="text-lime-500 flex items-center gap-2">
            <span>HIGH SCORE:</span>
            <span className="inline-block">{highScore}</span>
          </div>
        </div>

        {/* Game container */}
        <div className="w-[380px] h-[380px] relative border-2 border-lime-500 overflow-hidden backdrop-blur-[20px]">
          <GameCanvas />
          {gameStatus === "PLAYING" && <BoundaryEffect />}
          {gameStatus === "PLAYING" && <EdgeIndicators />}

          {gameStatus === "IDLE" && <StartScreen onStart={startGame} />}

          {gameStatus === "GAME_OVER" && <GameOverModal score={score} onRestart={resetGame} />}
        </div>

        <GameControls />
      </div>
    </>
  )
}

