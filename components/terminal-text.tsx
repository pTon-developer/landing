"use client"

import { useEffect, useRef } from "react"

interface TerminalTextProps {
  lines: string[]
  className?: string
}

export default function TerminalText({ lines, className = "" }: TerminalTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`font-mono text-lime-500 overflow-y-auto custom-scrollbar ${className}`}
      style={{ textShadow: "0 0 5px rgba(132, 204, 22, 0.5)" }}
    >
      {lines.map((line, index) => (
        <div key={index} className={`mb-1 ${index === lines.length - 1 ? "animate-pulse" : ""}`}>
          {line}
          {index === lines.length - 1 && <span className="inline-block w-2 h-4 ml-1 bg-lime-500 animate-blink"></span>}
        </div>
      ))}
    </div>
  )
}

