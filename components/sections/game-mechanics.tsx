"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function GameMechanics() {
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
    <section id="game-mechanics" className="py-20 bg-black relative">
      <div className="absolute inset-0 from-lime-950/10 via-black to-black pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4 font-pixel">Game Mechanics</h2>
          <div className="w-24 h-1 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the strategic elements of pTon to dominate the game board and earn rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">Board Layout</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>A 5x5 grid of zones (25 zones total)</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>The central zone is distinct from the rest</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Four players represented by different colors: red, green, blue, and purple</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Players must pay an entry fee in tokens to participate</span>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-4 rounded-lg">
              <div className="aspect-square relative">
                <div className="grid grid-cols-5 grid-rows-5 h-full w-full gap-1">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const isCenter = i === 12
                    return (
                      <div
                        key={i}
                        className={`${isCenter ? "bg-lime-500/30" : "bg-lime-900/20"} border ${isCenter ? "border-lime-500" : "border-lime-900/50"} rounded-md flex items-center justify-center`}
                      >
                        {isCenter && <div className="w-4 h-4 bg-lime-500 rounded-full animate-pulse"></div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div variants={itemVariants}>
            <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-4 rounded-lg">
              <div className="aspect-square relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    {/* Regular zone */}
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-lime-900/20 border border-lime-900/50 rounded-md flex flex-col items-center justify-center p-2">
                      <div className="w-3 h-3 bg-lime-500/70 rounded-full mb-1"></div>
                      <div className="text-xs text-lime-500">+1 Length</div>
                      <div className="text-xs text-lime-500 mt-1">Cost: 10</div>
                    </div>

                    {/* Central zone */}
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-lime-500/30 border border-lime-500 rounded-md flex flex-col items-center justify-center p-2">
                      <div className="w-4 h-4 bg-lime-500 rounded-full mb-1 animate-pulse"></div>
                      <div className="text-xs text-lime-500">+2 Length</div>
                      <div className="text-xs text-lime-500 mt-1">Cost: 100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-lime-400 mb-4">Zone Properties</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-lime-300 mb-2">Non-central Zones:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-lime-500 mr-2">•</span>
                    <span>Generate food that replenishes 1 unit of snake length</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lime-500 mr-2">•</span>
                    <span>Cost 10 length units to capture</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-lime-300 mb-2">Central Zone:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-lime-500 mr-2">•</span>
                    <span>Generates food that replenishes 2 units of snake length</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lime-500 mr-2">•</span>
                    <span>Costs 100 length units to capture</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-lime-400 mb-4">Victory Conditions</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Win by capturing the most zones within a 10-minute timer, or</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Be the last surviving snake (via strategic play and combat)</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-lime-400 mb-4">Tail-Cutting Mechanic</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>
                  When engaging an opponent, aiming below the opponent's midline will successfully cut off their tail,
                  reducing their length
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Attacks made above the midline result in the attacker's immediate death</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-lime-400 mb-4">Energy Mechanic</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Each player has an energy reserve that allows temporary acceleration</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Every day, players receive a full 100% energy allotment</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>
                  Additional energy can be replenished by spending tokens, providing strategic boosts when needed
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-lime-400 mb-4">Token Economy</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Entry Fee: Tokens are required to join the game</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Rewards: Earn tokens based on your performance and zone control</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-500 mr-2">•</span>
                <span>Upgrades: Spend tokens to improve your snake's abilities and energy reserves</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

