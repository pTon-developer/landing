"use client"

interface AsciiArtProps {
  className?: string
}

export default function AsciiArt({ className = "" }: AsciiArtProps) {
  return (
    <pre className={`text-lime-500 text-xs leading-tight font-mono ${className}`}>
      {`
 ██████╗ ████████╗ ██████╗ ███╗   ██╗
 ██╔══██╗╚══██╔══╝██╔═══██╗████╗  ██║
 ██████╔╝   ██║   ██║   ██║██╔██╗ ██║
 ██╔═══╝    ██║   ██║   ██║██║╚██╗██║
 ██║        ██║   ╚██████╔╝██║ ╚████║
 ╚═╝        ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
                                     
      `}
    </pre>
  )
}

