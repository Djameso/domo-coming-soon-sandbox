'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface VideoItem {
  src: string
  title: string
  description: string
}

const videos: VideoItem[] = [
  {
    src: '/video/fera/sd-aerial-opener.mp4',
    title: 'San Diego Views',
    description: 'Stunning aerial sunset views over America\'s Finest City'
  },
  {
    src: '/video/fera/interior-lounge.mp4',
    title: 'Interior Lounge',
    description: 'Cozy coffee nook with premium furnishings'
  },
  {
    src: '/video/fera/sd-neighborhood.mp4',
    title: 'Hillcrest Living',
    description: 'Walk to Gaslamp Quarter and downtown San Diego'
  },
  {
    src: '/video/fera/spa-bathroom.mp4',
    title: 'Spa Bathroom',
    description: 'Steam shower and luxury finishes in every unit'
  },
  {
    src: '/video/fera/bedroom-smart-energy.mp4',
    title: 'Smart Energy',
    description: 'City views with solar-powered balcony living'
  },
  {
    src: '/video/fera/pet-friendly-amenities.mp4',
    title: 'Pet-Friendly Living',
    description: 'In-unit laundry and thoughtful amenities'
  },
  {
    src: '/video/fera/smart-home-app.mp4',
    title: 'DOMO App',
    description: 'Control your home from anywhere with smart technology'
  }
]

export default function VideoFeed() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Experience DOMO Living</p>
          <h2 className="text-4xl md:text-5xl font-light">
            See how you'll
            <br />
            <span className="text-white/50">live at DOMO</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <VideoCard key={video.src} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        
        if (entry.isIntersecting && videoRef.current) {
          if (!hasStarted) {
            setHasStarted(true)
            // Small delay to ensure smooth scroll
            setTimeout(() => {
              videoRef.current?.play()
            }, 100)
          } else {
            videoRef.current.play()
          }
        } else if (videoRef.current) {
          videoRef.current.pause()
        }
      },
      {
        threshold: 0.5, // Video is considered visible when 50% is in viewport
        rootMargin: '-10% 0px -10% 0px' // Slight margin for better UX
      }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [hasStarted])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative group"
    >
      <div className="relative aspect-[9/16] max-w-sm mx-auto overflow-hidden rounded-2xl bg-black/20 shadow-2xl">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoadStart={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0
            }
          }}
        >
          <source src={video.src} type="video/mp4" />
        </video>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-xl font-semibold mb-2 leading-tight">
            {video.title}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            {video.description}
          </p>
        </div>
        
        {/* Play indicator when not visible */}
        {!isVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-6 h-6 border-l-8 border-t-4 border-b-4 border-white/80 border-t-transparent border-b-transparent ml-1" />
            </div>
          </motion.div>
        )}
        
        {/* Subtle border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </div>
    </motion.div>
  )
}