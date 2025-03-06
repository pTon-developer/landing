"use client"

interface ProgressBarProps {
  progress: number
  className?: string
}

export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-black border border-lime-500 ${className}`}>
      <div
        className="h-2 bg-lime-500 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px rgba(132, 204, 22, 0.7)",
        }}
      />
      <div className="flex justify-between text-xs text-lime-500 mt-1">
        <span>0%</span>
        <span>{progress}%</span>
        <span>100%</span>
      </div>
    </div>
  )
}

