import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "pTon - Snake Game",
    short_name: "pTon",
    description: "A modern Snake game with a hacker aesthetic",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#84cc16",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

