"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import AsciiArt from "@/components/ascii-art"

export default function Footer() {
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
    <footer className="py-16 bg-black relative">
      <div className="absolute inset-0 from-black via-black to-lime-950/10 pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <AsciiArt className="mb-4 hidden md:block" />
            <h3 className="text-2xl font-bold text-lime-500 mb-4 md:hidden">pTon</h3>
            <p className="text-gray-400 mb-6">
              The first ton-powered snake game with real token rewards. Join the revolution in play-to-earn gaming.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/pTonMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-500 hover:text-lime-400"
              >
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
                >
                  <path d="M21.5 2l-18.5 9 5.5 3 4-5 4 5 5.5-3z"></path>
                  <path d="M14 22.5l-4.5-12.5"></path>
                </svg>
              </a>
              <a
                href="https://x.com/pTon105627"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-500 hover:text-lime-400"
              >
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
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-lime-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-lime-400">
                  About
                </a>
              </li>
              <li>
                <a href="#game-mechanics" className="text-gray-400 hover:text-lime-400">
                  Game Mechanics
                </a>
              </li>
              <li>
                <a href="#token-economy" className="text-gray-400 hover:text-lime-400">
                  Token Economy
                </a>
              </li>
              <li>
                <a href="#how-to-play" className="text-gray-400 hover:text-lime-400">
                  How To Play
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-gray-400 hover:text-lime-400">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-lime-400">
                  Team
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-lime-500 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">info@pton.app</li>
              <li className="text-gray-400">@pTonMedia</li>
              <li className="text-gray-400">01 Blockchain Street, Crypto City</li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="border-t border-lime-500/30 pt-8 text-center">
          <p className="text-gray-400">© 2025 pTon. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

