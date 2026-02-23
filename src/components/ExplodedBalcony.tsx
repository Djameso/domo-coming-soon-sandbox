'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

// Callout data - positions are percentages relative to image
const callouts = [
  {
    id: 'handrail',
    label: 'Hand Rail',
    sublabel: 'Optional safety feature',
    position: { top: '8%', left: '25%' },
    lineEnd: { x: -60, y: -20 },
    color: 'gray',
    triggerStart: 0.15,
    triggerEnd: 0.25,
  },
  {
    id: 'glass',
    label: 'Tempered Glass',
    sublabel: 'Weather protection layer',
    position: { top: '32%', right: '5%' },
    lineEnd: { x: 40, y: 0 },
    color: 'cyan',
    triggerStart: 0.25,
    triggerEnd: 0.35,
  },
  {
    id: 'solar',
    label: 'Solar Cells',
    sublabel: 'Power generation',
    position: { top: '55%', left: '5%' },
    lineEnd: { x: -40, y: 0 },
    color: 'blue',
    triggerStart: 0.35,
    triggerEnd: 0.45,
  },
  {
    id: 'base',
    label: 'Aluminum Base',
    sublabel: 'Structural frame',
    position: { top: '82%', right: '15%' },
    lineEnd: { x: 30, y: 20 },
    color: 'orange',
    triggerStart: 0.45,
    triggerEnd: 0.55,
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  gray: { bg: 'bg-gray-500/20', text: 'text-gray-300', border: 'border-gray-500', dot: 'bg-gray-400' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-500', dot: 'bg-cyan-400' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500', dot: 'bg-blue-400' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500', dot: 'bg-orange-400' },
}

export default function ExplodedBalcony() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <div ref={containerRef} className="relative min-h-[120vh] py-24">
      <div className="sticky top-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-yellow-500 text-sm tracking-wider uppercase mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Solar Balcony <span className="text-yellow-500">Technology</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Scroll to explore each layer of our integrated solar balcony system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image with callouts */}
            <div className="relative">
              {/* The actual exploded view image */}
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <Image
                  src="/images/solar-balcony.png"
                  alt="Solar Balcony Exploded View"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Callout overlays */}
                {callouts.map((callout) => (
                  <Callout 
                    key={callout.id} 
                    callout={callout} 
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            {/* Right: Layer list */}
            <div className="space-y-4">
              <p className="text-white/40 text-sm mb-6">Four precision-engineered layers:</p>
              {callouts.map((callout) => (
                <LayerCard 
                  key={callout.id} 
                  callout={callout} 
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Callout({ 
  callout, 
  scrollProgress 
}: { 
  callout: typeof callouts[0]
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(
    scrollProgress,
    [callout.triggerStart - 0.05, callout.triggerStart, callout.triggerEnd, callout.triggerEnd + 0.1],
    [0, 1, 1, 0.3]
  )
  
  const scale = useTransform(
    scrollProgress,
    [callout.triggerStart - 0.05, callout.triggerStart],
    [0.8, 1]
  )

  const colors = colorMap[callout.color]

  return (
    <motion.div
      className="absolute z-10"
      style={{
        ...callout.position,
        opacity,
        scale,
      }}
    >
      {/* Pulsing dot */}
      <div className="relative">
        <span className={`absolute w-3 h-3 rounded-full ${colors.dot} animate-ping opacity-75`} />
        <span className={`relative block w-3 h-3 rounded-full ${colors.dot}`} />
      </div>
      
      {/* Label card */}
      <motion.div 
        className={`absolute whitespace-nowrap ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg px-3 py-1.5 -translate-y-1/2`}
        style={{
          left: callout.lineEnd.x > 0 ? '20px' : 'auto',
          right: callout.lineEnd.x < 0 ? '20px' : 'auto',
          top: '50%',
        }}
      >
        <p className={`text-sm font-medium ${colors.text}`}>{callout.label}</p>
      </motion.div>
    </motion.div>
  )
}

function LayerCard({ 
  callout, 
  scrollProgress 
}: { 
  callout: typeof callouts[0]
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const isActive = useTransform(
    scrollProgress,
    [callout.triggerStart - 0.05, callout.triggerStart, callout.triggerEnd],
    [0, 1, 1]
  )
  
  const colors = colorMap[callout.color]

  return (
    <motion.div 
      className={`p-4 rounded-xl border transition-all duration-300 ${colors.bg} border-white/10`}
      style={{
        opacity: useTransform(isActive, [0, 1], [0.4, 1]),
        scale: useTransform(isActive, [0, 1], [0.98, 1]),
        x: useTransform(isActive, [0, 1], [-10, 0]),
      }}
    >
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
        <div>
          <p className={`font-medium ${colors.text}`}>{callout.label}</p>
          <p className="text-white/40 text-sm">{callout.sublabel}</p>
        </div>
      </div>
    </motion.div>
  )
}
