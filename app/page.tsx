import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import GameMechanics from "@/components/sections/game-mechanics"
import TokenEconomy from "@/components/sections/token-economy"
import HowToPlay from "@/components/sections/how-to-play"
import Roadmap from "@/components/sections/roadmap"
import Team from "@/components/sections/team"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Hero />
      <About />
      <GameMechanics />
      <TokenEconomy />
      <HowToPlay />
      <Roadmap />
      <Team />
      <Footer />
    </main>
  )
}

