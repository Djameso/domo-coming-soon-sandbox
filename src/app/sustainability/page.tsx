'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle'
import AskAI from '@/components/AskAI'
import ChargingRing from '@/components/ChargingRing'
import { Sun, Battery, Zap, Building2, Home, Sparkles } from 'lucide-react'

// Animation variants for the tier cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4 + i * 0.1,
      duration: 0.4,
    },
  }),
}

export default function Sustainability() {
  const tiersRef = useRef(null)
  const tiersInView = useInView(tiersRef, { once: true, margin: "-100px" })
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-light tracking-wider">
            <span className="font-semibold">DOMO</span>
            <span className="text-red-500">Living</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/amenities" className="text-white/70 hover:text-white transition-colors text-sm">Amenities</Link>
            <Link href="/units" className="text-white/70 hover:text-white transition-colors text-sm">Units</Link>
            <Link href="/building" className="text-white/70 hover:text-white transition-colors text-sm">Building</Link>
            <Link href="/solar" className="text-white/70 hover:text-white transition-colors text-sm">Sustainable Living</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/#waitlist"
              className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-all"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-yellow-500 text-sm tracking-[0.2em] uppercase mb-4">Three-Tier Solar System</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            The building that
            <br />
            <span className="text-yellow-500">powers itself</span>
          </h1>
          <p className="text-white/60 text-xl max-w-3xl mx-auto">
            DOMO Living is the <strong className="text-white">first BIPV residential building in San Diego</strong>. 
            Our efficient design maximizes solar production from three integrated systems — 
            passing the savings directly to you.
          </p>
        </div>
      </section>

      {/* Three Tier System */}
      <section className="py-24 px-6" ref={tiersRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={tiersInView ? "visible" : "hidden"}
          >
            
            {/* Tier 1: Balcony Solar */}
            <motion.div 
              className="bg-gradient-to-b from-yellow-500/10 to-transparent rounded-2xl p-8 border border-yellow-500/20 relative overflow-hidden group"
              variants={cardVariants}
            >
              {/* Animated background glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div 
                className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6 relative"
                variants={iconVariants}
              >
                <Home className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <p className="text-yellow-500 text-sm tracking-wider uppercase mb-2">Tier 1</p>
              <h3 className="text-2xl font-semibold mb-4">Solar Balconies</h3>
              <p className="text-white/60 mb-6">
                Your personal power plant. Every unit features private solar panels integrated into the balcony railing, 
                generating clean energy just for you.
              </p>
              <ul className="space-y-3 text-white/70 text-sm">
                {[
                  { icon: Zap, text: "Direct energy to your unit" },
                  { icon: Battery, text: "Paired with Enphase battery" },
                  { icon: Sparkles, text: "Visible savings on your bill" },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-2"
                    variants={listItemVariants}
                    custom={i}
                  >
                    <item.icon className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tier 2: BIPV Facade */}
            <motion.div 
              className="bg-gradient-to-b from-orange-500/10 to-transparent rounded-2xl p-8 border border-orange-500/20 relative overflow-hidden group"
              variants={cardVariants}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div 
                className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-6 relative"
                variants={iconVariants}
              >
                <Building2 className="w-8 h-8 text-orange-500" />
              </motion.div>
              <p className="text-orange-500 text-sm tracking-wider uppercase mb-2">Tier 2</p>
              <h3 className="text-2xl font-semibold mb-4">BIPV Facade</h3>
              <p className="text-white/60 mb-6">
                The building itself generates power. Building-Integrated Photovoltaics (BIPV) are woven into the 
                exterior facade — architecture and energy production, unified.
              </p>
              <ul className="space-y-3 text-white/70 text-sm">
                {[
                  { icon: Zap, text: "First BIPV residential in SD" },
                  { icon: Sun, text: "Powers common areas" },
                  { icon: Sparkles, text: "Seamless aesthetic design" },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-2"
                    variants={listItemVariants}
                    custom={i}
                  >
                    <item.icon className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tier 3: Rooftop Canopy */}
            <motion.div 
              className="bg-gradient-to-b from-red-500/10 to-transparent rounded-2xl p-8 border border-red-500/20 relative overflow-hidden group"
              variants={cardVariants}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div 
                className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6 relative"
                variants={iconVariants}
              >
                <Sun className="w-8 h-8 text-red-500" />
              </motion.div>
              <p className="text-red-500 text-sm tracking-wider uppercase mb-2">Tier 3</p>
              <h3 className="text-2xl font-semibold mb-4">Rooftop Canopies</h3>
              <p className="text-white/60 mb-6">
                Shade meets power. Solar canopy structures on our rooftop deck provide covered lounging areas 
                while generating additional clean energy for the building.
              </p>
              <ul className="space-y-3 text-white/70 text-sm">
                {[
                  { icon: Zap, text: "Dual-purpose structures" },
                  { icon: Sun, text: "Shaded outdoor spaces" },
                  { icon: Sparkles, text: "Maximizes rooftop potential" },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-2"
                    variants={listItemVariants}
                    custom={i}
                  >
                    <item.icon className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Net Positive Section - Scroll Animation */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#111] min-h-[100vh]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Animated Ring */}
            <div className="flex justify-center">
              <ChargingRing />
            </div>
            
            {/* Right: Content */}
            <div className="text-center md:text-left">
              <p className="text-green-500 text-sm tracking-wider uppercase mb-4">Scroll to charge</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Net-Positive
                <br />
                <span className="text-green-500">Energy Goal</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Our three-tier solar approach means DOMO Living aims to produce <strong className="text-white">more energy 
                than it consumes</strong>. Excess energy goes back to the grid — and savings go back to you.
              </p>
              
              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-3xl font-light text-green-500 mb-1">3</p>
                  <p className="text-white/50 text-xs uppercase">Solar Systems</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-3xl font-light text-green-500 mb-1">100%</p>
                  <p className="text-white/50 text-xs uppercase">Electric</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-3xl font-light text-green-500 mb-1">0</p>
                  <p className="text-white/50 text-xs uppercase">Gas Appliances</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-3xl font-light text-green-500 mb-1">$$$</p>
                  <p className="text-white/50 text-xs uppercase">You Save</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enphase Battery */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-green-500 text-sm tracking-wider uppercase mb-4">Energy Storage</p>
              <h2 className="text-4xl font-light mb-6">Enphase Battery System</h2>
              <p className="text-white/60 text-lg mb-6">
                Solar alone isn't enough. Each unit includes an Enphase battery system that stores excess 
                energy generated during the day, so you can use clean power even after the sun goes down.
              </p>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <Battery className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>In-unit battery storage for personal solar generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>Backup power during outages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>Smart energy management via DOMO app</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl p-12 border border-green-500/20 text-center">
              <Battery className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <p className="text-2xl font-light mb-2">Store. Save. Sustain.</p>
              <p className="text-white/50">Power when you need it, from the sun you captured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Live in San Diego's greenest building</h2>
          <p className="text-white/60 text-lg mb-8">
            Join the waitlist for DOMO Living — where sustainable living is built in, not bolted on.
          </p>
          <Link
            href="/#waitlist"
            className="inline-block px-10 py-4 bg-red-600 text-white text-lg font-semibold rounded hover:bg-red-500 transition-all"
          >
            Get Priority Access
          </Link>
        </div>
      </section>

      {/* Ask AI */}
      <AskAI context="sustainability" />

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <Link href="/" className="text-2xl font-light tracking-wider">
                <span className="font-semibold">DOMO</span>
                <span className="text-red-500">Living</span>
                <span className="text-white/50 text-lg ml-2">on 4th</span>
              </Link>
              <p className="text-white/30 text-sm mt-1">Living Made Easy™</p>
            </div>
            <nav className="flex gap-8 text-sm text-white/50">
              <Link href="/amenities" className="hover:text-white transition-colors">Amenities</Link>
              <Link href="/units" className="hover:text-white transition-colors">Units</Link>
              <Link href="/building" className="hover:text-white transition-colors">Building</Link>
              <Link href="/solar" className="hover:text-white transition-colors">Sustainable Living</Link>
            </nav>
            <div className="text-center md:text-right text-white/50">
              <p>3745 4th Avenue, Hillcrest, San Diego</p>
              <p className="text-red-500 mt-1">leasing@domoliving.com</p>
            </div>
          </div>
          <p className="text-white/20 text-[10px] leading-relaxed text-center mt-8 pt-6 border-t border-white/5">
            All renderings, images, amenities, and features are conceptual and subject to change. The building is under construction and final finishes, layouts, and specifications may vary. Sustainability goals and energy savings are projections, not guarantees. Furnishings shown are representative. Pricing subject to change. Contact leasing for current details.
          </p>
        </div>
      </footer>
    </main>
  )
}
