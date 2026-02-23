'use client'

import Link from 'next/link'
import { Sun, Battery, Leaf, TrendingDown, Zap, Building2 } from 'lucide-react'
import Header from '@/components/Header'
import ChargingRing from '@/components/ChargingRing'
import AskAI from '@/components/AskAI'

export default function Solar() {
  const features = [
    {
      icon: Sun,
      title: 'Solar Balconies — Your Personal Power Plant',
      description: 'Every unit features a private balcony with integrated solar panels. Unlike traditional apartment solar that only lives on the roof, your balcony actively generates clean energy while you enjoy your morning coffee. It\'s the most personal form of solar in any apartment building — energy you can see working, right outside your door.',
    },
    {
      icon: Building2,
      title: 'BIPV Exterior Cladding',
      description: 'Building-Integrated Photovoltaics (BIPV) replace conventional building materials with solar-generating surfaces. Instead of bolting panels onto a finished building, BIPV makes the building envelope itself a power source — the exterior cladding generates electricity while serving as the building\'s skin. DOMO is among the first multifamily buildings in San Diego to use this technology.',
    },
    {
      icon: Zap,
      title: 'Rooftop Solar Array',
      description: 'A traditional rooftop solar installation supplements the BIPV cladding and balcony systems, maximizing the building\'s total energy generation capacity.',
    },
    {
      icon: Battery,
      title: 'Battery Storage',
      description: 'On-site battery systems store excess solar energy from all three sources — rooftop, BIPV, and balconies — providing power even after sunset and during peak demand.',
    },
    {
      icon: TrendingDown,
      title: 'Smart Energy Metering',
      description: 'Monitor your solar generation, electricity usage, and water consumption in real time through the DOMO app. Understand exactly how your building\'s three-layer solar system is working for you.',
    },
    {
      icon: Leaf,
      title: 'Three-Layer Solar Design',
      description: 'Most solar buildings stop at rooftop panels. DOMO generates energy from three layers: rooftop array, BIPV exterior cladding, and private solar balconies. This approach is designed to significantly reduce grid dependence and lower the building\'s carbon footprint.',
    },
  ]

  const stats = [
    { value: '100%', label: 'Electric Building' },
    { value: 'Up to 70%', label: 'Achievable Grid Reduction' },
    { value: 'Up to $200', label: 'Potential Monthly Savings' },
    { value: '1st', label: 'BIPV Approach in San Diego' },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Sustainability</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Powered by the
            <br />
            <span className="text-red-500">California sun</span>
          </h1>
          <p className="text-white/60 text-xl max-w-3xl mx-auto">
            Most solar buildings put panels on the roof and call it a day. DOMO generates energy from three layers: 
            rooftop array, BIPV exterior cladding, and private solar balconies on every unit. 
            Your balcony isn't just a view — it's a power plant.
          </p>
        </div>
      </section>

      {/* Charging Ring Animation */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <ChargingRing />
          <p className="text-white/40 text-sm mt-6 tracking-widest uppercase">Scroll to charge</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-light text-red-500 mb-2">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIPV Feature */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">First in San Diego</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Building-Integrated
                <br />
                <span className="text-white/50">Photovoltaics</span>
              </h2>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                Our facade isn't just architectural — it's functional. BIPV (Building-Integrated Photovoltaic) 
                cladding turns the entire building exterior into a solar array. This cutting-edge technology 
                seamlessly blends aesthetics with sustainability.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Combined with rooftop solar panels and balcony solar systems, DOMO is designed to be 
                net-positive — generating more energy than it consumes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Sun className="w-24 h-24 text-red-500 mx-auto mb-6" />
                <p className="text-2xl font-light">Solar-Powered Living</p>
                <p className="text-white/50 mt-2">From sunrise to sunset</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">How It Works</p>
            <h2 className="text-4xl font-light">
              Clean energy,
              <span className="text-white/50"> built in</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white/5 rounded-lg p-8 hover:bg-white/10 transition-all">
                <feature.icon className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="w-16 h-16 text-red-500 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Live lighter on the planet
          </h2>
          <p className="text-white/60 text-xl mb-8 leading-relaxed">
            By choosing DOMO, you're not just choosing a great place to live — you're choosing 
            a more sustainable future. Our solar systems are projected to eliminate over 
            <span className="text-red-500 font-medium"> 500 tons of CO2 emissions</span> annually.
          </p>
          <p className="text-white/40">
            That's equivalent to taking 100+ cars off the road every year.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Ready for sustainable living?</h2>
          <p className="text-white/60 text-lg mb-8">
            Join the waitlist to be part of San Diego's first BIPV-powered residential building.
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
