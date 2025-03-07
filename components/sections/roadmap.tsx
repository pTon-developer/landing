"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Roadmap() {
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
    <section id="roadmap" className="py-20 bg-black relative">
      <div className="absolute inset-0 from-lime-950/10 via-black to-black pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4 font-pixel">Roadmap</h2>
          <div className="w-24 h-1 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our development plan for bringing pTon to life and expanding the ecosystem.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-lime-500/30"></div>

          {/* Q1 2023 */}
          <motion.div variants={itemVariants} className="relative mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <h3 className="text-2xl font-bold text-lime-400 mb-2">Q1 2025</h3>
                <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-lime-300 mb-3">Concept & Design</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Initial game concept development</li>
                    <li>Tokenomics design and planning</li>
                    <li>Technical architecture blueprint</li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left"></div>
            </div>
          </motion.div>

          {/* Q2 2023 */}
          <motion.div variants={itemVariants} className="relative mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-2xl font-bold text-lime-400 mb-2">Q2 2025</h3>
                <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-lime-300 mb-3">Prototype Development</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Core gameplay mechanics implementation</li>
                    <li>Smart contract development</li>
                    <li>Alpha testing with small user group</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Q3 2023 */}
          <motion.div variants={itemVariants} className="relative mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <h3 className="text-2xl font-bold text-lime-400 mb-2">Q3 2025</h3>
                <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-lime-300 mb-3">Beta Launch</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Public beta release</li>
                    <li>Token pre-sale</li>
                    <li>Community building initiatives</li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left"></div>
            </div>
          </motion.div>

          {/* Q4 2023 */}
          <motion.div variants={itemVariants} className="relative mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-2xl font-bold text-lime-400 mb-2">Q4 2025</h3>
                <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-lime-300 mb-3">Full Launch</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Official game launch</li>
                    <li>Token listing on exchanges</li>
                    <li>Marketing campaign rollout</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Q1 2024 */}
          <motion.div variants={itemVariants} className="relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <h3 className="text-2xl font-bold text-lime-400 mb-2">Q1 2026</h3>
                <div className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-lime-300 mb-3">Expansion</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>New game modes and features</li>
                    <li>Mobile app release</li>
                    <li>Partnerships and integrations</li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

