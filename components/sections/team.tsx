"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Team() {
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

  const teamMembers = [
    {
      name: "Fedor Fimozin",
      role: "Founder & CEO",
      bio: "Blockchain enthusiast with 3+ years in game development",
      image: "/pic (1).webp",
    },
    {
      name: "Igor 'Cryptodaddy'",
      role: "CTO",
      bio: "Former lead developer at major gaming studios",
      image: "/pic (4).webp",
    },
    {
      name: "Milana Veselova",
      role: "Game Designer and SMM",
      bio: "Award-winning designer with a passion for innovative gameplay",
      image: "/pic (3).webp",
    },
    {
      name: "Hulio Mazzoni",
      role: "Tokenomics Specialist",
      bio: "Economics PhD with expertise in crypto token models",
      image: "/pic (2).webp",
    },
  ]

  return (
    <section id="team" className="py-20 bg-black relative">
      <div className="absolute inset-0 from-black via-black to-lime-950/10 pointer-events-none"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4 font-pixel">Our Team</h2>
          <div className="w-24 h-1 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the talented individuals behind pTon who are revolutionizing blockchain gaming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/50 backdrop-blur-sm border border-lime-500/30 p-6 rounded-lg text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-lime-500">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-lime-400 mb-1">{member.name}</h3>
              <p className="text-lime-300 mb-3">{member.role}</p>
              <p className="text-gray-400">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

