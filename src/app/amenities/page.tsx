'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import AskAI from '@/components/AskAI'

export default function Amenities() {
  const amenities = [
    {
      title: '360° Rooftop Terrace',
      description: 'Our crown jewel. A stunning rooftop space with unobstructed views of San Diego Bay, Point Loma, the downtown skyline, and Pacific Ocean sunsets. Perfect for morning yoga, evening gatherings, or watching the sun drop behind the peninsula.',
      features: ['Outdoor lounge seating', 'BBQ stations', 'String lights & ambient lighting', 'Views of the Bay, Point Loma & downtown'],
      image: '/images/fera-esrgan/rooftop-friends.jpg',
      video: '/video/movie-night-loop.mp4'
    },
    {
      title: 'Co-Working Rooftop',
      description: 'Work from home doesn\'t mean work from your couch. Our rooftop co-working space offers fresh air, natural light, and views of the Bay and downtown skyline — the best office view in San Diego.',
      features: ['Shaded work areas', 'Power outlets throughout', 'High-speed WiFi', 'Comfortable seating'],
      image: '/images/fera-esrgan/rooftop-work.jpg',
      video: '/video/rooftop-work-loop.mp4'
    },
    {
      title: 'Smart Package Room',
      description: 'Never miss a delivery again. Our automated package room keeps your deliveries secure with 24/7 access and smart notifications.',
      features: ['24/7 secure access', 'Smart locker system', 'App notifications', 'Oversized package storage'],
      image: '/images/fera-esrgan/package-room.jpg',
      video: '/video/package-room-loop.mp4'
    },
    {
      title: 'Wellness Center',
      description: 'A holistic approach to fitness and wellness. Our center is designed for both high-energy workouts and mindful recovery.',
      features: ['Cardio & strength equipment', 'Yoga & meditation space', 'Recovery zone', 'Natural lighting'],
      image: '/images/gym.jpg',
      video: '/video/gym-loop.mp4'
    },
    {
      title: 'Community Lounge',
      description: 'The heart of DOMO. A flexible space for working, socializing, or hosting events. A versatile space designed for connection and productivity.',
      features: ['Modular seating', 'Large-screen displays', 'Bookable event space', 'High-speed WiFi'],
      image: '/images/fera-esrgan/kitchen.jpg',
      video: '/video/rooftop-party-loop.mp4'
    },
    {
      title: 'Pet Spa',
      description: 'A dedicated grooming space for your four-legged friends. Professional-grade wash stations and a comfortable area to keep your pets looking their best.',
      features: ['Professional wash stations', 'Drying area', 'Convenient ground-floor location', 'Pet-friendly building'],
      image: '/images/pet-spa.jpg'
    },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Life at DOMO</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Amenities that
            <br />
            <span className="text-red-500">elevate everyday</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Every space at DOMO is designed with intention. From sunrise workouts to sunset gatherings, 
            we've created spaces that make life richer.
          </p>
        </div>
      </section>

      {/* Amenities List */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {amenities.map((amenity, index) => (
            <div 
              key={amenity.title}
              className={`grid lg:grid-cols-2 gap-12 items-center py-16 ${index !== amenities.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                {amenity.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                    poster={amenity.image}
                  >
                    <source src={amenity.video} type="video/mp4" />
                  </video>
                ) : (
                  <div 
                    className="aspect-[4/3] rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url('${amenity.image}')` }}
                  />
                )}
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h2 className="text-3xl md:text-4xl font-light mb-4">{amenity.title}</h2>
                <p className="text-white/60 text-lg mb-8 leading-relaxed">{amenity.description}</p>
                <ul className="space-y-3">
                  {amenity.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/70">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Ready to experience DOMO?</h2>
          <p className="text-white/60 text-lg mb-8">
            Join the waitlist for exclusive access to tours and first pick of units.
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
      <AskAI context="amenities" />

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
