'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ChargingRing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to ring progress (0 to 1)
  const ringProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
  const boltFill = useTransform(scrollYProgress, [0.2, 0.7], [0, 100])
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [0, 0.5, 1])
  
  // Ring dimensions
  const size = 280
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div ref={containerRef} className="relative flex items-center justify-center">
      {/* Outer glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-green-500/20 blur-3xl"
        style={{ opacity: glowOpacity }}
      />
      
      {/* SVG Ring + Lightning Bolt */}
      <svg width={size} height={size} className="relative z-10">
        {/* Background ring (track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Animated progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: useTransform(ringProgress, (p) => circumference * (1 - p)),
            rotate: -90,
            transformOrigin: 'center',
          }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          
          {/* Clip path for lightning bolt fill animation */}
          <clipPath id="boltClip">
            <motion.rect
              x="0"
              y={size}
              width={size}
              height={size}
              style={{
                y: useTransform(boltFill, (f) => size - (size * f / 100))
              }}
            />
          </clipPath>
        </defs>
        
        {/* Lightning bolt - outline */}
        <g transform={`translate(${size/2 - 40}, ${size/2 - 55})`}>
          <path
            d="M45 0 L15 45 L35 45 L25 90 L70 35 L45 35 L55 0 Z"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
        </g>
        
        {/* Lightning bolt - filled (animated) */}
        <g transform={`translate(${size/2 - 40}, ${size/2 - 55})`} clipPath="url(#boltClip)">
          <path
            d="M45 0 L15 45 L35 45 L25 90 L70 35 L45 35 L55 0 Z"
            fill="url(#boltGradient)"
          />
        </g>
        
        {/* Bolt gradient */}
        <defs>
          <linearGradient id="boltGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Percentage text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: useTransform(ringProgress, [0, 0.1], [0, 1]) }}
      >
        <motion.span 
          className="text-4xl font-light text-white/80 mt-24"
        >
          <motion.span>
            {/* We'll show the percentage */}
          </motion.span>
        </motion.span>
      </motion.div>
    </div>
  )
}

// Separate component for the percentage counter
export function ChargingPercentage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [percentage, setPercentage] = useState(0)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress based on element position
      const start = windowHeight
      const end = -rect.height
      const current = rect.top
      
      let progress = (start - current) / (start - end)
      progress = Math.max(0, Math.min(1, progress))
      
      // Map to 0-100 with some easing
      const adjustedProgress = Math.max(0, Math.min(100, Math.round(progress * 150 - 25)))
      setPercentage(adjustedProgress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div ref={containerRef} className="text-6xl font-light text-green-400 tabular-nums">
      {percentage}%
    </div>
  )
}
