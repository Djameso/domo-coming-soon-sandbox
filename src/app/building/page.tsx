'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import AskAI from '@/components/AskAI'

export default function Building() {
  const buildingFeatures = [
    {
      title: 'Solar-Powered Building',
      description: 'Not just rooftop panels — DOMO generates energy from three sources: rooftop solar array, BIPV exterior cladding that turns the building facade into a power generator, and private solar balconies on every unit. Paired with on-site battery storage. This is what sustainable living actually looks like.',
      link: '/solar'
    },
    {
      title: 'E-Bike Program',
      description: 'A fleet of electric bikes available for resident use. Perfect for exploring Hillcrest, commuting, or just enjoying San Diego\'s perfect weather.'
    },
    {
      title: 'Secure Entry',
      description: 'Multi-layer security with SALTO smart locks, video intercom, and 24/7 camera monitoring. Feel safe without feeling surveilled.'
    },
    {
      title: 'Tech Package: 1GB WiFi',
      description: 'Optional technology package includes 1GB high-speed WiFi, DOMO app connectivity, and energy monitoring. One simple add-on for seamless smart living.'
    },
    {
      title: 'Smart Metering',
      description: 'Monitor your solar generation, water usage, and electricity consumption in real time — all through the DOMO app.'
    },
  ]

  const sustainability = [
    { metric: '100%', label: 'Electric Building' },
    { metric: 'Up to 70%', label: 'Solar Powered' },
    { metric: 'Smart', label: 'Metering via App' },
    { metric: '0', label: 'Gas Appliances' },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/fera-esrgan/hero-building.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0a0a0a]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">The Building</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Designed for
            <br />
            <span className="text-red-500">modern living</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            60 thoughtfully designed residences in the heart of Hillcrest. 
            Every detail considered. Every amenity intentional.
          </p>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Location</p>
              <h2 className="text-4xl font-light mb-6">
                3745 4th Avenue
                <br />
                <span className="text-white/50">Hillcrest, San Diego</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Hillcrest is San Diego's most vibrant, walkable neighborhood. A hub of culture, 
                dining, and community — with Balboa Park as your backyard and rooftop views 
                stretching from San Diego Bay and Point Loma to the downtown skyline.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-2 border-red-600/50 pl-4">
                  <div className="text-3xl font-light text-red-500">95</div>
                  <div className="text-sm text-white/50">Walk Score</div>
                </div>
                <div className="border-l-2 border-red-600/50 pl-4">
                  <div className="text-3xl font-light text-red-500">89</div>
                  <div className="text-sm text-white/50">Bike Score</div>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-4">Nearby</h3>
              <ul className="space-y-2 text-white/70">
                <li>Balboa Park — 2 blocks</li>
                <li>Hillcrest Farmers Market — 3 blocks</li>
                <li>University Avenue dining — 1 block</li>
                <li>UCSD Medical Center — 0.5 miles</li>
                <li>Downtown San Diego — 2 miles</li>
              </ul>
            </div>
            <div 
              className="aspect-square rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('/images/fera-esrgan/arrival-car.jpg')` }}
            />
          </div>
        </div>
      </section>

      {/* Building Features */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Building Features</p>
            <h2 className="text-4xl font-light">
              Smart building,
              <br />
              <span className="text-white/50">smarter living</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buildingFeatures.map((feature) => (
              <div key={feature.title} className="bg-white/5 rounded-lg p-8">
                <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                {'link' in feature && (
                  <Link href={(feature as {link: string}).link} className="inline-block mt-4 text-red-500 text-sm font-medium hover:text-red-400 transition-colors">
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Sustainability</p>
            <h2 className="text-4xl font-light">
              Built for the future,
              <br />
              <span className="text-white/50">not just today</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sustainability.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl font-light text-red-500 mb-2">{stat.metric}</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-12 max-w-2xl mx-auto">
            DOMO Living is committed to sustainable development. Our all-electric building 
            eliminates on-site fossil fuel combustion while our solar array generates clean 
            energy for residents.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Be part of something new</h2>
          <p className="text-white/60 text-lg mb-8">
            DOMO Living on 4th opens Spring 2026. Join the waitlist for early access.
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
      <AskAI context="building" />

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
