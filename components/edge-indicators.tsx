"use client"

import { useEffect, useRef } from "react"
import { useGameStore } from "@/store/game-store"

export default function EdgeIndicators() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { canvasSize, gameStatus } = useGameStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    if (gameStatus !== "PLAYING") return

    // Draw edge indicators
    const drawEdgeIndicator = (x: number, y: number, width: number, height: number) => {
      const time = Date.now() / 1000
      const alpha = 0.3 + Math.sin(time * 2) * 0.1 // Pulsating effect

      ctx.fillStyle = `rgba(132, 204, 22, ${alpha})`
      ctx.fillRect(x, y, width, height)
    }

    // Top edge
    drawEdgeIndicator(0, 0, canvasSize.width, 2)

    // Bottom edge
    drawEdgeIndicator(0, canvasSize.height - 2, canvasSize.width, 2)

    // Left edge
    drawEdgeIndicator(0, 0, 2, canvasSize.height)

    // Right edge
    drawEdgeIndicator(canvasSize.width - 2, 0, 2, canvasSize.height)

    // Animation loop
    const animateEdges = () => {
      if (gameStatus === "PLAYING") {
        // Clear canvas
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

        // Redraw edges
        drawEdgeIndicator(0, 0, canvasSize.width, 2)
        drawEdgeIndicator(0, canvasSize.height - 2, canvasSize.width, 2)
        drawEdgeIndicator(0, 0, 2, canvasSize.height)
        drawEdgeIndicator(canvasSize.width - 2, 0, 2, canvasSize.height)

        requestAnimationFrame(animateEdges)
      }
    }

    const animationId = requestAnimationFrame(animateEdges)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [canvasSize, gameStatus])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className="absolute top-0 left-0 pointer-events-none"
    />
  )
}

