"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function HowToPlay() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="how-to-play" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-lime-950/10 pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4 font-pixel">How To Play</h2>
          <div className="w-24 h-1 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started with pTon is easy. Follow these steps to begin your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center text-black font-bold z-10">
              1
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg pt-10">
              <h3 className="text-xl font-bold text-lime-400 mb-3">Connect Your Wallet</h3>
              <p className="text-gray-400">
                Link your TON wallet to the pTon platform to manage your tokens and game assets.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center text-black font-bold z-10">
              2
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg pt-10">
              <h3 className="text-xl font-bold text-lime-400 mb-3">Purchase Entry Tokens</h3>
              <p className="text-gray-400">
                Buy pTon tokens to pay entry fees and unlock premium features in the game.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center text-black font-bold z-10">
              3
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg pt-10">
              <h3 className="text-xl font-bold text-lime-400 mb-3">Join a Game</h3>
              <p className="text-gray-400">
                Enter a match by paying the entry fee and compete against other players for rewards.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-8 rounded-lg mb-16"
        >
          <h3 className="text-2xl font-bold text-lime-400 mb-6 text-center">Game Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-lime-300 mb-4">Desktop Controls</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-lime-500 mr-2">•</span>
                  <span>
                    <strong>Arrow Keys:</strong> Control snake direction
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-lime-500 mr-2">•</span>
                  <span>
                    <strong>Spacebar:</strong> Activate speed boost (uses energy)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-lime-500 mr-2">•</span>
                  <span>
                    <strong>Z Key:</strong> Attempt to capture current zone
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-lime-300 mb-4">Mobile Controls</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-lime-500 mr-2">•</span>
                  <span>
                    <strong>Swipe:</strong> Change snake direction
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-lime-500 mr-2">•</span>
                  <span>
                    <strong>Double Tap:</strong> Activate speed boost
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-lime-500 mr-2">•</span>
                  <span>
                    <strong>Long Press:</strong> Attempt to capture current zone
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <button className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 px-8 rounded-md text-lg">
            Read Full Documentation
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

