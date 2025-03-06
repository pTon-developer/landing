"use client"

import { useEffect, useRef } from "react"
import { useGameStore } from "@/store/game-store"

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { snake, food, canvasSize, gridSize, gameStatus } = useGameStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    // Draw background grid (subtle)
    ctx.strokeStyle = "rgba(132, 204, 22, 0.1)" // Subtle lime green
    ctx.lineWidth = 1

    for (let x = 0; x <= canvasSize.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasSize.height)
      ctx.stroke()
    }

    for (let y = 0; y <= canvasSize.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasSize.width, y)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      // Head has a different color
      if (index === 0) {
        ctx.fillStyle = "#84cc16" // Bright lime green
      } else {
        // Create a gradient from bright to darker green for the body
        const brightness = Math.max(0.4, 1 - index * 0.05)
        ctx.fillStyle = `rgba(132, 204, 22, ${brightness})`
      }

      // Draw rounded rectangle for segments
      const radius = 4
      ctx.beginPath()
      ctx.roundRect(segment.x + 1, segment.y + 1, gridSize - 2, gridSize - 2, radius)
      ctx.fill()

      // Add subtle glow effect to head
      if (index === 0) {
        ctx.shadowColor = "#84cc16"
        ctx.shadowBlur = 10
        ctx.fillRect(segment.x + 4, segment.y + 4, gridSize - 8, gridSize - 8)
        ctx.shadowBlur = 0
      }
    })

    // Draw food
    if (food) {
      ctx.fillStyle = "#84cc16"

      // Pulsating effect for food
      const time = Date.now() / 500
      const scale = 0.8 + Math.sin(time) * 0.1

      const centerX = food.x + gridSize / 2
      const centerY = food.y + gridSize / 2
      const radius = (gridSize / 2) * scale

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = "#84cc16"
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }, [snake, food, canvasSize, gridSize])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className="absolute top-[-2px] left-[-2px] bg-[#000e] backdrop-blur-lg outline-none"
      tabIndex={-1}
    />
  )
}

