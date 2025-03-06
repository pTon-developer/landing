"use client"

import { useEffect, useRef } from "react"
import { useGameStore } from "@/store/game-store"

export default function BoundaryEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { snake, direction, canvasSize, gridSize } = useGameStore()
  const lastHeadPosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!snake.length) return

    const head = snake[0]
    const lastHeadPos = lastHeadPosRef.current

    // Check if we need to show a boundary crossing effect
    if (lastHeadPos) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear previous effects
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

      // Check if the snake has wrapped around
      const hasWrappedHorizontally =
        Math.abs(head.x - lastHeadPos.x) > gridSize * 2 ||
        (head.x === 0 && lastHeadPos.x === canvasSize.width - gridSize) ||
        (head.x === canvasSize.width - gridSize && lastHeadPos.x === 0)

      const hasWrappedVertically =
        Math.abs(head.y - lastHeadPos.y) > gridSize * 2 ||
        (head.y === 0 && lastHeadPos.y === canvasSize.height - gridSize) ||
        (head.y === canvasSize.height - gridSize && lastHeadPos.y === 0)

      if (hasWrappedHorizontally || hasWrappedVertically) {
        // Draw portal effect at both the exit and entry points
        const exitX = lastHeadPos.x + gridSize / 2
        const exitY = lastHeadPos.y + gridSize / 2
        const entryX = head.x + gridSize / 2
        const entryY = head.y + gridSize / 2

        // Exit portal
        const exitGradient = ctx.createRadialGradient(exitX, exitY, 0, exitX, exitY, gridSize * 1.5)
        exitGradient.addColorStop(0, "rgba(132, 204, 22, 0.8)")
        exitGradient.addColorStop(0.5, "rgba(132, 204, 22, 0.3)")
        exitGradient.addColorStop(1, "rgba(132, 204, 22, 0)")

        ctx.beginPath()
        ctx.fillStyle = exitGradient
        ctx.arc(exitX, exitY, gridSize * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Entry portal
        const entryGradient = ctx.createRadialGradient(entryX, entryY, 0, entryX, entryY, gridSize * 1.5)
        entryGradient.addColorStop(0, "rgba(132, 204, 22, 0.8)")
        entryGradient.addColorStop(0.5, "rgba(132, 204, 22, 0.3)")
        entryGradient.addColorStop(1, "rgba(132, 204, 22, 0)")

        ctx.beginPath()
        ctx.fillStyle = entryGradient
        ctx.arc(entryX, entryY, gridSize * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Animate the effect to fade out
        let opacity = 1
        const fadeInterval = setInterval(() => {
          opacity -= 0.1
          if (opacity <= 0) {
            clearInterval(fadeInterval)
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
          } else {
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

            // Redraw with fading opacity
            const exitGradient = ctx.createRadialGradient(exitX, exitY, 0, exitX, exitY, gridSize * 1.5)
            exitGradient.addColorStop(0, `rgba(132, 204, 22, ${opacity * 0.8})`)
            exitGradient.addColorStop(0.5, `rgba(132, 204, 22, ${opacity * 0.3})`)
            exitGradient.addColorStop(1, "rgba(132, 204, 22, 0)")

            ctx.beginPath()
            ctx.fillStyle = exitGradient
            ctx.arc(exitX, exitY, gridSize * 1.5, 0, Math.PI * 2)
            ctx.fill()

            const entryGradient = ctx.createRadialGradient(entryX, entryY, 0, entryX, entryY, gridSize * 1.5)
            entryGradient.addColorStop(0, `rgba(132, 204, 22, ${opacity * 0.8})`)
            entryGradient.addColorStop(0.5, `rgba(132, 204, 22, ${opacity * 0.3})`)
            entryGradient.addColorStop(1, "rgba(132, 204, 22, 0)")

            ctx.beginPath()
            ctx.fillStyle = entryGradient
            ctx.arc(entryX, entryY, gridSize * 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }, 50)
      }
    }

    // Update last head position
    lastHeadPosRef.current = { ...head }
  }, [snake, canvasSize, gridSize])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className="absolute top-0 left-0 z-10 pointer-events-none"
    />
  )
}

