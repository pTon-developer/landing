"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About() {
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
    <section id="about" className="py-20 bg-black relative">
      <div className="absolute inset-0 from-black via-black to-lime-950/10 pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4 font-pixel">About pTon</h2>
          <div className="w-24 h-1 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            pTon is a revolutionary blockchain-powered gaming platform that combines the nostalgic gameplay of Snake
            with modern crypto economics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Play to Earn</h3>
            <p className="text-gray-400 text-center">
              Compete in strategic snake battles and earn real cryptocurrency tokens based on your performance.
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
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Strategic Gameplay</h3>
            <p className="text-gray-400 text-center">
              Master the art of zone control, resource management, and tactical combat to dominate the game board.
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-lime-400 mb-3 text-center">Secure Blockchain</h3>
            <p className="text-gray-400 text-center">
              Built on TON blockchain technology, ensuring transparent gameplay, secure transactions, and true ownership
              of in-game assets.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

