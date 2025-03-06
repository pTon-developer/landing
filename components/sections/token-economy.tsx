"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function TokenEconomy() {
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
    <section id="token-economy" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-lime-950/5 to-black pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4 font-pixel">Token Economy</h2>
          <div className="w-24 h-1 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The pTon token powers our entire ecosystem, creating a sustainable play-to-earn model.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-500"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Game Entry</h3>
            <p className="text-gray-400 text-center">
              Pay entry fees with pTon tokens to participate in competitive matches.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-500"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Rewards</h3>
            <p className="text-gray-400 text-center">
              Earn pTon tokens based on your performance, zone control, and victories.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-500"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Staking</h3>
            <p className="text-gray-400 text-center">
              Stake your pTon tokens to earn passive income and exclusive in-game benefits.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg"
          >
            <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Governance</h3>
            <p className="text-gray-400 text-center">
              Hold pTon tokens to vote on game updates, features, and ecosystem decisions.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-8 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-lime-500 mb-2">1B</h3>
              <p className="text-gray-300">Total Supply</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-lime-500 mb-2">40%</h3>
              <p className="text-gray-300">Play-to-Earn Rewards</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-lime-500 mb-2">20%</h3>
              <p className="text-gray-300">Ecosystem Development</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <button className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 px-8 rounded-md text-lg">
            View Tokenomics
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

