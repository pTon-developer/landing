import { create } from "zustand"

export type AssetType = "font" | "image" | "audio" | "data"

export interface Asset {
  id: string
  type: AssetType
  name: string
  url?: string
  loaded: boolean
  weight: number // Relative weight for progress calculation
}

export interface PreloaderState {
  assets: Asset[]
  progress: number
  isComplete: boolean
  isTransitioning: boolean
  terminalLines: string[]

  // Actions
  initializeAssets: () => void
  loadAsset: (assetId: string) => Promise<void>
  loadAllAssets: () => Promise<void>
  updateProgress: () => void
  addTerminalLine: (line: string) => void
  setTransitioning: (transitioning: boolean) => void
  setComplete: (complete: boolean) => void
}

export const usePreloaderStore = create<PreloaderState>((set, get) => ({
  assets: [],
  progress: 0,
  isComplete: false,
  isTransitioning: false,
  terminalLines: [],

  initializeAssets: () => {
    // Define all assets that need to be loaded
    const assets: Asset[] = [
      {
        id: "font-press-start-2p",
        type: "font",
        name: "Press Start 2P",
        loaded: false,
        weight: 20,
      },
      {
        id: "font-inter",
        type: "font",
        name: "Inter",
        loaded: false,
        weight: 15,
      },
      {
        id: "game-data",
        type: "data",
        name: "Game Configuration",
        loaded: false,
        weight: 10,
      },
      {
        id: "system-boot",
        type: "data",
        name: "System Boot Sequence",
        loaded: false,
        weight: 15,
      },
      {
        id: "neural-network",
        type: "data",
        name: "Neural Network Initialization",
        loaded: false,
        weight: 20,
      },
      {
        id: "security-protocols",
        type: "data",
        name: "Security Protocols",
        loaded: false,
        weight: 10,
      },
      {
        id: "matrix-connection",
        type: "data",
        name: "Matrix Connection",
        loaded: false,
        weight: 10,
      },
    ]

    set({ assets })
  },

  loadAsset: async (assetId: string) => {
    const { assets, addTerminalLine } = get()
    const asset = assets.find((a) => a.id === assetId)

    if (!asset) return

    // Simulate loading with different times based on weight
    const loadTime = asset.weight * 100 + Math.random() * 1000

    addTerminalLine(`> Loading ${asset.name}...`)

    await new Promise((resolve) => setTimeout(resolve, loadTime))

    // Mark asset as loaded
    set({
      assets: assets.map((a) => (a.id === assetId ? { ...a, loaded: true } : a)),
    })

    addTerminalLine(`> ${asset.name} loaded successfully.`)

    // Update progress
    get().updateProgress()
  },

  loadAllAssets: async () => {
    const { assets, loadAsset } = get()

    // Load assets sequentially for better visual effect
    for (const asset of assets) {
      await loadAsset(asset.id)
    }

    // Add final terminal lines
    get().addTerminalLine("> All systems initialized.")
    get().addTerminalLine("> pTon system ready.")
    get().addTerminalLine("> Entering the Matrix...")

    // Short delay before completion
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Set transitioning state
    get().setTransitioning(true)

    // Short delay for transition animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Set complete state
    get().setComplete(true)
  },

  updateProgress: () => {
    const { assets } = get()
    const totalWeight = assets.reduce((sum, asset) => sum + asset.weight, 0)
    const loadedWeight = assets.filter((asset) => asset.loaded).reduce((sum, asset) => sum + asset.weight, 0)

    const progress = Math.round((loadedWeight / totalWeight) * 100)
    set({ progress })
  },

  addTerminalLine: (line: string) => {
    set((state) => ({
      terminalLines: [...state.terminalLines, line],
    }))
  },

  setTransitioning: (transitioning: boolean) => {
    set({ isTransitioning: transitioning })
  },

  setComplete: (complete: boolean) => {
    set({ isComplete: complete })
  },
}))

