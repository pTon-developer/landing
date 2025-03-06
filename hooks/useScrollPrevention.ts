"use client"

import { useEffect } from "react"

export function useScrollPrevention(prevent: boolean) {
  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (prevent) {
        e.preventDefault()
      }
    }

    if (prevent) {
      document.body.style.overflow = "hidden"
      window.addEventListener("touchmove", preventDefault, { passive: false })
      window.addEventListener("wheel", preventDefault, { passive: false })
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("touchmove", preventDefault)
      window.removeEventListener("wheel", preventDefault)
    }
  }, [prevent])
}

