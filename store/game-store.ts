import { create } from "zustand"

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
export type GameStatus = "IDLE" | "PLAYING" | "GAME_OVER"

export interface Position {
  x: number
  y: number
}

export interface GameState {
  snake: Position[]
  food: Position | null
  direction: Direction
  nextDirection: Direction
  score: number
  highScore: number
  gameStatus: GameStatus
  speed: number
  gridSize: number
  canvasSize: { width: number; height: number }
  hasPlayedBefore: boolean
  heroAnimationActive: boolean
  heroAnimationPhase: number

  // Actions
  initGame: () => void
  startGame: () => void
  moveSnake: () => void
  setDirection: (direction: Direction) => void
  setFood: () => void
  increaseScore: () => void
  gameOver: () => void
  resetGame: () => void
  setHasPlayedBefore: (value: boolean) => void
  setHighScore: (score: number) => void
  activateSpeedBoost: () => void
  attemptZoneCapture: () => void
  toggleHeroAnimation: () => void
  updateHeroAnimationPhase: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  snake: [],
  food: null,
  direction: "RIGHT",
  nextDirection: "RIGHT",
  score: 0,
  highScore: 0,
  gameStatus: "IDLE",
  speed: 150,
  gridSize: 20,
  canvasSize: { width: 380, height: 380 },
  hasPlayedBefore: false,
  heroAnimationActive: false,
  heroAnimationPhase: 0,

  // Add the new methods
  setHasPlayedBefore: (value: boolean) => set({ hasPlayedBefore: value }),
  setHighScore: (score: number) => set({ highScore: score }),

  // Update the gameOver method to set hasPlayedBefore to true
  gameOver: () => {
    const { score, highScore } = get()
    const newHighScore = Math.max(score, highScore)

    // Update the high score if needed
    if (score > highScore) {
      set({ highScore: score })
      // We'll handle the IndexedDB save in the Game component
    }

    set({
      gameStatus: "GAME_OVER",
      hasPlayedBefore: true,
    })
  },

  initGame: () => {
    const gridSize = get().gridSize
    const centerX = Math.floor(380 / gridSize / 2) * gridSize
    const centerY = Math.floor(380 / gridSize / 2) * gridSize

    set({
      snake: [
        { x: centerX, y: centerY },
        { x: centerX - gridSize, y: centerY },
        { x: centerX - gridSize * 2, y: centerY },
      ],
      direction: "RIGHT",
      nextDirection: "RIGHT",
      score: 0,
      gameStatus: "IDLE",
      speed: 150,
    })

    get().setFood()
  },

  startGame: () => set({ gameStatus: "PLAYING" }),

  moveSnake: () => {
    const { snake, food, nextDirection, gridSize, canvasSize } = get()
    const direction = nextDirection

    // Create new head based on direction
    const head = { ...snake[0] }

    switch (direction) {
      case "UP":
        head.y -= gridSize
        // Wrap around if the snake goes off the top edge
        if (head.y < 0) {
          head.y = canvasSize.height - gridSize
        }
        break
      case "DOWN":
        head.y += gridSize
        // Wrap around if the snake goes off the bottom edge
        if (head.y >= canvasSize.height) {
          head.y = 0
        }
        break
      case "LEFT":
        head.x -= gridSize
        // Wrap around if the snake goes off the left edge
        if (head.x < 0) {
          head.x = canvasSize.width - gridSize
        }
        break
      case "RIGHT":
        head.x += gridSize
        // Wrap around if the snake goes off the right edge
        if (head.x >= canvasSize.width) {
          head.x = 0
        }
        break
    }

    // Check for self collision
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return get().gameOver()
      }
    }

    // Create new snake array with new head
    const newSnake = [head, ...snake]

    // Check if snake ate food
    if (food && head.x === food.x && head.y === food.y) {
      get().increaseScore()
      get().setFood()
    } else {
      // Remove tail if no food was eaten
      newSnake.pop()
    }

    set({ snake: newSnake, direction })
  },

  setDirection: (newDirection) => {
    const { direction } = get()

    // Prevent 180-degree turns
    if (
      (direction === "UP" && newDirection === "DOWN") ||
      (direction === "DOWN" && newDirection === "UP") ||
      (direction === "LEFT" && newDirection === "RIGHT") ||
      (direction === "RIGHT" && newDirection === "LEFT")
    ) {
      return
    }

    set({ nextDirection: newDirection })
  },

  setFood: () => {
    const { snake, gridSize, canvasSize } = get()
    let newFood: Position
    let foodOnSnake = true

    // Generate food position that's not on the snake
    while (foodOnSnake) {
      const x = Math.floor(Math.random() * (canvasSize.width / gridSize)) * gridSize
      const y = Math.floor(Math.random() * (canvasSize.height / gridSize)) * gridSize
      newFood = { x, y }

      foodOnSnake = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    }

    set({ food: newFood! })
  },

  increaseScore: () => {
    const { score, speed } = get()
    const newScore = score + 1
    const newSpeed = Math.max(50, speed - 2) // Increase speed (lower interval)

    set({
      score: newScore,
      highScore: Math.max(newScore, get().highScore),
      speed: newSpeed,
    })
  },

  resetGame: () => {
    const { canvasSize } = get()
    get().initGame()
  },

  activateSpeedBoost: () => {
    const { gameStatus, speed } = get()
    if (gameStatus === "PLAYING") {
      // Implement speed boost logic here
      const boostedSpeed = Math.max(50, speed - 50) // Increase speed (lower interval)
      set({ speed: boostedSpeed })

      // Reset speed after a short duration
      setTimeout(() => {
        set({ speed: get().speed + 50 })
      }, 1000) // Speed boost lasts for 1 second
    }
  },

  attemptZoneCapture: () => {
    const { gameStatus } = get()
    if (gameStatus === "PLAYING") {
      // Implement zone capture logic here
      console.log("Attempting to capture zone")
      // You'll need to add more complex logic based on your game rules
    }
  },
  toggleHeroAnimation: () =>
    set((state) => ({
      heroAnimationActive: !state.heroAnimationActive,
    })),
  updateHeroAnimationPhase: () =>
    set((state) => ({
      heroAnimationPhase: (state.heroAnimationPhase + 1) % 4,
    })),
}))

