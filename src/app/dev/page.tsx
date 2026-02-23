'use client';

import { useState } from 'react';
import Link from 'next/link';

// Type for review items
interface ReviewItem {
  id: string;
  current: string;
  proposed: string;
  detail: string;
  isNew?: boolean;
}

interface Section {
  title: string;
  items: ReviewItem[];
}

// Content sections for review
const sections: Record<string, Section> = {
  homepage: {
    title: 'Homepage Feature Cards',
    items: [
      {
        id: 'card-furniture',
        current: 'Designer-Inspired Furniture',
        proposed: 'Fully-Furnished, Move-in Ready',
        detail: 'Built-in couch, entertainment center, bed system, expandable walk-in closet',
      },
      {
        id: 'card-smarthome',
        current: 'Smart Home Tech (basic)',
        proposed: 'DOMO Smart Home',
        detail: 'DOMO App controls, scene control, Salto locks, wireless shades & lighting, digital access',
      },
      {
        id: 'card-kitchen',
        current: 'Premium Kitchen (generic)',
        proposed: 'Samsung Premium Kitchen',
        detail: 'Samsung Bespoke™ fridge, 4-burner electric cooktop, convection microwave/oven, Corian counters',
      },
      {
        id: 'card-laundry',
        current: 'Miele In-Unit Laundry ✅',
        proposed: 'No change needed',
        detail: 'Already accurate',
      },
      {
        id: 'card-solar',
        current: 'Solar Powered (basic)',
        proposed: 'Personal Solar + Battery',
        detail: 'Balcony solar panels + Enphase battery system in each unit',
      },
      {
        id: 'card-internet',
        current: '1GB Fiber Internet',
        proposed: 'Building-Wide Tech Package',
        detail: '1GB fiber + building-wide WiFi + smart package room',
      },
    ],
  },
  amenities: {
    title: 'Amenities Page Updates',
    items: [
      {
        id: 'amenity-rooftop',
        current: '360° Rooftop Terrace',
        proposed: 'Add: Audio/Video controls, 360° views callout',
        detail: 'Enhance copy to mention AV system and panoramic views',
      },
      {
        id: 'amenity-cowork',
        current: 'Co-Working Lounge',
        proposed: 'Add: Business Center designation',
        detail: 'Co-Working Areas / Business Center with rooftop access',
      },
      {
        id: 'amenity-ebike',
        current: '(not present)',
        proposed: 'NEW: eBike/MicroMobility Hub',
        detail: 'MicroMobility/eBike sharing program for residents',
        isNew: true,
      },
      {
        id: 'amenity-package',
        current: 'Package Room (basic)',
        proposed: 'Smart Package Room',
        detail: 'Digital access, notification system',
      },
      {
        id: 'amenity-pet',
        current: 'Pet Spa (needs image)',
        proposed: 'Generate FERA-style image',
        detail: 'Need AI-generated image matching warm golden-hour aesthetic',
      },
    ],
  },
  units: {
    title: 'Units Page Updates',
    items: [
      {
        id: 'unit-appliances',
        current: 'Generic appliance list',
        proposed: 'Branded Appliance Table',
        detail: `
• Samsung Bespoke™ Refrigerator w/freezer
• Miele Electric Washer & Dryer  
• Samsung Electric Cooktop (4-burner touch control)
• Samsung Convection Microwave/Oven
• Daikin VRV HVAC w/smart thermostat`,
      },
      {
        id: 'unit-fixtures',
        current: 'Basic fixtures mention',
        proposed: 'Premium Fixtures Detail',
        detail: `
• Floor-to-Ceiling Glass Balcony Door
• Luxury LVT Flooring
• Solid Surface Corian Countertops
• Designer LED Lighting
• Premium water-saving plumbing fixtures`,
      },
      {
        id: 'unit-furniture',
        current: 'Furnished mention',
        proposed: 'Built-In Furniture Package',
        detail: `
• Built-in couch (not loose furniture)
• Built-in entertainment center
• Built-in bed system
• Expandable walk-in closet
• Flexible storage throughout`,
      },
    ],
  },
  sustainability: {
    title: 'Sustainability Page (New)',
    items: [
      {
        id: 'solar-balcony',
        current: '(placeholder page)',
        proposed: 'Solar Balconies Section',
        detail: 'Private solar panels on each unit balcony — your personal power plant',
        isNew: true,
      },
      {
        id: 'solar-bipv',
        current: '(placeholder page)',
        proposed: 'BIPV Facade Section',
        detail: 'First BIPV residential building in San Diego — the building itself generates power',
        isNew: true,
      },
      {
        id: 'solar-canopy',
        current: '(placeholder page)',
        proposed: 'Rooftop Canopies Section',
        detail: 'Solar canopy structures on rooftop — shade + power generation',
        isNew: true,
      },
      {
        id: 'solar-net',
        current: '(placeholder page)',
        proposed: 'Net-Positive Messaging',
        detail: 'Building produces more energy than it consumes — savings passed to residents',
        isNew: true,
      },
    ],
  },
};

type ApprovalState = { [key: string]: 'pending' | 'approved' | 'needs-changes' };

export default function DevPage() {
  const [approvals, setApprovals] = useState<ApprovalState>({});
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [showNotes, setShowNotes] = useState<string | null>(null);

  const setApproval = (id: string, status: 'pending' | 'approved' | 'needs-changes') => {
    setApprovals((prev) => ({ ...prev, [id]: status }));
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 border-green-500 text-green-400';
      case 'needs-changes':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      default:
        return 'bg-neutral-800 border-neutral-700 text-neutral-400';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'needs-changes':
        return '✎';
      default:
        return '○';
    }
  };

  const approvedCount = Object.values(approvals).filter((s) => s === 'approved').length;
  const totalItems = Object.values(sections).reduce((acc, s) => acc + s.items.length, 0);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">DOMO Content Review</h1>
            <p className="text-sm text-neutral-500">Dev Preview — Not Public</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">
              {approvedCount}/{totalItems} approved
            </span>
            <Link
              href="/"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition"
            >
              View Live Site →
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-neutral-900">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${(approvedCount / totalItems) * 100}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Instructions */}
        <div className="mb-8 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
          <h2 className="font-semibold mb-2">📋 Review Instructions</h2>
          <ul className="text-sm text-neutral-400 space-y-1">
            <li>• Click <span className="text-green-400">✓ Approve</span> for items ready to implement</li>
            <li>• Click <span className="text-yellow-400">✎ Changes</span> to flag items needing revision</li>
            <li>• Add notes for any specific feedback</li>
            <li>• Once reviewed, I&apos;ll implement all approved items</li>
          </ul>
        </div>

        {/* Sections */}
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">
                {section.items.filter((i) => approvals[i.id] === 'approved').length}
              </span>
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-xl border transition-all ${getStatusColor(approvals[item.id])}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getStatusIcon(approvals[item.id])}</span>
                        {item.isNew && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            NEW
                          </span>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Current</p>
                          <p className="text-neutral-400">{item.current}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Proposed</p>
                          <p className="text-white font-medium">{item.proposed}</p>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-black/30 rounded-lg">
                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Detail</p>
                        <p className="text-sm text-neutral-300 whitespace-pre-line">{item.detail}</p>
                      </div>

                      {/* Notes input */}
                      {showNotes === item.id && (
                        <div className="mt-3">
                          <textarea
                            className="w-full p-3 bg-black border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                            placeholder="Add your notes or requested changes..."
                            rows={2}
                            value={notes[item.id] || ''}
                            onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                          />
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setApproval(item.id, 'approved')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition ${
                          approvals[item.id] === 'approved'
                            ? 'bg-green-500 text-white'
                            : 'bg-neutral-800 hover:bg-green-500/20 text-neutral-400 hover:text-green-400'
                        }`}
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => {
                          setApproval(item.id, 'needs-changes');
                          setShowNotes(item.id);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-lg transition ${
                          approvals[item.id] === 'needs-changes'
                            ? 'bg-yellow-500 text-black'
                            : 'bg-neutral-800 hover:bg-yellow-500/20 text-neutral-400 hover:text-yellow-400'
                        }`}
                      >
                        ✎ Changes
                      </button>
                      <button
                        onClick={() => setShowNotes(showNotes === item.id ? null : item.id)}
                        className="px-3 py-1.5 text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition"
                      >
                        📝 Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="mt-12 p-6 bg-neutral-900 rounded-xl border border-neutral-800">
          <h2 className="text-xl font-bold mb-4">Review Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-black rounded-lg">
              <p className="text-3xl font-bold text-green-400">
                {Object.values(approvals).filter((s) => s === 'approved').length}
              </p>
              <p className="text-sm text-neutral-500">Approved</p>
            </div>
            <div className="p-4 bg-black rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">
                {Object.values(approvals).filter((s) => s === 'needs-changes').length}
              </p>
              <p className="text-sm text-neutral-500">Needs Changes</p>
            </div>
            <div className="p-4 bg-black rounded-lg">
              <p className="text-3xl font-bold text-neutral-400">
                {totalItems - Object.keys(approvals).length}
              </p>
              <p className="text-sm text-neutral-500">Pending</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400 mb-4">
              When you&apos;re done reviewing, just tell me &quot;implement approved items&quot; and I&apos;ll push them live.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        🦞 Clawdine Dev Preview • Not indexed • Session state only
      </footer>
    </main>
  );
}
