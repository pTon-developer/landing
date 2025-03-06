"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useGameStore } from "@/store/game-store"

export default function GameControls() {
  const { setDirection, gameStatus, activateSpeedBoost, attemptZoneCapture } = useGameStore()
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const minSwipeDistance = 30 // Minimum distance for a swipe to register
  const maxTapDuration = 200 // Maximum duration for a tap in milliseconds
  const controlsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== "PLAYING") return

      // Prevent default behavior for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "ArrowUp":
          setDirection("UP")
          break
        case "ArrowDown":
          setDirection("DOWN")
          break
        case "ArrowLeft":
          setDirection("LEFT")
          break
        case "ArrowRight":
          setDirection("RIGHT")
          break
        case " ": // Spacebar
          e.preventDefault() // Prevent spacebar from scrolling the page
          activateSpeedBoost()
          break
        case "z":
        case "Z":
          attemptZoneCapture()
          break
      }
    }

    const currentRef = controlsRef.current
    if (currentRef) {
      currentRef.focus()
      currentRef.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [gameStatus, setDirection, activateSpeedBoost, attemptZoneCapture])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameStatus !== "PLAYING") return

    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameStatus !== "PLAYING") return
    // Prevent scrolling when swiping
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (gameStatus !== "PLAYING" || !touchStartRef.current) return

    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    const { x: startX, y: startY, time: startTime } = touchStartRef.current

    const deltaX = endX - startX
    const deltaY = endY - startY
    const duration = Date.now() - startTime

    if (duration < maxTapDuration) {
      // Handle tap (double tap for speed boost)
      activateSpeedBoost()
    } else {
      // Handle swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) >= minSwipeDistance) {
          setDirection(deltaX > 0 ? "RIGHT" : "LEFT")
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) >= minSwipeDistance) {
          setDirection(deltaY > 0 ? "DOWN" : "UP")
        }
      }
    }

    touchStartRef.current = null
  }

  if (gameStatus !== "PLAYING") {
    return null
  }

  return (
    <div
      ref={controlsRef}
      className="w-full h-full absolute top-0 left-0 z-10 touch-none outline-none"
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e) => e.preventDefault()} // Prevent context menu on long press
    />
  )
}

