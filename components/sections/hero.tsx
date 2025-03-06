"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Game from "@/components/game"
import MatrixRain from "@/components/matrix-rain"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/store/game-store"
import { usePreloaderStore } from "@/store/preloader-store"
import { useScrollPrevention } from "@/hooks/useScrollPrevention"

export default function Hero() {
  const [showGame, setShowGame] = useState(false)
  const { gameStatus, hasPlayedBefore, heroAnimationActive, heroAnimationPhase, updateHeroAnimationPhase } =
    useGameStore()
  const { isComplete: isPreloaderComplete } = usePreloaderStore()
  const [showHeader, setShowHeader] = useState(false)

  // Prevent scrolling only when game is active and user hasn't played before
  useScrollPrevention(!hasPlayedBefore && gameStatus === "IDLE")

  // Show game after preloader completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGame(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Determine whether to show the header based on game state and hasPlayedBefore
  useEffect(() => {
    if (isPreloaderComplete) {
      if (hasPlayedBefore || gameStatus === "GAME_OVER") {
        setShowHeader(true)
      }
    }
  }, [gameStatus, hasPlayedBefore, isPreloaderComplete])

  // Handle hero animation cycle
  useEffect(() => {
    let animationInterval: NodeJS.Timeout

    if (heroAnimationActive) {
      animationInterval = setInterval(() => {
        updateHeroAnimationPhase()
      }, 3000) // Change animation phase every 3 seconds
    }

    return () => {
      if (animationInterval) clearInterval(animationInterval)
    }
  }, [heroAnimationActive, updateHeroAnimationPhase])

  // Get animation properties based on current phase
  const getAnimationProps = () => {
    const phases = [
      { x: 0, scale: 1, opacity: 1 },
      { x: -20, scale: 1.05, opacity: 0.9 },
      { x: 0, scale: 1, opacity: 1 },
      { x: 20, scale: 0.95, opacity: 0.9 },
    ]

    return phases[heroAnimationPhase]
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <MatrixRain opacity={0.1} />

      <div className="container mx-auto px-4 py-20 z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {showHeader ? (
          // Show header and navigation when game is over or user has played before
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: heroAnimationActive ? getAnimationProps().x : 0,
              scale: heroAnimationActive ? getAnimationProps().scale : 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeInOut", // Add smooth easing
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-lime-500 mb-6 font-pixel"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              pTon
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-lime-300 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              The first ton-powered snake game with real token rewards
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 px-8 rounded-md text-lg"
                onClick={() =>
                  window.scrollTo({ top: document.getElementById("about")?.offsetTop, behavior: "smooth" })
                }
              >
                Learn More
              </Button>
              <Button
                variant="outline"
                className="border-lime-500 text-lime-500 hover:bg-white-500/80 backdrop-blur-md font-bold py-3 px-8 rounded-md text-lg"
              >
                buy on Blum
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          // Show only the game when in initial state
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-md mx-auto flex items-center justify-center">{showGame && <Game />}</div>
          </motion.div>
        )}

        {showHeader && (
          // Only show the game on the right side when header is visible
          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-md mx-auto  flex items-center justify-center">{showGame && <Game />}</div>
          </motion.div>
        )}
      </div>

      {showHeader && (
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div
            className="animate-bounce cursor-pointer"
            onClick={() => window.scrollTo({ top: document.getElementById("about")?.offsetTop, behavior: "smooth" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-lime-500"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>
      )}
    </section>
  )
}

