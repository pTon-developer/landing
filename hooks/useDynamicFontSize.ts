"use client"

import { useState, useEffect } from "react"

export function useDynamicFontSize(baseSize: number, minSize: number, maxSize: number) {
  const [fontSize, setFontSize] = useState(baseSize)

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const smallestDimension = Math.min(width, height)

      // Calculate font size based on screen size
      let newSize = Math.floor(smallestDimension / 30)

      // Clamp the font size between minSize and maxSize
      newSize = Math.max(minSize, Math.min(newSize, maxSize))

      setFontSize(newSize)
    }

    updateFontSize()
    window.addEventListener("resize", updateFontSize)

    return () => window.removeEventListener("resize", updateFontSize)
  }, [minSize, maxSize])

  return fontSize
}

