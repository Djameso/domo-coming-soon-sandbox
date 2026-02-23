'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import AskAI from '@/components/AskAI'
import PricingComparison from '@/components/PricingComparison'
import BuildingHotspot from '@/components/BuildingHotspot'

interface UnitType {
  type: string
  sqft: string
  price: string
  features: string[]
}

const floorData = [
  { floor: 6, label: 'Floor 6', unitType: 'top', desc: 'Premium top-floor residences with private 450 sqft balcony and unobstructed Bay, Point Loma & ocean views', price: 'From $3,300/mo', sqft: '1,100+ sq ft', tag: 'Top Floor' },
  { floor: 5, label: 'Floor 5', unitType: '2br', desc: 'Spacious 2-bedroom residences with dual exposure and flexible office space', price: 'From $2,850/mo', sqft: 'From 630 sq ft', tag: '2 Bedroom' },
  { floor: 4, label: 'Floor 4', unitType: '2br', desc: 'Spacious 2-bedroom residences with dual exposure and flexible office space', price: 'From $2,850/mo', sqft: 'From 630 sq ft', tag: '2 Bedroom' },
  { floor: 3, label: 'Floor 3', unitType: '1br', desc: '1-bedroom residences — the perfect mix of comfort and efficiency', price: 'From $2,450/mo', sqft: 'From 425 sq ft', tag: '1 Bedroom' },
  { floor: 2, label: 'Floor 2', unitType: '1br', desc: '1-bedroom residences — the perfect mix of comfort and efficiency', price: 'From $2,450/mo', sqft: 'From 425 sq ft', tag: '1 Bedroom' },
  { floor: 1, label: 'Floor 1', unitType: '1br', desc: '1-bedroom residences with easy ground-floor access', price: 'From $2,450/mo', sqft: 'From 425 sq ft', tag: '1 Bedroom' },
]

function FloorSelector({ unitTypes }: { unitTypes: UnitType[] }) {
  const [activeFloor, setActiveFloor] = useState<number | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const active = floorData.find(f => f.floor === activeFloor)

  const handleFloorSelect = (floor: number) => {
    const isActive = activeFloor === floor
    setActiveFloor(isActive ? null : floor)
    if (!isActive) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }

  // Floor zones mapped to the building photo (percentage positions)
  // The building facade windows span roughly: left 25% to 73%, top 5% to 82%
  // 6 floors of windows, each row ~12.5% tall
  const floorZones = [
    { floor: 6, top: 5, height: 12 },    // Top floor
    { floor: 5, top: 17, height: 12 },
    { floor: 4, top: 29, height: 13 },
    { floor: 3, top: 42, height: 13 },
    { floor: 2, top: 55, height: 13 },
    { floor: 1, top: 68, height: 14 },    // Ground residential
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 max-w-5xl mx-auto">
      {/* Building Photo with Floor Overlays */}
      <div className="w-full max-w-[360px] lg:max-w-[400px] flex-shrink-0 relative">
        <div className="relative overflow-hidden rounded-lg">
          {/* Base layer: lights ON when no selection, lights OFF when floor selected */}
          <img
            src="/images/building-night.jpg"
            alt="DOMO Living — 3745 4th Avenue, Hillcrest"
            className={`w-full transition-opacity duration-700 ${activeFloor ? 'opacity-0' : 'opacity-100'}`}
          />
          {/* Dark building (lights off) — shown when a floor is selected */}
          <img
            src="/images/building-night-dark.jpg"
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeFloor ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* "Lights on" layer — bright original photo, clipped to selected floor only */}
          {activeFloor && (() => {
            const activeZone = floorZones.find(z => z.floor === activeFloor)
            if (!activeZone) return null
            const t = activeZone.top
            const b = activeZone.top + activeZone.height
            return (
              <img
                src="/images/building-night.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[5]"
                style={{
                  clipPath: `polygon(22% ${t}%, 76% ${t}%, 76% ${b}%, 22% ${b}%)`,
                  transition: 'clip-path 0.5s ease-out',
                }}
              />
            )
          })()}

          {/* Subtle glow border on selected floor */}
          {activeFloor && (() => {
            const activeZone = floorZones.find(z => z.floor === activeFloor)
            if (!activeZone) return null
            return (
              <div
                className="absolute pointer-events-none z-[6] transition-all duration-500 ease-out"
                style={{
                  left: '22%', width: '54%', top: `${activeZone.top}%`, height: `${activeZone.height}%`,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  boxShadow: '0 0 20px rgba(255, 200, 100, 0.1)',
                }}
              />
            )
          })()}

          {/* Floor tap zones */}
          {floorZones.map((zone) => {
            const isActive = activeFloor === zone.floor
            return (
              <button
                key={zone.floor}
                onClick={() => handleFloorSelect(zone.floor)}
                className="absolute z-10 transition-all duration-200"
                style={{
                  left: '22%',
                  width: '56%',
                  top: `${zone.top}%`,
                  height: `${zone.height}%`,
                }}
              >
                {/* Hover highlight */}
                <div className={`w-full h-full rounded-sm border transition-all duration-200 ${
                  isActive 
                    ? 'bg-transparent border-transparent' 
                    : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                }`} />
                
                {/* Floor label */}
                <div className={`absolute -left-12 top-1/2 -translate-y-1/2 text-xs font-mono transition-all duration-500 ${
                  isActive ? 'text-red-400 font-bold' : activeFloor ? 'text-white/20' : 'text-white/40'
                }`}>
                  F{zone.floor}
                </div>
              </button>
            )
          })}

          {/* Bottom hint */}
          {!activeFloor && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white/80 text-xs font-medium">
                Tap a floor to explore
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Floor detail panel */}
      <div className="w-full lg:flex-1 min-h-[280px]" ref={detailRef}>
        {active ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-red-600/20 text-red-400 text-xs font-medium rounded">{active.tag}</span>
              <span className="text-white/40 text-xs">{active.label}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-light text-white">{active.price.replace('From ', '')}</span>
            </div>
            <p className="text-white/40 text-sm mb-4">{active.sqft} · Fully furnished</p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{active.desc}</p>
            
            {/* Features for the matching unit type */}
            <div className="space-y-2 mb-6">
              {(active.unitType === '1br' ? unitTypes[0] : unitTypes[1])?.features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                  {f}
                </div>
              ))}
              {active.unitType === 'top' && (
                <>
                  <div className="flex items-center gap-2 text-white/70 text-sm"><span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />Private 450 sqft balcony with ocean views</div>
                  <div className="flex items-center gap-2 text-white/70 text-sm"><span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />Premium finishes</div>
                  <div className="flex items-center gap-2 text-white/70 text-sm"><span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />Bay, Point Loma & downtown views</div>
                  <div className="flex items-center gap-2 text-white/70 text-sm"><span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />Full kitchen · Walk-in closets · In-unit W/D</div>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#waitlist"
                className="inline-block px-8 py-3 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-all"
              >
                Join Waitlist
              </Link>
              <a
                href="https://my.matterport.com/show/?m=1HxB4RYdnb1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium rounded hover:bg-white/10 transition-all"
              >
                🏠 3D Virtual Tour
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[280px] text-center">
            <div>
              <p className="text-white/30 text-lg mb-2">← Tap a floor to explore</p>
              <p className="text-white/20 text-sm">6 stories · 60 residences · Starting from $2,450/mo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Units() {
  const unitTypes = [
    {
      type: '1 Bedroom',
      sqft: '425',
      price: 'From $2,450/mo',
      features: ['Separate bedroom', 'Full bathroom', 'Full kitchen', 'Walk-in closet', 'Expandable closet', 'In-unit W/D'],
    },
    {
      type: '2 Bedroom',
      sqft: '630',
      price: 'From $2,850/mo',
      features: ['2 bedrooms', 'Flexible space (bedroom or office)', 'Full bathroom', 'Full kitchen', '2 walk-in closets', 'In-unit W/D'],
    },
  ]

  const includedFeatures = [
    { category: 'Furniture', items: ['Platform bed with storage', 'Sofa', 'Desk & chair (2BR units)*', 'Side tables & lighting'] },
    { category: 'Kitchen', items: ['Samsung refrigerator', 'Samsung electric range', 'Convection microwave', 'Quartz countertops', 'Soft-close cabinets'] },
    { category: 'Bathroom', items: ['Premium fixtures', 'Full-length mirror', 'Storage vanity'] },
    { category: 'Technology', items: ['SALTO smart lock', 'Smart thermostat', 'USB outlets throughout', 'Pre-wired for smart home', '1GB high-speed WiFi (tech package)'] },
    { category: 'Laundry', items: ['Miele washer', 'Miele dryer', 'Stacked configuration', 'In-unit location'] },
    { category: 'Comfort', items: ['Central A/C & heat', 'Double-pane windows', 'Blackout blinds', 'Plank flooring', 'Sound insulation'] },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Our Residences</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Move in with just
            <br />
            <span className="text-red-500">your toothbrush</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Every DOMO unit comes fully furnished with designer furniture, premium appliances, 
            and smart home technology. All you need to bring is yourself.
          </p>
        </div>
      </section>

      {/* Isometric Building + Unit Types */}
      <section className="py-16 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light mb-4 text-center">Choose Your Space</h2>
          <p className="text-white/50 text-center mb-12 max-w-lg mx-auto">Tap a floor to explore. Every unit comes fully furnished and move-in ready.</p>
          
          <FloorSelector unitTypes={unitTypes} />
          
          <p className="text-center text-white/40 text-sm mt-8">
            *Pricing subject to change. Final pricing available at lease-up.
          </p>
        </div>
      </section>

      {/* Pricing Comparison */}
      <PricingComparison />

      {/* Gallery */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Inside a DOMO Unit</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              className="aspect-[4/3] rounded-lg bg-cover bg-center md:col-span-2 lg:col-span-2 lg:row-span-2"
              style={{ backgroundImage: `url('/images/fera-esrgan/kitchen.jpg')` }}
            />
            <div 
              className="aspect-[4/3] rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('/images/fera-esrgan/living-room.jpg')` }}
            />
            <div 
              className="aspect-[4/3] rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('/images/fera-esrgan/bedroom-closet.jpg')` }}
            />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Everything Included</p>
            <h2 className="text-3xl md:text-4xl font-light">
              No furniture shopping.
              <br />
              <span className="text-white/50">No appliance hunting.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedFeatures.map((category) => (
              <div key={category.category} className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4 text-red-500">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="text-white/70 text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Explorer */}
      <section className="py-16 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Explore the Building</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Find your floor,
              <br />
              <span className="text-white/50">find your view</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Tap any floor to explore unit types, pricing, and what&apos;s included. Units start from $2,450/mo — fully furnished, move-in ready.
            </p>
          </div>
        </div>
      </section>
      <BuildingHotspot />

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Ready to make DOMO home?</h2>
          <p className="text-white/60 text-lg mb-8">
            Join the waitlist for first access to floor plans and virtual tours.
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
      <AskAI context="units" />

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
              <p className="text-white/30 text-sm mt-1">Living Made Easy</p>
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
