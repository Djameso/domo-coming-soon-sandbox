'use client'

import { useState, useEffect, useRef } from 'react'

function AnimatedNumber({ value, duration = 1000, prefix = '$' }: { value: number; duration?: number; prefix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{prefix}{display.toLocaleString()}</span>
}

// Furniture items — W/D removed (most Hillcrest apts lack hookups; laundromat is the fair comp)
const traditionalItems = [
  { label: 'Couch / sofa', cost: 1850 },
  { label: 'Bed frame + mattress', cost: 1400 },
  { label: 'Dresser', cost: 600 },
  { label: 'Dining table + chairs', cost: 850 },
  { label: 'Desk', cost: 400 },
  { label: 'Coffee table + nightstands', cost: 550 },
  { label: 'TV stand + lamps', cost: 450 },
  { label: 'Delivery + assembly', cost: 550 },
]

const furnitureTotal = traditionalItems.reduce((s, i) => s + i.cost, 0) // $6,650
const furnitureMonthly = Math.round(furnitureTotal / 12) // ~$554

// Solar savings as a RANGE
// Conservative: 2 kWh/day × $0.38/kWh × 30 = ~$23/mo
// Optimistic:   3.5 kWh/day × $0.52/kWh × 30 = ~$55/mo
const solarLow = Math.round(2 * 0.38 * 30)   // $23
const solarHigh = Math.round(3.5 * 0.52 * 30) // $55

export default function PricingComparison() {
  const [showTrue, setShowTrue] = useState(true)

  const tradRent = 2425
  const tradFurniture = showTrue ? furnitureMonthly : 0
  const tradLaundry = showTrue ? 60 : 0
  const tradTotal = tradRent + tradFurniture + tradLaundry

  const domoRent = 2450
  // Range: DOMO effective cost
  const domoTotalHigh = domoRent - (showTrue ? solarLow : 0)   // worst case for DOMO
  const domoTotalLow = domoRent - (showTrue ? solarHigh : 0)   // best case for DOMO

  // Savings range
  const savingsLow = tradTotal - domoTotalHigh   // conservative savings
  const savingsHigh = tradTotal - domoTotalLow    // optimistic savings
  const yearlySavingsLow = savingsLow * 12
  const yearlySavingsHigh = savingsHigh * 12

  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">The Real Math</p>
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            What you&apos;d <span className="text-red-500">actually</span> pay
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Most apartments advertise rent. They don&apos;t advertise the $6,000+ you&apos;ll spend furnishing them.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setShowTrue(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                showTrue ? 'bg-red-600 text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              True Cost
            </button>
            <button
              onClick={() => setShowTrue(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !showTrue ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              Rent Only
            </button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Traditional */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="mb-6">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Traditional Apartment</p>
              <p className="text-white/60 text-sm">Typical 1BR in Hillcrest (unfurnished)</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Base rent</span>
                <span className="text-white font-medium">$2,425/mo</span>
              </div>
              {showTrue && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Furniture cost spread over 12 months*</span>
                    <span className="text-red-400 font-medium">+${furnitureMonthly}/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Laundromat</span>
                    <span className="text-red-400 font-medium">+$60/mo</span>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">What you actually pay</span>
                <span className="text-2xl font-semibold text-white">
                  <AnimatedNumber value={tradTotal} key={showTrue ? 'true' : 'rent'} />
                  <span className="text-white/40 text-sm font-normal">/mo</span>
                </span>
              </div>
              {showTrue && (
                <p className="text-white/30 text-xs mt-2">
                  Plus ~${furnitureTotal.toLocaleString()} upfront for furniture
                </p>
              )}
            </div>
          </div>

          {/* DOMO */}
          <div className="bg-gradient-to-b from-red-950/30 to-red-950/10 rounded-2xl p-8 border border-red-500/30 relative">
            {showTrue && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                SAVE ${savingsLow.toLocaleString()}–{savingsHigh.toLocaleString()}/MO
              </div>
            )}
            <div className="mb-6">
              <p className="text-red-400 text-sm uppercase tracking-wider mb-1">DOMO Living</p>
              <p className="text-white/60 text-sm">1BR — fully furnished, Miele W/D in-unit</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Rent (everything included)</span>
                <span className="text-white font-medium">$2,450/mo</span>
              </div>
              {showTrue && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Furniture</span>
                    <span className="text-green-400 font-medium">$0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Washer & dryer</span>
                    <span className="text-green-400 font-medium">$0 (Miele in-unit)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Solar balcony savings</span>
                    <span className="text-green-400 font-medium">Up to ${solarLow}–{solarHigh}/mo</span>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-red-500/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">What you actually pay</span>
                <span className="text-2xl font-semibold text-white">
                  ${domoTotalLow.toLocaleString()}–{domoTotalHigh.toLocaleString()}
                  <span className="text-white/40 text-sm font-normal">/mo</span>
                </span>
              </div>
              <p className="text-green-400/70 text-xs mt-2">
                $0 upfront for furniture. Move in with a suitcase.
              </p>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        {showTrue && savingsLow > 0 && (
          <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-white/50 text-sm mb-1">Your first-year savings with DOMO</p>
            <p className="text-4xl font-light text-white">
              ${yearlySavingsLow.toLocaleString()}–{yearlySavingsHigh.toLocaleString()}
            </p>
            <p className="text-white/30 text-xs mt-2">
              *Furniture estimate based on typical costs if paid monthly over a 12-month lease instead of upfront
            </p>
          </div>
        )}

        {/* Furniture breakdown */}
        {showTrue && (
          <details className="mt-8 group">
            <summary className="text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors text-center">
              See furniture cost breakdown →
            </summary>
            <div className="mt-4 bg-white/5 rounded-xl p-6 max-w-md mx-auto">
              <div className="space-y-2">
                {traditionalItems.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-white/50">{item.label}</span>
                    <span className="text-white/70">${item.cost.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-medium border-t border-white/10 pt-2 mt-2">
                  <span className="text-white/70">Total upfront</span>
                  <span className="text-white">${furnitureTotal.toLocaleString()}</span>
                </div>
                <p className="text-white/30 text-xs">
                  = ${furnitureMonthly}/mo if spread over 12 months
                </p>
              </div>
            </div>
          </details>
        )}

        {/* Disclaimer */}
        <p className="text-center mt-8 text-[11px] leading-relaxed text-white/40 max-w-3xl mx-auto">
          Estimated savings are for illustration only. Actual costs vary based on individual purchasing decisions, furniture selections, and delivery fees. Solar generation estimates are based on optimal conditions and may vary depending on unit position, weather, and seasonal sunlight. Not a guarantee of savings. All figures are prospective and unverified.
        </p>
      </div>
    </section>
  )
}
