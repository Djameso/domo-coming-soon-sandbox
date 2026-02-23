'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { href: '/amenities', label: 'Amenities' },
  { href: '/units', label: 'Units' },
  { href: '/building', label: 'Building' },
  { href: '/solar', label: 'Sustainable Living' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-light tracking-wider">
          <span className="font-semibold">DOMO</span>
          <span className="text-red-500">Living</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? 'text-white text-sm font-medium'
                  : 'text-white/70 hover:text-white transition-colors text-sm'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/#waitlist"
            className="hidden md:inline-block px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-all"
          >
            Join Waitlist
          </Link>

          {/* Hamburger button - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed left-0 right-0 bottom-0 bg-[#0a0a0a] z-[60]"
          style={{ top: '65px' }}
        >
          <nav className="flex flex-col items-center pt-12 gap-2 px-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`w-full text-center py-4 text-xl transition-colors border-b border-white/5 ${
                pathname === '/' ? 'text-red-500 font-medium' : 'text-white/80'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center py-4 text-xl transition-colors border-b border-white/5 ${
                  pathname === link.href ? 'text-red-500 font-medium' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={() => setMenuOpen(false)}
              className="mt-8 w-full text-center px-10 py-4 bg-red-600 text-white text-lg font-semibold rounded hover:bg-red-500 transition-all"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
