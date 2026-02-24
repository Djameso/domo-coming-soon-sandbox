'use client'

import { useState } from 'react'

const PROMPTS: Record<string, string> = {
  home: `I'm researching apartments in Hillcrest, San Diego and found DOMO Living on 4th (3745 4th Avenue, 92103). I'd love your help comparing it to other new apartments in the area like Denizen, Evoc Hillcrest, and FLATS Hillcrest.

Here's what I know about DOMO Living — can you help me understand how this stacks up?

PROPERTY BASICS:
- 60-unit community (no studios — all proper 1-bedrooms and 2-bedrooms with separate rooms and full bathrooms)
- 1BR from $2,450/mo, 2BR from $2,850/mo, Penthouses from $3,300/mo
- Walk Score: 95, Bike Score: 89
- 2 blocks from Balboa Park, walkable to 100+ restaurants, coffee shops, bars, and gyms
- Opening Spring 2026

FULLY FURNISHED & MOVE-IN READY:
- Every unit comes fully furnished — platform bed, sofa, dining set, work desk
- No need to buy furniture, rent a truck, or haul anything up elevators
- Premium Samsung kitchen (fridge, range, convection microwave, dishwasher) with quartz countertops
- Miele washer/dryer in every unit (premium German brand, not builder-grade)
- You literally move in with your toothbrush — everything is ready day one

SMART BUILDING — ONE APP CONTROLS EVERYTHING:
- The DOMO app is a single hub that controls your entire living experience
- Digital keys for building entry and apartment access (SALTO keyless — no physical keys)
- Smart thermostat and addressable lighting control
- Motorized shade control
- Pay rent directly in the app
- Submit maintenance requests and troubleshoot issues
- Community page (like a Nextdoor app but just for DOMO residents) for events, neighbor connections, and building updates
- Smart package lockers with app notifications when deliveries arrive

SOLAR & SUSTAINABILITY (MAJOR COST SAVINGS):
- Every balcony has integrated solar panels with Enphase battery storage
- Building is 70% solar powered — residents benefit from significantly lower SDG&E electricity costs
- 100% electric building — zero gas appliances, zero gas bills
- In-app energy dashboard so residents can monitor their solar production and energy usage
- 50% water reduction through efficient systems
- E-bike sharing program included
- This is San Diego's first truly sustainable apartment community

AMENITIES:
- 360° rooftop with panoramic views (San Diego Bay, ocean sunsets, downtown skyline)
- Rooftop fire pits, BBQ outdoor kitchen, lounge seating, string lights
- Rooftop co-working with shaded desks, power outlets, WiFi, standing desks, video call booths
- Wellness center with gym, yoga studio, meditation room, and recovery zone
- WeWork-style co-working lounge with modular seating
- Pet spa with wash and grooming stations
- Optional technology package: 1GB high-speed WiFi, DOMO app, energy monitoring
- Secure garage parking
- Trash valet service

LOCATION — HILLCREST:
- 10 min to downtown San Diego
- 10 min to the airport
- 20 min to UCSD/La Jolla
- 15 min to the beach
- Walking distance to Balboa Park, San Diego Zoo, Trader Joe's, dozens of restaurants and bars

Please compare DOMO to the other new Hillcrest apartments on value — factoring in that DOMO includes furnishings (saving $3,000-$5,000), includes premium Miele appliances, has solar designed to help reduce electricity bills, and the smart home app that replaces multiple services. What would be the true cost comparison when you factor in everything that's included vs. what you'd pay separately at other buildings?`,

  amenities: `I'm looking at DOMO Living on 4th in Hillcrest, San Diego (3745 4th Ave, 92103) and I'm really interested in the amenities. Can you help me understand what they offer and how it compares to other apartment buildings in the area?

DOMO LIVING AMENITIES — FULL BREAKDOWN:

ROOFTOP (360° PANORAMIC VIEWS):
- Full 360° views: San Diego Bay, Pacific Ocean sunsets, downtown skyline, mountains
- Fire pit gathering areas with lounge seating
- Outdoor BBQ kitchen for cooking and entertaining
- String lights and ambient evening lighting
- Shaded co-working desks with power outlets and WiFi
- Standing desks and private video call booths for remote workers
- Designed for both social gatherings and quiet work — not just a small patio

WELLNESS CENTER (NOT JUST A GYM):
- Full cardio and strength training equipment
- Dedicated yoga and Pilates studio
- Meditation room for mindfulness practice
- Recovery zone for post-workout
- Indoor/outdoor fitness areas with city views
- This is a holistic wellness approach — most apartments just throw a few treadmills in a room

COMMUNITY SPACES:
- WeWork-inspired co-working lounge with modular seating
- Event-ready community room with large displays
- Coffee bar
- Designed for meetups, remote work, and community events

SMART BUILDING FEATURES:
- Smart package lockers with 24/7 access and app notifications when deliveries arrive
- DOMO app controls everything: building entry, apartment access, thermostat, lighting, shades, rent payment, maintenance requests, and a community page (like Nextdoor but just for residents)
- SALTO digital keyless entry — no physical keys ever
- Optional tech package: 1GB high-speed WiFi, app connectivity, energy monitoring

PET AMENITIES:
- Dedicated pet spa with wash and grooming stations
- Drying stations so your bathroom stays clean
- Balboa Park (1,200 acres) is a 5-minute walk for dog walks and off-leash areas
- Pet-friendly restaurants and patios throughout Hillcrest

SUSTAINABILITY AMENITIES:
- E-bike sharing program included for residents
- Solar-powered building (70%) with Enphase battery storage on balconies
- In-app energy dashboard to track your solar production and usage
- 50% water reduction systems

OTHER SERVICES:
- Secure garage parking
- Trash valet service (doorstep pickup)

How do these amenities compare to other new buildings in Hillcrest like Denizen, Evoc, and FLATS? What amenities does DOMO offer that are unusual or hard to find in other San Diego apartments?`,

  units: `I'm comparing apartment units at DOMO Living on 4th in Hillcrest, San Diego (3745 4th Ave, 92103). Can you help me understand the value of what's included?

DOMO LIVING UNITS — WHAT'S INCLUDED:

UNIT TYPES (NO STUDIOS — all have separate bedrooms and full bathrooms):
- 1-Bedroom: from 425 sq ft, from $2,450/mo
- 1 & 2 Bedroom: 425-630 sq ft, from $2,450/mo
- Top Floor: From 425 sq ft with 450 sq ft private balcony, from $3,300/mo with ocean views

EVERY UNIT COMES FULLY FURNISHED (move-in ready — no furniture shopping, no hauling things up elevators):
- Platform bed frame with premium mattress
- Sofa
- Work desk and office chair
- Side tables and lighting

PREMIUM KITCHEN (not builder-grade):
- Samsung refrigerator
- Samsung electric range with hood
- Convection microwave
- Quartz countertops with undermount sink
- Soft-close cabinets with ample storage

IN-UNIT LAUNDRY:
- Miele washer and dryer in every unit (premium German brand — quiet, efficient, durable)
- Not shared, not coin-operated, not down the hall

SMART HOME PACKAGE:
- SALTO keyless digital entry (building + apartment)
- Smart thermostat
- Addressable lighting control
- Motorized shade control
- All controlled from the DOMO app (same app for rent, maintenance, community)

BATHROOM:
- Rainfall showerhead
- Heated towel rack
- Premium fixtures

STORAGE:
- Expandable walk-in closet system

CONNECTIVITY:
- Optional technology package with 1GB high-speed WiFi, smart home app, energy monitoring

SUSTAINABILITY:
- Balcony solar panels with Enphase battery storage
- In-app energy dashboard
- Lower SDG&E electricity costs
- 100% electric — zero gas bills

Hillcrest average rent is about $2,320 for a 1BR and $2,840 for a 2BR. DOMO's $2,450 for a 1BR seems slightly above average, but factor in that it includes: full furnishings ($3,000-$5,000 value), Miele W/D (vs. shared laundry elsewhere), premium Samsung appliances (vs. builder-grade), smart home package, and potential solar energy savings. What's the true cost comparison when you add up everything you'd pay separately at a typical Hillcrest apartment?`,

  sustainability: `I'm interested in the sustainability features at DOMO Living on 4th in Hillcrest, San Diego (3745 4th Ave, 92103). This building claims to be San Diego's first truly sustainable apartment community. Can you help me understand what they're doing and how it compares?

DOMO LIVING SUSTAINABILITY — FULL BREAKDOWN:

SOLAR ENERGY SYSTEM:
- Every balcony has integrated solar panels — not just rooftop panels, but building-integrated photovoltaics
- Enphase battery storage system stores excess solar energy for use after sunset
- Building is 70% solar powered overall
- Residents benefit directly from lower SDG&E electricity costs (SDG&E is one of the most expensive utilities in the US)
- In-app energy dashboard lets residents monitor their personal solar production and energy consumption in real-time
- First building in San Diego with this level of solar integration at the unit level

100% ELECTRIC BUILDING:
- Zero gas appliances — no gas stove, no gas water heater, no gas heating
- Zero gas infrastructure in the building at all
- Fully electric Samsung kitchen appliances (induction-ready)
- Electric HVAC systems
- This means zero Scope 1 emissions from the building itself

WATER CONSERVATION:
- 50% water reduction through high-efficiency fixtures and systems
- Low-flow fixtures throughout
- Efficient landscaping design

SUSTAINABLE TRANSPORTATION:
- E-bike sharing program included for all residents
- Secure bike storage
- Walk Score of 95 means most daily errands don't require a car
- 2 blocks from Balboa Park for walking/cycling
- EV-ready parking infrastructure

MODULAR CONSTRUCTION:
- Building constructed using prefabricated steel volumetric modules
- Modular construction reduces construction waste by up to 90% compared to traditional building
- Factory-controlled environment means less material waste, more precision
- Faster construction = less neighborhood disruption

RESIDENT IMPACT:
- Lower monthly electricity bills thanks to solar + battery offsetting SDG&E rates
- No gas bills at all (100% electric)
- E-bike program reduces transportation costs
- Energy dashboard promotes conscious consumption
- Living in a Walk Score 95 neighborhood naturally reduces car dependence

How does this compare to other new apartment buildings in San Diego? Are there other apartments in Hillcrest or greater San Diego that offer this level of sustainability? What would the estimated monthly savings be on SDG&E with 70% solar offset vs. a traditional apartment?`,

  building: `I'm researching the building technology and features at DOMO Living on 4th in Hillcrest, San Diego (3745 4th Ave, 92103). Can you help me understand what makes this building unique?

DOMO LIVING BUILDING FEATURES:

SMART BUILDING TECHNOLOGY — ONE APP FOR EVERYTHING:
- The DOMO app is a single hub controlling the entire living experience
- Digital keys: SALTO keyless entry for building and apartment (no physical keys)
- Smart thermostat control from the app
- Addressable lighting control from the app
- Motorized shade control from the app
- Pay rent directly in the app
- Submit maintenance requests and troubleshoot issues through the app
- Community page built into the app (like Nextdoor but just for DOMO residents)
- Smart package lockers with app notifications when deliveries arrive
- This replaces 5-6 separate apps/services that other buildings require

SOLAR & ENERGY:
- Balcony solar panels with Enphase battery storage
- 70% solar powered building
- 100% electric — zero gas infrastructure
- In-app energy dashboard for real-time monitoring
- Significantly lower SDG&E costs passed to residents

CONSTRUCTION:
- Built using prefabricated steel volumetric modular construction
- Factory-precision manufacturing for higher quality finishes
- Vertically integrated — DOMO designs, manufactures, and manages
- 60-unit boutique scale (not a 300+ unit mega-complex)

SECURITY:
- SALTO smart lock access control (building + unit)
- Video intercom system
- 24/7 camera monitoring
- Secure garage parking

CONNECTIVITY:
- Building-wide 1GB high-speed WiFi optic infrastructure (optional tech package)
- WiFi in common areas and rooftop
- Available as optional technology package add-on

BUILDING SERVICES:
- Trash valet (doorstep pickup)
- Smart package lockers (24/7)
- E-bike sharing program
- Pet spa

How does this building technology compare to other new construction in Hillcrest? Is the single-app approach common in San Diego apartments, or is DOMO ahead of the curve?`,
}

const SUBTITLES: Record<string, string> = {
  home: 'Get an instant, detailed comparison of DOMO Living versus other apartments in Hillcrest. See how we stack up on value, amenities, and total cost.',
  amenities: 'Ask AI to compare our amenities to other Hillcrest apartments. See what makes DOMO\'s rooftop, wellness center, and smart features stand out.',
  units: 'Ask AI to break down the true value of a DOMO unit — factoring in everything that\'s included vs. what you\'d pay separately elsewhere.',
  sustainability: 'Ask AI about our solar system, Enphase batteries, and sustainability features. See how DOMO\'s energy savings compare to traditional apartments.',
  building: 'Ask AI about our smart building technology, the DOMO app, and what makes this building different from anything else in San Diego.',
}

function getPlatforms() {
  return [
    {
      name: 'ChatGPT',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
        </svg>
      ),
      url: 'https://chat.openai.com/',
      color: 'hover:text-[#10a37f]',
      bgColor: 'hover:bg-[#10a37f]/10',
    },
    {
      name: 'Claude',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M4.709 15.955l4.661-2.508L4.783 8.61l2.38-4.121 8.724 1.242L13.06.386h4.755l1.283 5.04 4.148 2.293-1.903 4.343-4.478-1.57L18.806 24H14.14l-.429-5.205-4.611 1.248-1.32-4.29-4.465-1.093zm8.727-.152l-.39 4.725h1.478l.664-9.095-4.67 2.514 2.918 1.856z" />
        </svg>
      ),
      url: 'https://claude.ai/new',
      color: 'hover:text-[#d97706]',
      bgColor: 'hover:bg-[#d97706]/10',
    },
    {
      name: 'Perplexity',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M6.923 1.846L11.538 5.77V1.846h.924v3.923l4.615-3.923v5.077h2.769V1.846h.923v5.077H24v.923h-3.23v6.462H24v.923h-3.23v6.923h-.924v-6.923h-2.769v5.538l-4.615-3.923v3.923h-.924v-3.923L6.923 21.23v-5.538H4.154v6.923h-.923v-6.923H0v-.923h3.23V8.308H0v-.923h3.23V1.846h.924v5.539h2.769V1.846zm0 5.539v6.923h4.615V7.385h-4.615zm5.539 0v6.923h4.615V7.385h-4.615zm-5.539 7.846v3.692l3.692-3.692H6.923zm5.539 0l3.692 3.692V15.23h-3.692zm3.692-11.538l-3.692 3.692h3.692V3.692zm-5.539 0v3.692h3.693L10.615 3.692z" />
        </svg>
      ),
      url: 'https://www.perplexity.ai/',
      color: 'hover:text-[#20b8cd]',
      bgColor: 'hover:bg-[#20b8cd]/10',
    },
    {
      name: 'Gemini',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M12 0C12 0 12 8 8 12C12 12 12 24 12 24C12 24 12 16 16 12C12 12 12 0 12 0Z" />
        </svg>
      ),
      url: 'https://gemini.google.com/app',
      color: 'hover:text-[#4285f4]',
      bgColor: 'hover:bg-[#4285f4]/10',
    },
    {
      name: 'Grok',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M2.04 4.055h4.201L13.8 15.4l-2.48 3.357L2.04 4.055zm8.493 7.16l2.273-3.261L19.96 19.97h-4.176l-5.25-8.756zm7.456-11.185L12.226 8.71l-2.124-3.357L14.85.027h3.14zM6.617 23.945l4.76-7.384 2.145 3.358-3.866 4.026H6.617z" />
        </svg>
      ),
      url: 'https://grok.com/',
      color: 'hover:text-white',
      bgColor: 'hover:bg-white/10',
    },
  ]
}

export default function AskAI({ context = 'home' }: { context?: string }) {
  const [copied, setCopied] = useState(false)
  const [openedPlatform, setOpenedPlatform] = useState<string | null>(null)
  const platforms = getPlatforms()
  const prompt = PROMPTS[context] || PROMPTS.home
  const subtitle = SUBTITLES[context] || SUBTITLES.home

  const copyAndOpen = (url: string, name: string) => {
    navigator.clipboard.writeText(prompt)
    setOpenedPlatform(name)
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }, 300)
    setTimeout(() => setOpenedPlatform(null), 3000)
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="py-16 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-white/60 text-xs tracking-wider uppercase">AI-Powered Research</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-light mb-3">
          Don't take our word for it —
          <br />
          <span className="text-red-500">ask AI to compare</span>
        </h3>
        <p className="text-white/50 text-sm mb-8 max-w-lg mx-auto">
          {subtitle}
        </p>

        {/* Copy Prompt — PRIMARY action, prominent */}
        <button
          onClick={copyPrompt}
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 transition-all duration-300 mb-8 ${
            copied 
              ? 'bg-green-500/20 border-green-500/50 text-green-400' 
              : 'bg-white/5 border-red-500/30 text-white hover:bg-red-500/10 hover:border-red-500/50'
          }`}
        >
          <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>✨</span>
          <div className="text-left">
            <div className="text-sm font-semibold">
              {copied ? '✓ Copied! Paste into any AI →' : 'Copy DOMO Comparison Prompt'}
            </div>
            <div className={`text-xs ${copied ? 'text-green-400/70' : 'text-white/40'}`}>
              {copied ? 'Ready to paste into ChatGPT, Claude, or any AI' : 'One tap — then paste into your favorite AI'}
            </div>
          </div>
          <span className="text-2xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>✨</span>
        </button>

        {/* LLM Quick Links */}
        <p className="text-white/30 text-xs uppercase tracking-wider mb-4">Or open directly</p>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => copyAndOpen(platform.url, platform.name)}
              className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 transition-all duration-200 ${platform.color} ${platform.bgColor} hover:border-white/20`}
            >
              {platform.icon}
              <span className="text-sm font-medium">
                {openedPlatform === platform.name ? 'Copied! Opening...' : platform.name}
              </span>
              <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          ))}
        </div>
        <p className="text-white/20 text-xs">
          Copies our comparison prompt to your clipboard, then opens the AI — just paste and go
        </p>
      </div>
    </section>
  )
}
