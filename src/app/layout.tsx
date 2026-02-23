import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DOMO Living on 4th | Coming Soon | Hillcrest, San Diego',
  description: 'Fully furnished apartments in Hillcrest, San Diego. Smart living, connected community, rooftop views. Join the waitlist for priority access.',
  keywords: ['apartments', 'Hillcrest', 'San Diego', 'furnished apartments', 'smart home', 'luxury rentals'],
  openGraph: {
    title: 'DOMO Living on 4th | Coming Soon',
    description: 'Fully furnished. Smart living. Connected community. 60 residences in Hillcrest, San Diego.',
    images: ['/og-image.jpg'],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "name": "DOMO Living on 4th",
  "url": "https://livdomo.com",
  "description": "60-unit, 6-story fully furnished apartment community in Hillcrest, San Diego. Smart home technology, rooftop wellness center, solar balconies, and Miele washer/dryer in every unit. Opening Spring 2026.",
  "image": "https://livdomo.com/og-image.jpg",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3743 4th Avenue",
    "addressLocality": "San Diego",
    "addressRegion": "CA",
    "postalCode": "92103",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.7485,
    "longitude": -117.1615
  },
  "numberOfAvailableAccommodation": 60,
  "numberOfAccommodationUnits": 60,
  "petsAllowed": true,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Rooftop Wellness Center", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "In-Unit Miele Washer/Dryer", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fully Furnished Units", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Smart Home Technology", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Solar Balconies with Battery Storage", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Pet Wash Area", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "E-Bike Program", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Co-Working Space", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Secure Parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fitness Center", "value": true }
  ],
  "containsPlace": [
    {
      "@type": "Apartment",
      "name": "1-Bedroom Apartment",
      "description": "Fully furnished 1-bedroom apartment with smart home technology, Miele washer/dryer, and solar balcony.",
      "numberOfBedrooms": 1,
      "numberOfRooms": 3,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": 450,
        "unitCode": "FTK"
      },
      "offers": {
        "@type": "Offer",
        "price": "2450",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "2450",
          "priceCurrency": "USD",
          "unitText": "MONTHLY",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "MON"
          }
        }
      }
    },
    {
      "@type": "Apartment",
      "name": "2-Bedroom Apartment",
      "description": "Fully furnished 2-bedroom apartment with smart home technology, Miele washer/dryer, and solar balcony.",
      "numberOfBedrooms": 2,
      "numberOfRooms": 4,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": 630,
        "unitCode": "FTK"
      },
      "offers": {
        "@type": "Offer",
        "price": "3200",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "3200",
          "priceCurrency": "USD",
          "unitText": "MONTHLY",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "MON"
          }
        }
      }
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
