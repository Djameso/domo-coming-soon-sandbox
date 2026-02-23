'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

const MATTERPORT_URL = 'https://my.matterport.com/show/?m=1HxB4RYdnb1'

interface Hotspot {
  id: string
  label: string
  x: number
  y: number
  glowArea?: {
    left: number
    right: number
    top: number
    bottom: number
  }
  details: {
    title: string
    subtitle: string
    images: string[]
    price: string
    pricePer: string
    sqft: string
    description: string
    features: { icon: string; label: string }[]
    hasTour: boolean
  }
}

const hotspots: Hotspot[] = [
  {
    id: 'rooftop',
    label: 'Rooftop',
    x: 50,
    y: 8,
    glowArea: { left: 28, right: 72, top: 5, bottom: 12 },
    details: {
      title: 'Rooftop Wellness Center',
      subtitle: 'Resident Amenity · Top Floor',
      images: ['/images/fera-esrgan/rooftop-friends.jpg', '/images/fera-esrgan/rooftop-work.jpg', '/images/fera-esrgan/arrival-car.jpg'],
      price: 'Included',
      pricePer: 'with every lease',
      sqft: 'Shared',
      description:
        'Your private escape above it all. Solar-powered rooftop with panoramic views of San Diego Bay, Point Loma, the downtown skyline, and Balboa Park. Yoga space, outdoor lounge, and ocean sunsets included.',
      features: [
        { icon: '☀️', label: 'Solar Array' },
        { icon: '🧘', label: 'Yoga Space' },
        { icon: '🌇', label: 'Skyline Views' },
        { icon: '🔋', label: 'Battery Storage' },
        { icon: '🌿', label: 'Green Terrace' },
        { icon: '📡', label: 'Tech Package' },
      ],
      hasTour: false,
    },
  },
  {
    id: 'top-floor',
    label: 'Top Floor',
    x: 50,
    y: 15,
    glowArea: { left: 28, right: 72, top: 12, bottom: 24 },
    details: {
      title: 'Top Floor Residence',
      subtitle: 'Top Floor · 1,100+ Sqft',
      images: ['/images/fera-esrgan/bedroom-closet.jpg', '/images/fera-esrgan/living-room.jpg', '/images/fera-esrgan/kitchen.jpg'],
      price: '$3,300',
      pricePer: '/mo',
      sqft: '1,100+ Sqft',
      description:
        'The crown jewel with expansive layouts and premium finishes. Private rooftop access, panoramic city views, and the ultimate in luxury living.',
      features: [
        { icon: '🛋️', label: 'Fully Furnished' },
        { icon: '🧺', label: 'Miele W/D' },
        { icon: '🍳', label: 'Samsung Kitchen' },
        { icon: '🌇', label: 'City Views' },
        { icon: '📱', label: 'DOMO App' },
        { icon: '📶', label: 'Tech Package' },
      ],
      hasTour: true,
    },
  },
  {
    id: '2br',
    label: '2 Bed',
    x: 50,
    y: 38,
    glowArea: { left: 28, right: 72, top: 24, bottom: 52 },
    details: {
      title: '2-Bedroom Residence',
      subtitle: 'Floors 3–4 · 900–1,100 Sqft',
      images: ['/images/fera-esrgan/bedroom-closet.jpg', '/images/fera-esrgan/living-room.jpg', '/images/fera-esrgan/kitchen.jpg'],
      price: '$2,850',
      pricePer: '/mo',
      sqft: '900–1,100 Sqft',
      description:
        'Spacious units with dual exposure and premium amenities. Move in with just a suitcase — everything from furniture to cookware is included.',
      features: [
        { icon: '🛋️', label: 'Fully Furnished' },
        { icon: '🧺', label: 'Miele W/D' },
        { icon: '🍳', label: 'Samsung Kitchen' },
        { icon: '☀️', label: 'Solar Balcony' },
        { icon: '📱', label: 'DOMO App' },
        { icon: '📶', label: 'Tech Package' },
      ],
      hasTour: true,
    },
  },
  {
    id: '1br',
    label: '1 Bed',
    x: 50,
    y: 58,
    glowArea: { left: 28, right: 72, top: 52, bottom: 72 },
    details: {
      title: '1-Bedroom Residence',
      subtitle: 'Floors 1–2 · From 425 Sqft',
      images: ['/images/fera-esrgan/living-room.jpg', '/images/fera-esrgan/kitchen.jpg', '/images/fera-esrgan/bedroom-closet.jpg'],
      price: '$2,450',
      pricePer: '/mo',
      sqft: 'From 425 Sqft',
      description:
        'The perfect mix of comfort and efficiency. Fully furnished with premium finishes, in-unit Miele washer/dryer, and smart home controls.',
      features: [
        { icon: '🛋️', label: 'Fully Furnished' },
        { icon: '🧺', label: 'Miele W/D' },
        { icon: '🍳', label: 'Samsung Kitchen' },
        { icon: '☀️', label: 'Solar Balcony' },
        { icon: '📱', label: 'DOMO App' },
        { icon: '📶', label: 'Tech Package' },
      ],
      hasTour: true,
    },
  },
  {
    id: 'lobby',
    label: 'Amenities',
    x: 50,
    y: 80,
    glowArea: { left: 28, right: 72, top: 72, bottom: 85 },
    details: {
      title: 'Lobby & Amenities',
      subtitle: 'Ground Floor · Community Spaces',
      images: ['/images/fera-esrgan/arrival-car.jpg', '/images/fera-esrgan/rooftop-work.jpg', '/images/fera-esrgan/living-room.jpg'],
      price: 'Included',
      pricePer: 'with every lease',
      sqft: 'Shared',
      description:
        'Welcome home to your modern community hub. Smart package lockers, co-working spaces, and resident lounge with seamless indoor-outdoor flow.',
      features: [
        { icon: '📦', label: 'Smart Lockers' },
        { icon: '💻', label: 'Co-Working' },
        { icon: '🛋️', label: 'Resident Lounge' },
        { icon: '🔒', label: 'Smart Access' },
        { icon: '🚗', label: 'EV Charging' },
        { icon: '📶', label: 'High-Speed WiFi' },
      ],
      hasTour: false,
    },
  },
]

export default function BuildingHotspot() {
  const [active, setActive] = useState<string | null>(null)
  const mobileCardRef = useRef<HTMLDivElement>(null)
  const activeHotspot = hotspots.find((h) => h.id === active)

  const handleSelect = (id: string) => {
    const isActive = active === id
    setActive(isActive ? null : id)
    if (!isActive) {
      setTimeout(() => {
        mobileCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
      {/* Image container — tall on mobile to fill with building, wider on desktop */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/10]">
        <Image
          src="/images/building-night.jpg"
          alt="DOMO Living at night — 3745 4th Avenue, Hillcrest"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Minimal overlay — just enough for readability at edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

        {/* "Lights off" overlay — dims all floors except the selected one */}
        {activeHotspot?.glowArea && (
          <>
            {/* Dark overlay ABOVE selected floor */}
            <div
              className="absolute pointer-events-none z-[5] transition-all duration-700 ease-out"
              style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: `${100 - activeHotspot.glowArea.top}%`,
                background: 'rgba(0, 0, 0, 0.65)',
              }}
            />
            {/* Dark overlay BELOW selected floor */}
            <div
              className="absolute pointer-events-none z-[5] transition-all duration-700 ease-out"
              style={{
                left: 0,
                right: 0,
                top: `${activeHotspot.glowArea.bottom}%`,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.65)',
              }}
            />
            {/* Dark overlay LEFT of selected floor */}
            <div
              className="absolute pointer-events-none z-[5] transition-all duration-700 ease-out"
              style={{
                left: 0,
                right: `${100 - activeHotspot.glowArea.left}%`,
                top: `${activeHotspot.glowArea.top}%`,
                bottom: `${100 - activeHotspot.glowArea.bottom}%`,
                background: 'rgba(0, 0, 0, 0.65)',
              }}
            />
            {/* Dark overlay RIGHT of selected floor */}
            <div
              className="absolute pointer-events-none z-[5] transition-all duration-700 ease-out"
              style={{
                left: `${activeHotspot.glowArea.right}%`,
                right: 0,
                top: `${activeHotspot.glowArea.top}%`,
                bottom: `${100 - activeHotspot.glowArea.bottom}%`,
                background: 'rgba(0, 0, 0, 0.65)',
              }}
            />
            {/* Subtle glow on the selected floor */}
            <div
              className="absolute pointer-events-none z-[6] transition-all duration-500 ease-out"
              style={{
                left: `${activeHotspot.glowArea.left}%`,
                right: `${100 - activeHotspot.glowArea.right}%`,
                top: `${activeHotspot.glowArea.top}%`,
                bottom: `${100 - activeHotspot.glowArea.bottom}%`,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '4px',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              }}
            />
          </>
        )}

        {/* Hotspot markers */}
        {hotspots.map((spot) => {
          const isActive = active === spot.id
          return (
            <button
              key={spot.id}
              onClick={() => handleSelect(spot.id)}
              className="absolute z-10"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulse */}
              {!isActive && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-9 h-9 rounded-full bg-white/25 animate-ping" />
                </span>
              )}
              {/* Circle */}
              <span
                className={`relative flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 border-red-400 scale-110'
                    : 'bg-black/50 border-white/60 hover:bg-red-600/80 hover:border-red-400 hover:scale-110'
                }`}
              >
                {isActive ? (
                  <span className="text-white text-sm font-bold leading-none">−</span>
                ) : (
                  <span className="text-white text-sm font-bold leading-none">+</span>
                )}
              </span>
            </button>
          )
        })}

        {/* Desktop card overlay */}
        <div
          className={`hidden md:block absolute top-12 right-8 z-20 w-[360px] transition-all duration-400 ease-out ${
            activeHotspot ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        >
          {activeHotspot && <HotspotCard hotspot={activeHotspot} onClose={() => setActive(null)} />}
        </div>

        {/* Bottom hint — only when nothing selected */}
        {!active && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white/80 text-xs sm:text-sm font-medium">
              Tap <span className="text-red-500 font-bold">+</span> to explore units
            </span>
          </div>
        )}
      </div>

      {/* Mobile card — below image, no overlap */}
      <div className="md:hidden" ref={mobileCardRef}>
        {activeHotspot && (
          <div className="px-4 py-4">
            <HotspotCard hotspot={activeHotspot} onClose={() => setActive(null)} />
          </div>
        )}
      </div>
    </section>
  )
}

function HotspotCard({ hotspot, onClose }: { hotspot: Hotspot; onClose: () => void }) {
  const [showTour, setShowTour] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const touchRef = useRef<number | null>(null)
  const images = hotspot.details.images

  const prev = useCallback(() => setImgIdx((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setImgIdx((i) => (i + 1) % images.length), [images.length])

  const onTouchStart = (e: React.TouchEvent) => { touchRef.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current === null) return
    const diff = e.changedTouches[0].clientX - touchRef.current
    if (Math.abs(diff) > 40) { diff > 0 ? prev() : next() }
    touchRef.current = null
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Image carousel / Matterport embed */}
      <div className="relative h-40 sm:h-44 bg-neutral-200" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {showTour && hotspot.details.hasTour ? (
          <iframe
            src={`${MATTERPORT_URL}&play=1&qs=1`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="xr-spatial-tracking"
          />
        ) : (
          <>
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="flex h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${imgIdx * 100}%)` }}
              >
                {images.map((src, i) => (
                  <div key={src} className="relative w-full h-full flex-shrink-0">
                    <Image src={src} alt={`${hotspot.details.title} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-xs hover:bg-black/50 transition-colors">‹</button>
                <button onClick={next} className="absolute right-9 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-xs hover:bg-black/50 transition-colors">›</button>
              </>
            )}
            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-110' : 'bg-white/40 border border-white/60'}`} />
                ))}
              </div>
            )}
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs hover:bg-black/70"
        >
          ✕
        </button>
      </div>

      <div className="p-5">
        {/* Price row */}
        <div className="flex items-baseline justify-between mb-0.5">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Starting at</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-bold text-neutral-900">{hotspot.details.price}</span>
              <span className="text-xs text-neutral-500">{hotspot.details.pricePer}</span>
            </div>
          </div>
          <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">{hotspot.details.sqft}</span>
        </div>

        <p className="text-xs text-neutral-400 mb-3">{hotspot.details.subtitle}</p>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">{hotspot.details.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {hotspot.details.features.map((f) => (
            <div key={f.label} className="flex items-center gap-1.5 text-xs text-neutral-600">
              <span className="text-sm">{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          {hotspot.details.hasTour && (
            <button
              onClick={() => setShowTour(!showTour)}
              className="block w-full py-2.5 bg-neutral-900 text-white text-center text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
            >
              {showTour ? '📷 Show Photos' : '🏠 Virtual Tour'}
            </button>
          )}
          <a
            href="/#waitlist"
            className="block w-full py-2.5 bg-red-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-red-500 transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </div>
  )
}
