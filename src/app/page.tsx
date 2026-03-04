'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { ChevronDown } from 'lucide-react'
import AskAI from '@/components/AskAI'
import BuildingHotspot from '@/components/BuildingHotspot'
import VideoFeed from '@/components/VideoFeed'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    moveInTimeline: '',
    bedroomPreference: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)
  
  const features = [
    { 
      title: 'Designer-Inspired Furniture', 
      desc: 'Hospitality-inspired functional furniture with space-conscious design',
      details: 'Every piece selected for both style and function. Designed to maximize your living space while maintaining a cohesive, modern aesthetic throughout.'
    },
    { 
      title: 'Smart Home Tech', 
      desc: 'DOMO app control, addressable lighting and shades, digital keys',
      details: 'Control your entire home from the DOMO app. Addressable lighting and shades, access control with digital keys, and community communications — all in one place.'
    },
    { 
      title: 'Premium Kitchen', 
      desc: 'Samsung appliances, quartz counters, convection microwave',
      details: 'Full-size Samsung refrigerator, electric range with hood, dishwasher, and convection microwave. Quartz countertops with undermount sink. Soft-close cabinets with ample storage.'
    },
    { 
      title: 'In-Unit Laundry', 
      desc: 'Miele washer/dryer in every apartment',
      details: 'Premium Miele washer and dryer in every unit — no shared laundry rooms, no quarters needed. German engineering for quiet, efficient performance.'
    },
    { 
      title: 'Solar Powered', 
      desc: 'Unit balcony solar + battery storage, lower bills',
      details: 'Private balcony solar panels with building-wide battery storage. Designed to help lower utility costs. Live sustainably without the effort.',
      link: '/sustainability'
    },
    { 
      title: 'Tech Package: 1GB WiFi', 
      desc: 'Included in technology package, simple billing',
      details: 'Optional technology package with 1GB high-speed WiFi, smart home connectivity, and energy monitoring — one simple add-on for total convenience.'
    },
  ]
  const [waitlistCount, setWaitlistCount] = useState(147)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase.from('waitlist').insert({
        email: formData.email.toLowerCase().trim(),
        name: formData.name || null,
        phone: formData.phone || null,
        unit_preference: formData.bedroomPreference || null,
        source: 'website',
      })

      if (error) {
        if (error.code === '23505') {
          setSubmitError('This email is already on the waitlist!')
        } else {
          console.error('Supabase error:', error)
          setSubmitError('Something went wrong. Please try again.')
        }
        setIsSubmitting(false)
        return
      }

      setIsSubmitted(true)
      setWaitlistCount(prev => prev + 1)
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitError('Something went wrong. Please try again.')
    }

    setIsSubmitting(false)
  }

  const scrollToForm = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/fera-esrgan/hero-building.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-red-500 text-sm tracking-[0.3em] uppercase mb-6 font-medium">
            Coming Spring 2026 • Hillcrest, San Diego
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight leading-tight">
            Ready to move in
            <br />
            <span className="text-red-500 font-normal">without the stress?</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-10 font-light max-w-2xl mx-auto">
            Fully furnished apartments. Smart home technology. 
            <br className="hidden md:block" />
            A community designed for modern living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="px-10 py-4 bg-red-600 text-white text-lg font-semibold rounded hover:bg-red-500 transition-all hover:scale-105"
            >
              Get Priority Access
            </button>
            <Link
              href="/amenities"
              className="px-10 py-4 border border-white/30 text-white text-lg font-medium rounded hover:bg-white/10 transition-all"
            >
              Explore Amenities
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Living Made Easy</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Move in with just
                <br />
                <span className="text-red-500">your toothbrush</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Welcome to DOMO Living on 4th — San Diego's newest sustainable lifestyle community. 
                Every residence arrives elegantly furnished with premium appliances and smart home technology. 
                Our solar-integrated balconies bring clean energy to apartment living in a way no other building can. 
                Skip the setup. Start living.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '60', label: 'Residences' },
                  { num: '100%', label: 'Furnished' },
                  { num: '1GB', label: 'WiFi Available' },
                  { num: '360°', label: 'Bay & Ocean Views' },
                ].map((stat) => (
                  <div key={stat.label} className="border-l-2 border-red-600/50 pl-4">
                    <div className="text-3xl font-light text-red-500">{stat.num}</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="aspect-[4/3] w-full rounded-lg object-cover"
                poster="/images/fera-esrgan/kitchen.jpg"
              >
                <source src="/video/unit-interior-loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Every Unit Includes</p>
            <h2 className="text-4xl md:text-5xl font-light">
              Everything you need,
              <br />
              <span className="text-white/50">nothing you don't</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <button
                key={feature.title}
                onClick={() => setExpandedFeature(expandedFeature === feature.title ? null : feature.title)}
                className="p-8 bg-white/5 rounded-lg hover:bg-white/10 transition-all group text-left"
              >
                <div className="flex justify-between items-start">
                  <h3 className={`text-xl font-medium mb-2 transition-colors ${expandedFeature === feature.title ? 'text-red-500' : 'group-hover:text-red-500'}`}>
                    {feature.title}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${expandedFeature === feature.title ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === feature.title ? 'max-h-48 mt-4 pt-4 border-t border-white/10' : 'max-h-0'}`}>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.details}</p>
                  {feature.link && (
                    <Link 
                      href={feature.link} 
                      className="inline-block mt-3 text-red-500 hover:text-red-400 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Learn more →
                    </Link>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/units" className="text-red-500 hover:text-red-400 transition-colors">
              View all unit features →
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Gallery */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Life at DOMO</p>
            <h2 className="text-4xl md:text-5xl font-light">
              More than an apartment,
              <br />
              <span className="text-white/50">it's a lifestyle</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { image: '/images/fera-esrgan/rooftop-friends.jpg', title: '360° Rooftop', desc: 'Movie nights, BBQ, Bay & sunset views' },
              { image: '/images/fera-esrgan/rooftop-work.jpg', title: 'Work Anywhere', desc: 'Rooftop co-working spaces' },
              { image: '/images/fera-esrgan/package-room.jpg', title: 'Smart Amenities', desc: 'Package lockers, concierge tech' },
              { image: '/images/fera-esrgan/bedroom-closet.jpg', title: 'Thoughtful Design', desc: 'Custom closets, premium finishes' },
              { image: '/images/gym.jpg', title: 'Wellness Center', desc: 'Rooftop fitness studio' },
            ].map((item, i) => (
              <Link 
                href="/amenities"
                key={item.title} 
                className={`relative overflow-hidden rounded-lg group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div 
                  className={`bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${i === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/amenities" className="text-red-500 hover:text-red-400 transition-colors">
              Explore all amenities →
            </Link>
          </div>
        </div>
      </section>

      {/* Video Feed */}
      <VideoFeed />

      {/* Location Teaser */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div 
              className="aspect-video rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('/images/fera-esrgan/arrival-car.jpg')` }}
            />
            <div>
              <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Hillcrest, San Diego</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                The heart of
                <br />
                <span className="text-red-500">San Diego's best neighborhood</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Steps from Balboa Park, surrounded by San Diego's best cafes, restaurants, and nightlife.
                Rooftop views stretch from Point Loma to downtown to the Bay.
                Walk Score: 95. Bike Score: 89. Everything you need is at your doorstep.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-3">2 blocks from Balboa Park</li>
                <li className="flex items-center gap-3">50+ restaurants within walking distance</li>
                <li className="flex items-center gap-3">Car-optional lifestyle</li>
                <li className="flex items-center gap-3">Year-round outdoor living</li>
              </ul>
              <div className="mt-8">
                <Link href="/building" className="text-red-500 hover:text-red-400 transition-colors">
                  Learn more about the building →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Tour */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Virtual Tour</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Explore your
              <br />
              <span className="text-white/50">new home</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Walk through our model unit in immersive 3D. See the quality, feel the space.
            </p>
          </div>
          
          <div className="aspect-video w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-white/10">
            <iframe
              src="https://my.matterport.com/show/?m=1HxB4RYdnb1"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="xr-spatial-tracking"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          
          <p className="text-center text-white/30 text-sm mt-6">
            Use your mouse or touch to navigate. Click the arrows to move through the space.
          </p>
        </div>
      </section>

      {/* Building Explorer */}
      <BuildingHotspot />

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-red-900/20">
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-12">
                <p className="text-red-500 text-sm tracking-[0.2em] uppercase mb-4">Be First</p>
                <h2 className="text-4xl md:text-5xl font-light mb-4">
                  Get priority access
                </h2>
                <p className="text-white/50 text-lg">
                  Join {waitlistCount} others on the waitlist for exclusive updates, early tours, and first pick of units.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Email address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={formData.moveInTimeline}
                    onChange={(e) => setFormData({ ...formData, moveInTimeline: e.target.value })}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                  >
                    <option value="" className="bg-[#0a0a0a]">Move-in Timeline</option>
                    <option value="asap" className="bg-[#0a0a0a]">ASAP</option>
                    <option value="1-3" className="bg-[#0a0a0a]">1-3 months</option>
                    <option value="3-6" className="bg-[#0a0a0a]">3-6 months</option>
                    <option value="exploring" className="bg-[#0a0a0a]">Just exploring</option>
                  </select>
                  <select
                    value={formData.bedroomPreference}
                    onChange={(e) => setFormData({ ...formData, bedroomPreference: e.target.value })}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                  >
                    <option value="" className="bg-[#0a0a0a]">Bedroom Preference</option>
                    <option value="penthouse" className="bg-[#0a0a0a]">Penthouse</option>
                    <option value="1br" className="bg-[#0a0a0a]">1 Bedroom</option>
                    <option value="2br" className="bg-[#0a0a0a]">2 Bedroom</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 text-white text-lg font-semibold rounded hover:bg-red-500 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                </button>

                {submitError && (
                  <p className="text-center text-red-400 text-sm">{submitError}</p>
                )}

                <p className="text-center text-white/30 text-sm">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-4xl font-light mb-4">You're on the list!</h2>
              <p className="text-white/50 text-lg mb-2">
                Thanks for joining. We'll be in touch with exclusive updates and early access to tours.
              </p>
              <p className="text-red-500 text-lg">
                You're #{waitlistCount} on the waitlist
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ask AI Comparison */}
      <AskAI />

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-light tracking-wider mb-1">
                <span className="font-semibold">DOMO</span>
                <span className="text-red-500">Living</span>
                <span className="text-white/50 text-lg ml-2">on 4th</span>
              </div>
              <p className="text-white/30 text-sm">Living Made Easy</p>
            </div>
            <nav className="flex gap-8 text-sm text-white/50">
              <Link href="/amenities" className="hover:text-white transition-colors">Amenities</Link>
              <Link href="/units" className="hover:text-white transition-colors">Units</Link>
              <Link href="/building" className="hover:text-white transition-colors">Building</Link>
              <Link href="/solar" className="hover:text-white transition-colors">Sustainable Living</Link>
            </nav>
            <div className="text-center md:text-right">
              <p className="text-white/50">3745 4th Avenue</p>
              <p className="text-white/50">Hillcrest, San Diego, CA 92103</p>
              <p className="text-red-500 mt-2">leasing@domoliving.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
            © 2026 Domo Living. All rights reserved. | Coming Spring 2026
          </div>
          <p className="text-white/20 text-[10px] leading-relaxed text-center mt-4">
            All renderings, images, amenities, and features are conceptual and subject to change. The building is under construction and final finishes, layouts, and specifications may vary. Sustainability goals and energy savings are projections, not guarantees. Furnishings shown are representative. Pricing subject to change. Contact leasing for current details.
          </p>
        </div>
      </footer>
    </main>
  )
}
